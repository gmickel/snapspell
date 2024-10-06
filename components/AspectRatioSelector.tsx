import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { aspectRatios } from '@/config/aspectRatios';
import type { AspectRatio } from '@/types';

interface AspectRatioSelectorProps {
  selectedRatio: string;
  onSelectRatio: (ratio: AspectRatio) => void;
}

export function AspectRatioSelector({
  selectedRatio,
  onSelectRatio,
}: AspectRatioSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {aspectRatios.map((ratio) => (
        <Button
          key={ratio.name}
          variant={selectedRatio === ratio.name ? 'default' : 'outline'}
          size="sm"
          className={cn(
            'text-xs border-0',
            selectedRatio === ratio.name
              ? 'bg-purple-700 text-primary-foreground'
              : 'bg-background text-foreground hover:bg-purple-700 hover:text-primary-foreground active:bg-purple-700 active:text-primary-foreground focus:bg-purple-700 focus:text-primary-foreground',
          )}
          onClick={() => onSelectRatio(ratio)}
        >
          {ratio.name}
        </Button>
      ))}
    </div>
  );
}

export default AspectRatioSelector;
