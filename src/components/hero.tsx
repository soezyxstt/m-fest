import Image from 'next/image';
import { SparklesCore } from './ui/sparkle';
import GradientText from './ui/text/gradient';

export default function Hero() {
  return (
    <section id='hero' className='h-screen flex justify-center items-center flex-col gap-6 relative text-white'>
      <div className='w-full absolute h-screen pointer-events-none'>
        <SparklesCore
          id='tsparticlesfullpage'
          background='transparent'
          minSize={0.6}
          maxSize={1.4}
          particleDensity={60}
          className='w-full h-full z-0'
          particleColor='#ad8cea'
        />
      </div>
      <div className='absolute top-0 left-0 w-full h-20 md:h-32 flex justify-end gap-4 md:gap-8 p-4 md:p-8 items-center'>
        <Image
          src='/logo-white.png'
          width={200}
          height={200}
          alt='Mechanical Festival 2025'
          className='h-7/10 w-auto'
        />
        <Image
          src='/hmm.png'
          width={200}
          height={200}
          alt='HMM ITB'
          className='h-full w-auto'
        />
      </div>
      <h1 className='text-4xl md:text-8xl text-center max-w-7/10 md:max-w-2xl [font-family:var(--font-next-montserrat)] font-bold'>
        Mechanical Festival 2025
      </h1>
      <GradientText className='leading-normal md:text-7xl'>
        Coming Soon
      </GradientText>
    </section>
  );
}
