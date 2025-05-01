'use client';

import { updateEventRegistration } from '@/app/_action/register';
import { Checkbox } from '@/components/ui/checkbox';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

export default function CheckboxForm({ checked, id }: { checked: boolean, id: string }) {
  const { execute, isExecuting } = useAction(updateEventRegistration, {
    onSuccess: () => {
      toast.success('Success!');
    },
    onError: (e) => {
      toast.error(e.error.serverError || "Failed to update!");
    }
  })
  return (
    <Checkbox
      checked={checked} disabled={isExecuting} onCheckedChange={(v) => {
        execute({ id, checked: v as boolean });
      }} />
  )
}