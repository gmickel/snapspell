'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import ImageGrid from './ImageGrid';
import IntroSection from './IntroSection';
import type { ImageItem, ImageSettings } from '@/types';

const MAX_CONCURRENT_GENERATIONS = 3;

export default function ImageGenerationApp() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [settings, setSettings] = useState<ImageSettings>({
    width: 1024,
    height: 1024,
    steps: 4,
    model: 'flux1.1-pro',
  });
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const inputRef = useRef<HTMLInputElement>(null);
  const generationQueue = useRef<string[]>([]);
  const activeGenerations = useRef<Set<string>>(new Set());
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const { toast } = useToast();

  const processQueue = useCallback(() => {
    const startNewGeneration = async (prompt: string) => {
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      activeGenerations.current.add(tempId);

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
      } finally {
        activeGenerations.current.delete(tempId);
        processQueue();
      }
    };

    while (
      activeGenerations.current.size < MAX_CONCURRENT_GENERATIONS &&
      generationQueue.current.length > 0
    ) {
      const currentPrompt = generationQueue.current.shift();
      if (currentPrompt) {
        startNewGeneration(currentPrompt);
      }
    }
  }, [settings, toast]);

  const addToQueue = useCallback(
    (trimmedPrompt: string) => {
      if (
        !generationQueue.current.includes(trimmedPrompt) &&
        !images.some((img) => img.prompt === trimmedPrompt)
      ) {
        generationQueue.current.push(trimmedPrompt);
        processQueue();
      }
    },
    [processQueue, images],
  );

  useEffect(() => {
    if (!prompt.trim()) return;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      const trimmedPrompt = prompt.trim();
      const words = trimmedPrompt.split(/\s+/);

      if (!prompt.endsWith(' ') && words.length > 0) {
        addToQueue(trimmedPrompt);
      }
    }, 2000);

    setTypingTimeout(newTimeout);

    return () => {
      if (newTimeout) {
        clearTimeout(newTimeout);
      }
    };
  }, [prompt, addToQueue]);

  const handleSelectRatio = (ratio: {
    name: string;
    width: number;
    height: number;
  }) => {
    setSelectedRatio(ratio.name);
    setSettings((prev) => ({
      ...prev,
      width: ratio.width,
      height: ratio.height,
    }));
  };

  const handleTryItNow = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => inputRef.current?.focus(), 500);
  };

  const handlePromptSubmit = (submittedPrompt: string) => {
    const trimmedPrompt = submittedPrompt.trim();
    if (trimmedPrompt) {
      addToQueue(trimmedPrompt);
    }
  };

  return (
    <>
      <Header
        prompt={prompt}
        setPrompt={setPrompt}
        settings={settings}
        setSettings={setSettings}
        selectedRatio={selectedRatio}
        handleSelectRatio={handleSelectRatio}
        inputRef={inputRef}
        onPromptSubmit={handlePromptSubmit}
      />
      {images.length === 0 ? (
        <IntroSection handleTryItNow={handleTryItNow} />
      ) : (
        <ImageGrid images={images} setImages={setImages} />
      )}
    </>
  );
}

async function generateImage(prompt: string, settings: ImageSettings) {
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
}
