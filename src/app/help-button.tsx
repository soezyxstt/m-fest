"use client";

import { motion } from 'motion/react'
import Link from 'next/link';
import { RefObject, useRef, useState } from 'react';
import { FaQuestion } from 'react-icons/fa6'
import { useOnClickOutside } from 'usehooks-ts';

export default function HelpButton() {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLButtonElement>(null);
  useOnClickOutside(ref as RefObject<HTMLElement>, () => {
    setExpanded(false)
  })
  return (
    <motion.button ref={ref} onClick={() => setExpanded(prev => !prev)} layout className='px-4 py-2 fixed bottom-6 right-4 md:bottom-8 md:right-6 z-50 gap-3 backdrop-blur-sm bg-white/30 border border-white text-clear-sky-m font-medium overflow-hidden'
      style={{
        borderRadius: expanded ? 16 : 9999
      }}
    >
      {expanded ? (
        <motion.div layout style={{
          minHeight: 0,
          height: expanded ? 'auto' : 0,
          overflow: 'hidden',
        }}
          className='*:text-left'
        >
          <Link href='https://drive.google.com/file/d/17P8g6J6d5RVIAFnr_j8Kr1br6UguUHJr/view?usp=sharing' target='_blank'>
            Registration Guideline
          </Link>
        </motion.div>) : (<span className='flex items-center'>Help<FaQuestion /></span>)}</motion.button>)
}