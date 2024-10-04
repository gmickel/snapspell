import { NextResponse } from 'next/server';
import Together from 'together-ai';
import { v4 as uuidv4 } from 'uuid';
import { ratelimit } from '@/lib/rateLimit';

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

// Add this array of IP addresses to bypass rate limiting
const bypassIPs = ['127.0.0.1', 'localhost', '212.51.150.247'];

export async function POST(request: Request) {
  const params = await request.json();
  const { prompt, model } = params;
  let { steps, width, height } = params;

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  let limit = 0;
  let reset = 0;
  let remaining = 0;

  // Apply rate limiting only for flux1.1-pro model and non-bypassed IPs
  if (model === 'flux1.1-pro' && !bypassIPs.includes(ip)) {
    const result = await ratelimit.limit(ip);
    ({ limit, reset, remaining } = result);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        },
      );
    }
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

  const modelID =
    model === 'flux1.1-pro'
      ? 'black-forest-labs/FLUX.1.1-pro'
      : 'black-forest-labs/FLUX.1-schnell';

  try {
    const response = await together.images.create({
      model: modelID,
      prompt: prompt,
      width: width || 1024,
      height: height || 768,
      steps: steps || 4,
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
      model === 'flux1.1-pro' && !bypassIPs.includes(ip)
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
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 },
    );
  }
}
