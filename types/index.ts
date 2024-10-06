import type { ModelId } from '@/config/models';

export interface ImageItem {
  id: string;
  url: string;
  prompt: string;
  status: 'generating' | 'complete';
  width: number;
  height: number;
}

export interface ImageSettings {
  height: number;
  width: number;
  steps: number;
  model: ModelId;
}

export interface AspectRatio {
  name: string;
  width: number;
  height: number;
}
