import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AspectRatio = {
  name: string;
  width: number;
  height: number;
};

const aspectRatios: AspectRatio[] = [
  { name: '1:1', width: 1024, height: 1024 },
  { name: '4:3', width: 1024, height: 768 },
  { name: '3:2', width: 1024, height: 672 },
  { name: '16:9', width: 1024, height: 576 },
  { name: '21:9', width: 1024, height: 448 },
  { name: '9:16', width: 576, height: 1024 },
  { name: '2:3', width: 672, height: 1024 },
  { name: '3:4', width: 768, height: 1024 },
];

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
