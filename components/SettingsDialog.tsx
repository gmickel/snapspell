import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AspectRatioSelector } from '@/components/AspectRatioSelector';
import { MODEL_CONFIG, type ModelId } from '@/config/models';
import type { ImageSettings, AspectRatio } from '@/types';

type SettingsDialogProps = {
  settings: ImageSettings;
  setSettings: React.Dispatch<React.SetStateAction<ImageSettings>>;
  selectedRatio: string;
  handleSelectRatio: (ratio: AspectRatio) => void;
};

const modelOptions = Object.values(MODEL_CONFIG);

export default function SettingsDialog({
  settings,
  setSettings,
  selectedRatio,
  handleSelectRatio,
}: SettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelChange = (modelId: ModelId) => {
    setSettings({ ...settings, model: modelId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 py-4"
        >
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Model</Label>
            <div className="space-y-2">
              {modelOptions.map((option) => (
                <button
                  key={option.id}
                  className={`flex items-start space-x-3 rounded-lg border p-3 transition-colors w-full text-left ${
                    settings.model === option.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-700 hover:bg-gray-800'
                  }`}
                  onClick={() => handleModelChange(option.id as ModelId)}
                  type="button"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {settings.model === option.id ? (
                      <Check className="h-5 w-5 text-purple-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-400" />
                    )}
                  </div>
                  <div>
                    <Label className="font-medium text-white">
                      {option.name}
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">
                      {option.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Aspect Ratio</Label>
            <AspectRatioSelector
              selectedRatio={selectedRatio}
              onSelectRatio={handleSelectRatio}
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="width" className="text-lg font-semibold">
                Width
              </Label>
              <span className="text-sm text-gray-400">{settings.width}px</span>
            </div>
            <Slider
              id="width"
              min={256}
              max={1024}
              step={64}
              value={[settings.width]}
              onValueChange={(value) =>
                setSettings({ ...settings, width: value[0] })
              }
              className="w-full"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="height" className="text-lg font-semibold">
                Height
              </Label>
              <span className="text-sm text-gray-400">{settings.height}px</span>
            </div>
            <Slider
              id="height"
              min={256}
              max={1024}
              step={64}
              value={[settings.height]}
              onValueChange={(value) =>
                setSettings({ ...settings, height: value[0] })
              }
              className="w-full"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="steps" className="text-lg font-semibold">
                Steps
              </Label>
              <span className="text-sm text-gray-400">{settings.steps}</span>
            </div>
            <Slider
              id="steps"
              min={1}
              max={4}
              step={1}
              value={[settings.steps]}
              onValueChange={(value) =>
                setSettings({ ...settings, steps: value[0] })
              }
              className="w-full"
            />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
