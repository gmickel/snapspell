export type ImageItem = {
  id: string;
  url: string;
  prompt: string;
  status: 'generating' | 'complete';
  width: number;
  height: number;
};

export type ImageSettings = {
  height: number;
  width: number;
  steps: number;
  model: string;
};
