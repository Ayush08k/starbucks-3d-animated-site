"use client";

import { useEffect, useRef, useCallback } from "react";
import { clamp } from "@/lib/utils";

interface CanvasSequenceOptions {
  frameCount: number;
  getFramePath: (index: number) => string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useCanvasSequence({
  frameCount,
  getFramePath,
  canvasRef,
  containerRef,
}: CanvasSequenceOptions) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const loadedRef = useRef(false);

  // Preload all frames
  const preloadFrames = useCallback(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    return new Promise<HTMLImageElement[]>((resolve) => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = getFramePath(i + 1);
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded >= frameCount) {
            resolve(images);
          }
        };
        images[i] = img;
      }
    });
  }, [frameCount, getFramePath]);

  // Draw a frame on the canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = imagesRef.current[frameIndex];

      if (!canvas || !ctx || !img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (
        canvas.width !== rect.width * dpr ||
        canvas.height !== rect.height * dpr
      ) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Cover fit
      const imgRatio = img.width / img.height;
      const canvasRatio = rect.width / rect.height;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgRatio > canvasRatio) {
        drawH = rect.height;
        drawW = drawH * imgRatio;
        drawX = (rect.width - drawW) / 2;
        drawY = 0;
      } else {
        drawW = rect.width;
        drawH = drawW / imgRatio;
        drawX = 0;
        drawY = (rect.height - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [canvasRef]
  );

  // Scroll handler
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || !loadedRef.current) return;

    const rect = container.getBoundingClientRect();
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const scrollProgress = clamp(-rect.top / scrollableHeight, 0, 1);
    const frameIndex = Math.round(scrollProgress * (frameCount - 1));

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    }
  }, [containerRef, frameCount, drawFrame]);

  useEffect(() => {
    preloadFrames().then((images) => {
      imagesRef.current = images;
      loadedRef.current = true;
      drawFrame(0);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [preloadFrames, handleScroll, drawFrame]);
}
