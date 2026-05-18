/**
 * Computes spotlight position and radius from normalised scroll progress.
 * All coordinates are percentages of canvas dimensions.
 *
 * The spotlight path traces from the lower neck upward to the cheek/temple area.
 */

// Keyframe table — [scrollProgress, xPercent, yPercent, radiusPx_at_1440w]
const KEYFRAMES = [
  [0.00, 0.53, 0.82, 0],
  [0.10, 0.53, 0.79, 60],
  [0.25, 0.52, 0.73, 140],
  [0.50, 0.51, 0.65, 220],
  [0.75, 0.50, 0.55, 290],
  [1.00, 0.50, 0.47, 340],
]

/**
 * Ease-in-out cubic for smoother interpolation
 */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Linear interpolation
 */
function lerp(a, b, t) {
  return a + (b - a) * t
}

/**
 * Given a scroll progress (0–1), computes the spotlight's x, y (as fractions),
 * and radius (scaled to the given canvas width).
 *
 * @param {number} progress - Normalised scroll progress 0→1
 * @param {number} canvasWidth - Current canvas width in CSS pixels
 * @returns {{ x: number, y: number, radius: number }}
 */
export function computeSpotlight(progress, canvasWidth) {
  // Clamp progress
  const p = Math.min(1, Math.max(0, progress))

  // Find the two keyframes we're between
  let i = 0
  for (let k = 0; k < KEYFRAMES.length - 1; k++) {
    if (p >= KEYFRAMES[k][0] && p <= KEYFRAMES[k + 1][0]) {
      i = k
      break
    }
  }
  if (p >= 1) i = KEYFRAMES.length - 2

  const [p0, x0, y0, r0] = KEYFRAMES[i]
  const [p1, x1, y1, r1] = KEYFRAMES[i + 1]

  // Local progress between these two keyframes
  const range = p1 - p0
  const localT = range > 0 ? (p - p0) / range : 0
  const easedT = easeInOutCubic(localT)

  // Scale factor: radius values are defined at 1440px width
  const scale = canvasWidth / 1440

  return {
    x: lerp(x0, x1, easedT),
    y: lerp(y0, y1, easedT),
    radius: lerp(r0, r1, easedT) * scale,
  }
}
