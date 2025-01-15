'use client';

import { MoveLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { title } from '@/components/ui/text/title';
import Image from 'next/image';
import GradientText from '@/components/ui/text/gradient';
import { montserrat } from '@/style/font';
import Link from 'next/link';

export default function RegisterPage() {
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
    paper: {
      logo: '/competition/logo/paper.png',
    },
    bcc: {
      logo: '/competition/logo/bcc.png',
    },
  };

  if (!competitions[compe.toLocaleLowerCase()]) {
    router.push('/404');
  }

  return (
    <div className='h-screen bg-grad'>
      <div className='flex justify-between h-24 md:px-12 items-center py-6'>
        <Link href='/competitions' className='flex gap-4 items-center text-white'>
          <MoveLeft size={24} />
          <title.h5 className={`font-medium ${montserrat.className} uppercase`}>Back</title.h5>
        </Link>
        <div className='flex gap-8 h-full items-center'>
          <Image src={competitions[compe].logo} width={200} height={100} alt='' className='h-full w-auto' />
          <GradientText className={`${montserrat.className} text-3xl md:text-5xl font-semibold uppercase`}>{compe}</GradientText>
        </div>
      </div>
      <div className="grid place-items-center">
        <div className=""></div>
      </div>
    </div>
  );
}
