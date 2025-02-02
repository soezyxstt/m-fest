'use client';

import { BrainCircuit, CircleDollarSign, MoveLeft, PackageCheck } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { title } from '@/components/ui/text/title';
import Image from 'next/image';
import GradientText from '@/components/ui/text/gradient';
import { montserrat } from '@/style/font';
import Link from 'next/link';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  NextButton,
  PrevButton,
} from "@/components/ui/carousel"
import { Prisma } from '@prisma/client';
import GradientButton from '@/components/ui/button/bg-gradient';
import { Input } from '@/components/ui/shadcnInput';
import { competitions as localCs } from '@/lib/competition';
import { useAction } from 'next-safe-action/hooks';
import { register } from '@/app/_action/register';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function RegisterPage({ team, competitions: cs }:
  {
    team: Prisma.TeamGetPayload<{ include: { members: true, registration: true, leader: true } }> | undefined | null, competitions: Prisma.CompetitionGetPayload<{
      select: {
        id: true;
        name: true;
        earlyStart: true;
        normalStart: true;
      }
    }>[] | undefined | null
  }) {
  const dontShow = false;
  const pathName = usePathname();
  const router = useRouter();
  const compe = pathName.substring(pathName.lastIndexOf('/') + 1);
  const competitions: Record<string, { logo: string }> = {
    stem: {
      logo: '/competition/logo/stem.png',
    },
    pdc: {
      logo: '/competition/logo/pipeline.png',
    },
    ippc: {
      logo: '/competition/logo/paper.png',
    },
    bcc: {
      logo: '/competition/logo/bcc.png',
    },
  };

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const { execute } = useAction(register, {
    onSuccess: () => {
      setOpen(true);

      setTimeout(() => {
        router.push('/dashboard');
      }, 5000);
    },
    onError: () => {
      toast.error('Failed to register');
    }
  })

  if (dontShow) return null;

  const competition = cs?.find((c) => c.name.toLocaleLowerCase() === compe.toLowerCase());

  if (!competition) {
    router.push('/404');
    return
  }
  const localCompe = localCs.find((c) => c.abbreviation === compe.toUpperCase());
  const fee = competition?.normalStart < new Date() ? localCompe?.fee1 : localCompe?.fee2;

  if (!team) {
    router.push('/team');
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

            <div className='grid grid-cols-subgrid col-span-2'>
              <div className='flex gap-2 md:gap-4 items-center py-4'>
                <BrainCircuit className='text-2xl' />
                <div className='mr-6 w-max'>
                  <p className='text-sm text-muted'>Step 1</p>
                  <p className='text-lg font-medium'>Which Field?</p>
                </div>
              </div>
              <div className='grid place-items-center w-full h-full relative'>
                <div className='w-0.5 h-full left-1/2 bg-white absolute -translate-x-1/2'></div>
                <div className='rounded-full border h-5 grid place-items-center backdrop-blur-sm w-5'>
                  &#x1F5F8;
                </div>
              </div>
            </div>

            <div className='grid grid-cols-subgrid col-span-2'>
              <div className='flex gap-2 md:gap-4 items-center py-4'>
                <CircleDollarSign className='text-2xl' />
                <div className='mr-6 w-max'>
                  <p className='text-sm text-muted'>Step 2</p>
                  <p className='text-lg font-medium'>Hmm..., Fee?</p>
                </div>
              </div>
              <div className='grid place-items-center w-full h-full relative'>
                <div className='w-0.5 h-full left-1/2 bg-white absolute -translate-x-1/2'></div>
                <div className='rounded-full border h-5 grid place-items-center backdrop-blur-sm w-5'>
                  &#x1F5F8;
                </div>
              </div>
            </div>

            <div className='grid grid-cols-subgrid col-span-2'>
              <div className='flex gap-2 md:gap-4 items-center py-4'>
                <PackageCheck className='text-2xl' />
                <div className='mr-6 w-max'>
                  <p className='text-sm text-muted'>Step 3</p>
                  <p className='text-lg font-medium'>Confirm First</p>
                </div>
              </div>
              <div className='grid place-items-center w-full h-full relative'>
                <div className='w-0.5 h-full left-1/2 bg-white absolute -translate-x-1/2'></div>
                <div className='rounded-full border h-5 grid place-items-center backdrop-blur-sm w-5'>
                  &#x1F5F8;
                </div>
              </div>
            </div>
          </div>

          {/* main screen */}
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <div className='pl-4 md:pl-20 space-y-6'>
                  <div className='text-muted text-sm'>Step {step}</div>
                  <title.h2 className='text-3xl font-medium mb-12'>
                    Please confirm that you are registering for <strong className='text-azure-m'>{competition?.name}</strong> and <span className="text-mauve-m">{competition?.name === 'STEM' ? 'still in school' : 'already in college'}
                    </span>.
                  </title.h2>
                  <p className="">Click next button to continue</p>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className='pl-4 md:pl-20 space-y-6'>
                  <div className='text-muted text-sm'>Step {step}</div>
                  <title.h3 className='text-2xl font-medium mb-12'>
                    Wait wait... you need to do something first. Please attach your <span className="text-mauve-m">payment receipt below</span>.
                  </title.h3>
                  <p className="">Please make sure that it is indeed IDR <span className='text-azure-m'>{fee?.toLocaleString('id-ID', {
                    minimumFractionDigits: 2,
                  })}</span> a.n Adi Haditya N</p>
                  <Input accept='image/*' onChange={(e) => e.target.files && setFile(e.target.files[0])} type="file" />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className='pl-4 md:pl-20 space-y-12'>
                  <div className='text-muted text-sm'>Step {step}</div>
                  <title.h3 className='text-2xl font-medium mb-12'>
                    Lets make things clear <strong>{team?.name}</strong>
                  </title.h3>
                  <p className="">You guys want to register for <span className="text-mauve-m">{compe.toUpperCase()}</span> and already paid <span className="text-teal-m">{fee?.toLocaleString('id-ID', {
                    minimumFractionDigits: 2,
                  })}</span> to the linked account, right?</p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="pl-4 flex w-full justify-between mt-4 md:mt-16 md:pl-20">
              <PrevButton onClick={() => {
                setStep(step - 1);
              }} />
              {step < 3 ? (<NextButton onClick={() => {
                setStep(step + 1);
              }} />) : (
                <GradientButton className='min-w-32' onClick={() => {
                  if (!team || !file) {
                    toast.error('Please fill all the fields');
                    return;
                  }
                  execute({
                    teamId: team?.id ?? "",
                    competitionName: competition.name,
                    paymentProof: file,
                  })
                }}>
                  Register
                </GradientButton>
              )}
            </div>
          </Carousel>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='bg-white/20 backdrop-blur-sm'>
          <DialogHeader>
            <DialogTitle className='text-white font-medium'>Thanks for filling up the form!</DialogTitle>
          </DialogHeader>
          <p className="text-muted">
            This action cannot be undone. Please wait for the team to verify your registration data and we will contact you soon or check your dashboard gradually.
          </p>
          <DialogFooter>
            <Link href='/dashboard'>
              <GradientButton>
                Go to Dashboard
              </GradientButton></Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

  );
}
