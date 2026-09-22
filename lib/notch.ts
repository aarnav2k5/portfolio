import { flushSync } from "react-dom";

/**
 * Geometry of the navbar notch, shared by the bar itself and by anything that
 * wants to reuse its silhouette (the theme sweep).
 *
 * The bar sits at the shoulder line and drops into a well in the middle; each
 * concave corner is a 50px cubic whose control points sit halfway across it.
 * Those are the same numbers the navbar's own clip-paths and stroke paths use.
 */
export const CORNER = 50;
export const DEPTH = 24;

/** attribute the navbar puts on its notch slice so the geometry can be measured */
export const NOTCH_ATTR = "data-notch";

/**
 * An SVG path for "everything above a navbar-shaped edge", in viewport pixels.
 * `edgeY` is the shoulder line; the well hangs `DEPTH` below it, so the middle
 * of the edge leads the way down. The shape is closed well above the top of the
 * viewport so it can be swept in from off-screen without exposing a seam.
 *
 * Every keyframe of the sweep is generated from this, so all the paths share a
 * command list and the browser can interpolate between them.
 */
export const notchEdgePath = (
  edgeY: number,
  viewport: { width: number; height: number },
  notch: { left: number; width: number }
) => {
  const r = (n: number) => Math.round(n * 100) / 100;

  const margin = 2000;
  const L = r(-margin);
  const W = r(viewport.width + margin);
  const top = r(-margin);

  const x1 = notch.left;
  const x2 = notch.left + CORNER;
  const x3 = notch.left + notch.width - CORNER;
  const x4 = notch.left + notch.width;

  const y = r(edgeY);
  const w = r(edgeY + DEPTH); // the well line

  // degenerate notch (too narrow to hold both corners) — fall back to a flat edge
  if (x3 <= x2 || notch.width <= 0) {
    return `path('M${L} ${y} H${W} V${top} H${L} Z')`;
  }

  return `path('M${L} ${y} H${r(x1)} C${r(x1 + CORNER / 2)} ${y} ${r(x1 + CORNER / 2)} ${w} ${r(x2)} ${w} H${r(x3)} C${r(x3 + CORNER / 2)} ${w} ${r(x3 + CORNER / 2)} ${y} ${r(x4)} ${y} H${W} V${top} H${L} Z')`;
};

/**
 * An SVG path for "everything below a footer-shaped edge", in viewport pixels.
 * `edgeY` is the shoulder line; the well rises `DEPTH` above it, so the middle
 * of the edge leads the way up. The shape is closed well below the bottom of the
 * viewport so it can be swept in from off-screen without exposing a seam.
 */
export const footerEdgePath = (
  edgeY: number,
  viewport: { width: number; height: number },
  notch: { left: number; width: number }
) => {
  const r = (n: number) => Math.round(n * 100) / 100;

  const margin = 2000;
  const L = r(-margin);
  const W = r(viewport.width + margin);
  const bottom = r(viewport.height + margin);

  const x1 = notch.left;
  const x2 = notch.left + CORNER;
  const x3 = notch.left + notch.width - CORNER;
  const x4 = notch.left + notch.width;

  const y = r(edgeY);
  const w = r(edgeY - DEPTH); // the well line rises above edgeY

  // degenerate notch (too narrow to hold both corners) — fall back to a flat edge
  if (x3 <= x2 || notch.width <= 0) {
    return `path('M${L} ${y} H${W} V${bottom} H${L} Z')`;
  }

  return `path('M${L} ${y} H${r(x1)} C${r(x1 + CORNER / 2)} ${y} ${r(x1 + CORNER / 2)} ${w} ${r(x2)} ${w} H${r(x3)} C${r(x3 + CORNER / 2)} ${w} ${r(x3 + CORNER / 2)} ${y} ${r(x4)} ${y} H${W} V${bottom} H${L} Z')`;
};

/** Measure notch position on screen, or fallback to center */
export const getNotchBounds = (): { left: number; width: number } => {
  if (typeof window === "undefined") {
    return { left: 0, width: 0 };
  }
  const el = document.querySelector(`[${NOTCH_ATTR}]`);
  if (el) {
    const rect = el.getBoundingClientRect();
    return { left: rect.left, width: rect.width };
  }
  const width = Math.min(300, window.innerWidth * 0.5);
  const left = (window.innerWidth - width) / 2;
  return { left, width };
};

/**
 * Performs theme transition using View Transitions API.
 * - Dark to Light: Top to Bottom, shaped like the navbar notch.
 * - Light to Dark: Bottom to Top, shaped like the footer notch.
 */
export const performThemeTransition = async (
  nextTheme: string,
  setTheme: (theme: string) => void
) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !document.startViewTransition) {
    setTheme(nextTheme);
    return;
  }

  const viewport = {
    width: Math.max(window.innerWidth, document.documentElement.clientWidth || 0),
    height: Math.max(window.innerHeight, document.documentElement.clientHeight || 0),
  };
  const notch = getNotchBounds();

  const isGoingLight = nextTheme === "light";
  const numSteps = 40;
  const keyframes: string[] = [];

  if (isGoingLight) {
    // Dark to Light: Screen goes Top to Bottom, shaped like navbar notch
    const startY = -DEPTH * 6;
    const endY = viewport.height + DEPTH * 6;
    for (let i = 0; i <= numSteps; i++) {
      const p = i / numSteps;
      const y = startY + (endY - startY) * p;
      keyframes.push(notchEdgePath(y, viewport, notch));
    }
  } else {
    // Light to Dark: Screen goes Bottom to Top, shaped like footer notch
    const startY = viewport.height + DEPTH * 6;
    const endY = -DEPTH * 6;
    for (let i = 0; i <= numSteps; i++) {
      const p = i / numSteps;
      const y = startY + (endY - startY) * p;
      keyframes.push(footerEdgePath(y, viewport, notch));
    }
  }

  try {
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    });

    await transition.ready;

    const anim = document.documentElement.animate(
      keyframes.map((k) => ({ clipPath: k })),
      {
        duration: 650,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    await anim.finished;
  } catch {
    setTheme(nextTheme);
  }
};

