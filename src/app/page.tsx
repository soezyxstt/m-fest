import GradientButton from '@/components/ui/button/bg-gradient';
import { HoverBorderGradient } from '@/components/ui/button/hover-border-gradient';
import Shimmer from '@/components/ui/button/shimmer';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function Home() {
  return (
    <main className='h-screen flex justify-center items-center flex-col gap-6'>
      <Input placeholder='test' />
      <Shimmer>Test</Shimmer>
      <HoverBorderGradient>M-Fest</HoverBorderGradient>
      <Slider className='w-96' />
      <GradientButton>Test</GradientButton>
      <GradientButton variant='outline'>Test</GradientButton>
      <GradientButton variant='glow'>Test</GradientButton>
    </main>
  );
}
