/**
 * requestAnimationFrame count-up utility.
 * Animates a number from `from` to `to` over `duration` ms using ease-out cubic.
 */
export function animateCount(
  from: number,
  to: number,
  duration: number,
  onUpdate: (val: number) => void,
  onComplete?: () => void
): void {
  const startTime = performance.now();

  function tick(now: number) {
    const elapsed = now - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);
    // Ease-out cubic: decelerates naturally
    const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
    const value = from + (to - from) * easedProgress;
    onUpdate(Math.round(value));

    if (rawProgress < 1) {
      requestAnimationFrame(tick);
    } else {
      onComplete?.();
    }
  }

  requestAnimationFrame(tick);
}
