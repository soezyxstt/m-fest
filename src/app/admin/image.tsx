"use client";
import { AnimatePresence, motion } from 'motion/react';
import CldImage from '@/components/ui/CldImage';
import { useState } from 'react';

export default function WrapperImage({ src, width, height }: { src: string | undefined, width?: number, height?: number }) {
  const [active, setActive] = useState(false)

  if (!src) return null

  return (
    <>
      <motion.div layoutId={src} className='cursor-pointer' onClick={() => setActive(true)}>
        <CldImage src={src} width={300} height={600} alt={src} className='h-44 w-24' />
      </motion.div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=
            'fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-screen z-10'
            onClick={() => setActive(false)}
          />
        )}
        {active && (<motion.div
          layoutId={src}
          className=
          'fixed z-50 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 rounded-lg shadow-lg p-4 overflow-hidden flex-col pointer-events-auto'
        >
          <CldImage src={src} width={width ?? 300} height={height ?? 600} alt={src} className='h-96 w-48' />
        </motion.div>)}
      </AnimatePresence>
    </>
  )
}