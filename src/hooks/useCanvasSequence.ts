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

  // Draw a frame on the canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      // Find nearest loaded frame
      let img: HTMLImageElement | undefined;
      for (let offset = 0; offset < frameCount; offset++) {
        const left = frameIndex - offset;
        const right = frameIndex + offset;

        if (
          left >= 0 &&
          imagesRef.current[left] &&
          imagesRef.current[left].complete &&
          imagesRef.current[left].naturalWidth !== 0
        ) {
          img = imagesRef.current[left];
          break;
        }
        if (
          right < frameCount &&
          imagesRef.current[right] &&
          imagesRef.current[right].complete &&
          imagesRef.current[right].naturalWidth !== 0
        ) {
          img = imagesRef.current[right];
          break;
        }
      }

      if (!img) return;

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
    [canvasRef, frameCount]
  );

  // Preload all frames progressively
  const preloadFrames = useCallback(
    (onKeyFramesLoaded: (images: HTMLImageElement[]) => void) => {
      const images: HTMLImageElement[] = new Array(frameCount);
      imagesRef.current = images;

      // We will define keyframes (e.g. every 6th frame + first and last)
      const keyFrameIndices = new Set<number>();
      keyFrameIndices.add(0);
      keyFrameIndices.add(frameCount - 1);
      for (let i = 0; i < frameCount; i += 6) {
        keyFrameIndices.add(i);
      }

      let keyFramesLoadedCount = 0;
      let hasResolved = false;

      // Load keyframes first
      keyFrameIndices.forEach((i) => {
        const img = new Image();
        img.src = getFramePath(i + 1);
        img.onload = img.onerror = () => {
          keyFramesLoadedCount++;
          if (loadedRef.current && i === currentFrameRef.current) {
            drawFrame(i);
          }
          if (!hasResolved && keyFramesLoadedCount >= keyFrameIndices.size) {
            hasResolved = true;
            onKeyFramesLoaded(images);
            // Start loading the rest in the background
            loadBackgroundFrames();
          }
        };
        images[i] = img;
      });

      // Background loader for remaining frames
      const loadBackgroundFrames = () => {
        for (let i = 0; i < frameCount; i++) {
          if (keyFrameIndices.has(i)) continue;

          const img = new Image();
          img.src = getFramePath(i + 1);
          img.onload = img.onerror = () => {
            if (loadedRef.current && i === currentFrameRef.current) {
              drawFrame(i);
            }
          };
          images[i] = img;
        }
      };
    },
    [frameCount, getFramePath, drawFrame]
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
    preloadFrames((images) => {
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
