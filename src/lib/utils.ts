export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function getSequencePath(index: number, total: number = 90): string {
  const frameNum = Math.min(Math.max(Math.round(index), 1), total);
  return `/sequences/coffee/coffee-scroll_${String(frameNum).padStart(3, "0")}.webp`;
}

