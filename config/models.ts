export const MODEL_CONFIG = {
  'FLUX.1.1-pro': {
    id: 'FLUX.1.1-pro',
    name: 'FLUX1.1 [pro]',
    modelId: 'black-forest-labs/FLUX.1.1-pro',
    description:
      'FLUX1.1 [pro] provides six times faster generation than its predecessor FLUX.1 [pro] while also improving image quality, prompt adherence, and diversity.',
    userRateLimit: 10, // per day
    globalRateLimit: 20, // per day
  },
  'FLUX.1-schnell': {
    id: 'FLUX.1-schnell',
    name: 'FLUX.1 [schnell]',
    modelId: 'black-forest-labs/FLUX.1-schnell',
    description:
      'FLUX.1 [schnell] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions.',
    userRateLimit: 10, // per day
    globalRateLimit: 100, // per day
  },
  'FLUX.1-schnell-Free': {
    id: 'FLUX.1-schnell-Free',
    name: 'FLUX.1 [schnell] Free',
    modelId: 'black-forest-labs/FLUX.1-schnell-Free',
    description:
      'FLUX.1 [schnell] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions. Free version with unlimited generations.',
    userRateLimit: 0, // no limit
    globalRateLimit: 0, // no limit
  },
};

export type ModelId = keyof typeof MODEL_CONFIG;
