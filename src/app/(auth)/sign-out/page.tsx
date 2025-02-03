"use client";

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUp() {
  const { data } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (data) {
      signOut();
    } else {
      router.push('/sign-in');
    }
  }, [data, router]);
  return (
    <div className='h-screen w-full bg-grad'>

    </div>
  )
}