import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { ImageItem, ImageSettings } from '@/types';

export const useImageGeneration = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const { toast } = useToast();

  const generateImage = useCallback(
    async (prompt: string, settings: ImageSettings) => {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, ...settings }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error(
            errorData.error ||
              'Too many requests. Please try again later or switch to the free model.',
          );
        }
        throw new Error(errorData.error || 'Failed to generate image');
      }

      return await response.json();
    },
    [],
  );

  const addImageToQueue = useCallback(
    async (prompt: string, settings: ImageSettings) => {
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      setImages((prevImages) => [
        {
          id: tempId,
          url: '',
          prompt: prompt,
          status: 'generating',
          width: settings.width,
          height: settings.height,
        },
        ...prevImages,
      ]);

      try {
        const newImage = await generateImage(prompt, settings);
        setImages((prevImages) =>
          prevImages.map((img) =>
            img.id === tempId
              ? { ...img, url: newImage.url, status: 'complete' }
              : img,
          ),
        );
      } catch (error: unknown) {
        console.error(`Error generating image for prompt: "${prompt}"`, error);
        setImages((prevImages) =>
          prevImages.filter((img) => img.id !== tempId),
        );
        toast({
          title: 'Error',
          description:
            error instanceof Error ? error.message : 'Failed to generate image',
          variant: 'destructive',
        });
      }
    },
    [generateImage, toast],
  );

  return { images, setImages, addImageToQueue };
};
