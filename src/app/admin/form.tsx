"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { useAction } from 'next-safe-action/hooks';
import { updateVerified } from '../_action/register';
import { toast } from 'sonner';

export function CheckForm({checked, id}: {checked: boolean, id: string}) {
  const {execute, isExecuting } = useAction(updateVerified, {
    onSuccess: () => {
      toast.success('Success, refresh to see changes');
    },
    onError: (e) => {
      toast.error(e.error.serverError || "Failed to update");
    }
  })
  return (
    <Checkbox checked={checked} disabled={isExecuting} onCheckedChange={(v) => {
      execute({id, isVerified: v as boolean});
    }} />
  )
}