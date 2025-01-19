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
          className='fixed w-screen h-screen top-0 left-0 z-99999 bg-grad'
          initial={{ opacity: 1, display: 'block' }}
          animate={{ opacity: 0, display: 'none' }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex'>
            <div className='w-[400.4px] h-[147.8px] relative scale-50 md:scale-100'>
              <motion.div
                className='relative w-full h-full'
                style={{
                  clipPath:
                    'path("M64.259 31.0657C74.8073 11.9035 94.9478 0 116.821 0H153.251L89.0084 116.729C78.4609 135.894 58.319 147.8 36.4434 147.8H0L64.259 31.0657Z")',
                }}
                initial={{
                  background:
                    'linear-gradient(29.89deg, #FFF 0%, #FFF 0%, transparent 0%, transparent 100%)',
                }}
                animate={{
                  background:
                    'linear-gradient(29.89deg, #FFF 0%, #FFF 100%, transparent 100%, transparent 100%)',
                }}
                transition={{ duration: 1 }}
              ></motion.div>
              <motion.div
                className='absolute top-0 left-0 w-full h-full'
                style={{
                  clipPath:
                    'path("M151.486 31.0657C162.034 11.9035 182.174 0 204.048 0H240.478L176.235 116.729C165.687 135.894 145.546 147.8 123.67 147.8H87.2266L151.486 31.0657Z")',
                }}
                initial={{
                  background:
                    'linear-gradient(29.89deg, #FFF 0%, #FFF 0%, transparent 0%, transparent 100%)',
                }}
                animate={{
                  background:
                    'linear-gradient(29.89deg, #FFF 0%, #FFF 100%, transparent 100%, transparent 100%)',
                }}
                transition={{ duration: 1, delay: 0.25 }}
              ></motion.div>
              <motion.div
                className='absolute top-0 left-0 w-full h-full'
                style={{
                  clipPath:
                    'path("M263.542 102.976H271.438L283.372 147.8H254.369C245.03 147.8 238.905 138.036 242.969 129.628L254.79 102.976H263.542Z")',
                }}
                initial={{
                  background:
                    'linear-gradient(299.89deg, #FFF 0%, #FFF 0%, transparent 0%, transparent 100%)',
                }}
                animate={{
                  background:
                    'linear-gradient(299.89deg, #FFF 0%, #FFF 100%, transparent 100%, transparent 100%)',
                }}
                transition={{ duration: 1, delay: 0.4 }}
              ></motion.div>
              <motion.div
                className='absolute top-0 left-0 w-full h-full'
                style={{
                  clipPath:
                    'path("M259.034 55.1221C237.459 55.1221 217.546 66.7051 206.879 85.4585L171.422 147.8H185.257C207.906 147.8 228.625 135.046 238.827 114.824L248.973 94.7122H297.588C315.16 94.7122 331.848 87.0093 343.248 73.6371L359.032 55.1221H268.945H262.447H259.034Z")',
                }}
                initial={{
                  background:
                    'linear-gradient(29.89deg, #FFF 0%, #FFF 0%, transparent 0%, transparent 100%)',
                }}
                animate={{
                  background:
                    'linear-gradient(29.89deg, #FFF 0%, #FFF 100%, transparent 100%, transparent 100%)',
                }}
                transition={{ duration: 1, delay: 0.45 }}
              ></motion.div>
              <motion.div
                className='absolute top-0 left-0 w-full h-full'
                style={{
                  clipPath:
                    'path("M237.872 31.8958C248.276 12.2714 268.671 0.000442114 290.882 0.000367561L400.391 0C391.237 10.0482 385.626 17.5053 379.704 25.0165C369.562 37.8794 353.711 44.4414 337.33 44.4414H231.221L237.872 31.8958Z")',
                }}
                initial={{
                  background:
                    'linear-gradient(209.89deg, #FFF 0%, #FFF 0%, transparent 0%, transparent 100%)',
                }}
                animate={{
                  background:
                    'linear-gradient(209.89deg, #FFF 0%, #FFF 100%, transparent 100%, transparent 100%)',
                }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
        <div className='snap-x snap-mandatory *:snap-start'>{children}</div>
      </AnimatePresence>
    </>
  );
}
