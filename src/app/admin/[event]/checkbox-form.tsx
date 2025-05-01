'use client';

import { updateEventRegistration } from '@/app/_action/register';
import { Checkbox } from '@/components/ui/checkbox';
import { useOptimisticAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CheckboxForm({ checked, id }: { checked: boolean, id: string }) {
  const router = useRouter();
  const { execute, isExecuting, optimisticState } = useOptimisticAction(updateEventRegistration, {
    currentState: checked,
    updateFn: (prevState, { checked }) => !checked,
    onSuccess: () => {
      router.refresh();
      toast.success('Success!');
    },
    onError: (e) => {
      toast.error(e.error.serverError || "Failed to update!");
    }
  })
  return (
    <Checkbox
      checked={optimisticState} disabled={isExecuting} onCheckedChange={(v) => {
        execute({ id, checked: v as boolean });
      }} />
  )
}