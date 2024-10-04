import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ImageItem } from '@/types';

type ImageModalProps = {
  selectedImage: ImageItem | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<ImageItem | null>>;
};

export default function ImageModal({
  selectedImage,
  setSelectedImage,
}: ImageModalProps) {
  const handleDownload = (imageUrl: string, prompt: string) => {
    const base64Data = imageUrl.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `dreamcanvas-${prompt.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-gray-800 rounded-lg p-4 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Generated Image</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedImage(null)}
                className="text-white hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <img
              src={selectedImage.url}
              alt={selectedImage.prompt}
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="mb-4">{selectedImage.prompt}</p>
            <Button
              onClick={() =>
                handleDownload(selectedImage.url, selectedImage.prompt)
              }
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
