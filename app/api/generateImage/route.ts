import { NextResponse } from 'next/server';
import Together from 'together-ai';
import { v4 as uuidv4 } from 'uuid';
import { rateLimit } from '@/lib/rateLimit';
import { MODEL_CONFIG, type ModelId } from '@/config/models';

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

// Get the bypass IPs from the environment variable
const bypassIPs = process.env.BYPASS_IPS
  ? process.env.BYPASS_IPS.split(',')
  : [];

// Rate limiting configuration
const ENABLE_RATE_LIMIT = process.env.ENABLE_RATE_LIMIT === 'true';

export async function POST(request: Request) {
  const params = await request.json();
  const { prompt, model } = params;
  let { steps, width, height } = params;

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  const modelConfig = MODEL_CONFIG[model as ModelId];
  if (!modelConfig) {
    return NextResponse.json({ error: 'Invalid model' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  let limit = 0;
  let reset = 0;
  let remaining = 0;

  // Apply rate limiting if enabled and not a bypassed IP
  if (
    ENABLE_RATE_LIMIT &&
    !bypassIPs.includes(ip) &&
    modelConfig.userRateLimit > 0
  ) {
    const rateLimitResult = await rateLimit(ip, model as ModelId);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'X-RateLimit-Global-Limit': rateLimitResult.globalLimit.toString(),
            'X-RateLimit-Global-Remaining':
              rateLimitResult.globalRemaining.toString(),
            'X-RateLimit-Global-Reset': rateLimitResult.globalReset.toString(),
          },
        },
      );
    }

    ({ limit, reset, remaining } = rateLimitResult);
  } else {
    // Set default values for unlimited models
    limit = 0;
    reset = 0;
    remaining = 0;
  }

  const startTime = Date.now();
  console.log(
    `[${startTime}] Starting generation for prompt: "${prompt}" (${width}x${height}, ${steps} steps)`,
  );

  if (steps < 1 || steps > 4) {
    steps = 4;
  }

  if (width < 1 || width > 1024) {
    width = 1024;
  }

  if (height < 1 || height > 1024) {
    height = 1024;
  }

  try {
    const response = await together.images.create({
      model: modelConfig.modelId,
      prompt: prompt,
      width: width || 1024,
      height: height || 768,
      steps: steps || 1,
      n: 1,
      response_format: 'b64_json',
      // biome-ignore lint/suspicious/noExplicitAny: library typings incorrect
    } as any);

    const image = response.data[0];
    const imageId = uuidv4();
    const imageUrl = `data:image/png;base64,${image.b64_json}`;

    const endTime = Date.now();
    console.log(
      `[${endTime}] Finished generation for prompt: "${prompt}" (${width}x${height}, ${steps} steps) (took ${
        endTime - startTime
      }ms)`,
    );

    const headers =
      ENABLE_RATE_LIMIT &&
      !bypassIPs.includes(ip) &&
      modelConfig.userRateLimit > 0
        ? {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          }
        : {};

    return NextResponse.json(
      { id: imageId, url: imageUrl, prompt: prompt },
      { status: 200, headers: headers as HeadersInit },
    );
  } catch (error) {
    console.error('Error generating image:', error);
    if (error instanceof Error && error.message.includes('429')) {
      return NextResponse.json(
        {
          error:
            'Rate limit exceeded from the image generation service. Please try again later.',
        },
        { status: 429 },
      );
    }
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 },
    );
  }
}
