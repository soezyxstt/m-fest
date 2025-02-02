import { auth, signIn } from '@/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { title } from '@/components/ui/text/title';
import SignInForm from './form';
import GradientButton from '@/components/ui/button/bg-gradient';
import Link from 'next/link';
import GradientText from '@/components/ui/text/gradient';

export default async function SignIn() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }
  return (
    <main className='h-screen flex flex-col justify-center items-center gap-6 md:gap-10'>
      <title.h1 className='uppercase'>Sign In</title.h1>
      <div className='rounded-2xl w-full max-w-3xl border border-clear-sky-m bg-[#D9D9D922] backdrop:blur-md p-8 md:px-16 flex flex-col gap-4 '>
        <SignInForm />
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <GradientButton
            className='flex gap-2 justify-center items-center font-medium'
            isFullWIdth
            variant='outline'
            type='submit'
          >
            <svg
              className='w-4 h-4 text-white'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 488 512'
            >
              <path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
            </svg>
            Continue with Google
          </GradientButton>
        </form>
        <div className='grid grid-cols-2 gap-x-10 text-xs text-white font-light my-4'>
          <div className='text-right flex gap-2 justify-end'>
            Don&apos;t have an account yet?
            <Link
              href='/sign-up'
              className='text-azure-m'
            >
              <GradientText className='text-xs md:text-xs'>
                Create Account
              </GradientText>
            </Link>
          </div>
          <div className='flex gap-2'>
            Forgot password?
            <Link
              href='/forgot-password'
              className='text-purple-m'
            >
              <GradientText className='text-xs md:text-xs'>
                Reset Password
              </GradientText>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Sign In',
  description: '',
};
