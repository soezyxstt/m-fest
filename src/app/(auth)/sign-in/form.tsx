'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import GradientButton from '@/components/ui/button/bg-gradient';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 text-white max-w-3xl'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='email'
                  type='email'
                  autoComplete='email-mfest-signin'
                  disabled
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>This is your signed email.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='input at least 8 characters'
                  disabled
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>Enter your password.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <GradientButton
          className='font-medium flex gap-2 justify-center items-center'
          type='submit'
          containerClassName='mt-10'
          variant='outline'
          isFullWIdth
          disabled
        >
          <Mail className='w-4 h-4' />
          Sign-in using email
        </GradientButton>
      </form>
    </Form>
  );
}
