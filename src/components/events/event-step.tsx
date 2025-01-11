import { motion, MotionValue, useTransform } from 'motion/react';

export default function EventsStep({
  range: [start, end],
  scrollYProgress,
}: {
  range: [number, number];
  scrollYProgress: MotionValue<number>;
}) {
  const height = useTransform(scrollYProgress, [start, end], ['0%', '100%']);
  return (
    <motion.div
      style={{ height }}
      className='rounded-full w-full bg-stone-50'
    ></motion.div>
  );
}
