'use client';

import { ArrowRight, MoveLeft, User2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { title } from '@/components/ui/text/title';
import Image from 'next/image';
import GradientText from '@/components/ui/text/gradient';
import { montserrat } from '@/style/font';
import Link from 'next/link';
import { useState } from 'react';
import MultiplyComponent from '@/components/ui/multiply-component';
import { UnderlineInput } from '@/components/ui/input/regis-input';
import GradientButton from '@/components/ui/button/bg-gradient';

export default function RegisterPage() {
  const dontShow = true;
  const pathName = usePathname();
  const router = useRouter();
  const compe = pathName.substring(pathName.lastIndexOf('/') + 1);
  const competitions: Record<string, { logo: string }> = {
    stem: {
      logo: '/competition/logo/stem.png',
    },
    pipeline: {
      logo: '/competition/logo/pipeline.png',
    },
    ippc: {
      logo: '/competition/logo/paper.png',
    },
    bcc: {
      logo: '/competition/logo/bcc.png',
    },
  };

  const [step, setStep] = useState(1);
  
  if (dontShow) return null;

  if (!competitions[compe.toLocaleLowerCase()]) {
    router.push('/404');
  }

  return (
    <div className='h-screen bg-grad'>
      <div className='flex justify-between h-24 md:px-12 items-center py-6 fixed top-0 left-0 w-full z-10'>
        <Link
          href='/competitions'
          className='flex gap-4 items-center text-white'
        >
          <MoveLeft size={24} />
          <title.h5 className={`font-medium ${montserrat.className} uppercase`}>
            Back
          </title.h5>
        </Link>
        <div className='flex gap-8 h-full items-center'>
          <Image
            src={competitions[compe].logo}
            width={200}
            height={100}
            alt=''
            className='h-full w-auto'
          />
          <GradientText
            className={`${montserrat.className} text-3xl md:text-5xl font-bold uppercase from-purple-500 via-blue-500 to-white`}
          >
            {compe}
          </GradientText>
        </div>
      </div>
      <div className='grid place-items-center text-white h-full w-full'>
        <div className='flex w-[70vw] items-center'>
          <div className='w-3/10 grid grid-cols-[1fr_20px]'>
            <MultiplyComponent number={5}>
              <div className='grid grid-cols-subgrid col-span-2'>
                <div className='flex gap-2 md:gap-4 items-center py-4'>
                  <User2 size={40} />
                  <div className=''>
                    <p className='text-sm text-muted'>Step 1</p>
                    <p className='text-lg font-medium'>Participant 1</p>
                  </div>
                </div>
                <div className='grid place-items-center w-full h-full relative'>
                  <div className='w-0.5 h-full left-1/2 bg-white absolute -translate-x-1/2'></div>
                  <div className='rounded-full border h-5 grid place-items-center backdrop-blur-sm w-5'>
                    &#x1F5F8;
                  </div>
                </div>
              </div>
            </MultiplyComponent>
          </div>
          <div className='pl-4 md:pl-20 space-y-12'>
            <div className='text-muted text-sm'>Step {step}</div>
            <title.h2 className='text-3xl font-semibold mb-12'>
              What is participant 1 name?
            </title.h2>
            <UnderlineInput
              className='w-full'
              placeholder='Enter your name here'
            />
            <div className='flex justify-end mt-16'>
              <GradientButton
                variant='outline'
                onClick={() => setStep(step + 1)}
                className='flex gap-2 justify-center items-center group'
              >
                Next{' '}
                <ArrowRight
                  size={16}
                  className='group-hover:translate-x-1 transition-all'
                />
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
