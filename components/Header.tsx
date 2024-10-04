import type React from 'react';
import { Input } from '@/components/ui/input';
import SettingsDialog from '@/components/SettingsDialog';
import type { ImageSettings } from '@/types';

type HeaderProps = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  settings: ImageSettings;
  setSettings: React.Dispatch<React.SetStateAction<ImageSettings>>;
  selectedRatio: string;
  handleSelectRatio: (ratio: {
    name: string;
    width: number;
    height: number;
  }) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onPromptSubmit: (prompt: string) => void;
};

export default function Header({
  prompt,
  setPrompt,
  settings,
  setSettings,
  selectedRatio,
  handleSelectRatio,
  inputRef,
  onPromptSubmit,
}: HeaderProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onPromptSubmit(prompt);
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-x">
        SnapSpell
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Transform your words into stunning visuals with AI-powered image
        generation
      </p>

      <div className="flex gap-4 mb-8">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Summon your imagination..."
          value={prompt}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyUp}
          className="flex-grow bg-gray-800 text-white border-gray-700"
        />
        <SettingsDialog
          settings={settings}
          setSettings={setSettings}
          selectedRatio={selectedRatio}
          handleSelectRatio={handleSelectRatio}
        />
      </div>
    </div>
  );
}
