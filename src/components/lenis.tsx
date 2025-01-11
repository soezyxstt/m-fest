'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisWrapper() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return null;
}
