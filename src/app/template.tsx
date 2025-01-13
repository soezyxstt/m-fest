'use client';

import { AnimatePresence, motion } from 'motion/react';

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div
          key='bg-animation-loader-transition'
          className='fixed w-screen h-screen top-0 left-0 z-99999'
          initial={{ opacity: 1, display: 'block' }}
          animate={{ opacity: 0, display: 'none' }}
          transition={{ delay: 2.1 }}
        >
          <motion.div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex'>
            <motion.img
              src='/logo-m-s.png'
              className='h-32 w-auto relative'
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, 0, 48, 48], opacity: [0, 1, 1, 1] }}
              transition={{ duration: 2 }}
              exit={{ x: 0 }}
            />
            <motion.img
              src='/logo-f-s.png'
              className='h-32 w-auto relative'
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, 0, -48, -48], opacity: [0, 1, 1, 1] }}
              transition={{ duration: 2 }}
              exit={{ x: 0 }}
            />
          </motion.div>
        </motion.div>
        <motion.div
          key='main-animation-loader-transition'
          className=''
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
