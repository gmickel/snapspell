import React from 'react';

interface ImageSkeletonProps {
  prompt: string;
  width: number;
  height: number;
}

export default function ImageSkeleton({
  prompt,
  width,
  height,
}: ImageSkeletonProps) {
  const aspectRatio = width / height;

  return (
    <div className="relative w-full">
      <div
        className="animate-pulse bg-gray-700 rounded-lg w-full"
        style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
        <p className="text-sm truncate">Generating: {prompt}</p>
      </div>
    </div>
  );
}
