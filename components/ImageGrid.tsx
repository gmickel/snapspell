import type React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageSkeleton from '@/components/ImageGenerationSkeleton';
import ImageModal from './ImageModal';
import type { ImageItem } from '@/types';

type ImageGridProps = {
  images: ImageItem[];
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  onRegenerateImage: (prompt: string) => void;
};

export default function ImageGrid({
  images,
  setImages,
  onRegenerateImage,
}: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative cursor-pointer"
            onClick={() =>
              image.status === 'complete' && setSelectedImage(image)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                image.status === 'complete' && setSelectedImage(image);
              }
            }}
            // biome-ignore lint/a11y/useSemanticElements: not a button
            role="button"
            tabIndex={0}
          >
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {image.status === 'generating' ? (
                <div
                  className="w-full rounded-lg bg-gray-700"
                  style={{
                    aspectRatio: `${image.width} / ${image.height}`,
                  }}
                >
                  <ImageSkeleton
                    prompt={image.prompt}
                    width={image.width}
                    height={image.height}
                  />
                </div>
              ) : (
                <div
                  className="w-full rounded-lg overflow-hidden"
                  style={{
                    aspectRatio: `${image.width} / ${image.height}`,
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <p className="text-sm truncate">{image.prompt}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
      <ImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        onRegenerateImage={onRegenerateImage}
      />
    </>
  );
}
