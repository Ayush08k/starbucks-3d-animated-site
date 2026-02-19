"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function usePreloadImages(
  paths: string[],
  onProgress?: (progress: number) => void
) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const preload = useCallback(() => {
    let loadedCount = 0;
    const total = paths.length;
    const images: HTMLImageElement[] = [];

    paths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        const p = loadedCount / total;
        setProgress(p);
        onProgress?.(p);
        if (loadedCount >= total) {
          setLoaded(true);
        }
      };
      images[i] = img;
    });

    imagesRef.current = images;
  }, [paths, onProgress]);

  useEffect(() => {
    if (paths.length > 0) {
      preload();
    }
  }, [preload, paths]);

  return { loaded, progress, images: imagesRef.current };
}
