'use client';

import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import ImageGrid from './ImageGrid';
import IntroSection from './IntroSection';
import type { ImageSettings } from '@/types';

export default function ImageGenerationApp() {
  const { images, setImages, addImageToQueue } = useImageGeneration();
  const [prompt, setPrompt] = useState('');
  const [settings, setSettings] = useState<ImageSettings>({
    width: 1024,
    height: 768,
    steps: 1,
    model: 'FLUX.1.1-pro',
  });
  const [selectedRatio, setSelectedRatio] = useState('4:3');
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastGeneratedPrompt, setLastGeneratedPrompt] = useState<string>('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const addToQueueAndProcess = useCallback(
    (trimmedPrompt: string, forceGenerate = false) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        if (
          forceGenerate ||
          (trimmedPrompt !== lastGeneratedPrompt &&
            !images.some(
              (img) =>
                img.prompt === trimmedPrompt && img.status === 'generating',
            ))
        ) {
          addImageToQueue(trimmedPrompt, settings);
          setLastGeneratedPrompt(trimmedPrompt);
        }
      }, 300); // 300ms debounce
    },
    [images, addImageToQueue, lastGeneratedPrompt, settings],
  );

  const handlePromptUpdate = useCallback(
    (newPrompt: string, isSubmit = false) => {
      setPrompt(newPrompt);
      const trimmedPrompt = newPrompt.trim();

      if (trimmedPrompt && (isSubmit || newPrompt.endsWith(' '))) {
        addToQueueAndProcess(trimmedPrompt, isSubmit);
      }
    },
    [addToQueueAndProcess],
  );

  const handleSelectRatio = useCallback(
    (ratio: { name: string; width: number; height: number }) => {
      setSelectedRatio(ratio.name);
      setSettings((prev) => ({
        ...prev,
        width: ratio.width,
        height: ratio.height,
      }));
    },
    [],
  );

  const handleTryItNow = useCallback(() => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => inputRef.current?.focus(), 500);
  }, []);

  const handleRegenerateImage = useCallback(
    (prompt: string) => {
      addToQueueAndProcess(prompt, true);
    },
    [addToQueueAndProcess],
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Header
        prompt={prompt}
        setPrompt={(newPrompt) => handlePromptUpdate(newPrompt)}
        settings={settings}
        setSettings={setSettings}
        selectedRatio={selectedRatio}
        handleSelectRatio={handleSelectRatio}
        inputRef={inputRef}
        onPromptSubmit={(submittedPrompt) =>
          handlePromptUpdate(submittedPrompt, true)
        }
      />
      {images.length === 0 ? (
        <IntroSection handleTryItNow={handleTryItNow} />
      ) : (
        <ImageGrid
          images={images}
          setImages={setImages}
          onRegenerateImage={handleRegenerateImage}
        />
      )}
    </>
  );
}
