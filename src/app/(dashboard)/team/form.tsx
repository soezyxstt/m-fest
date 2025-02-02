"use client";

import GradientButton from "@/components/ui/button/bg-gradient";
import {Input} from "@/components/ui/input";
import React, {BaseSyntheticEvent, useState} from "react";
import {createTeam, joinTeam} from "@/app/_action/team";
import {toast} from "sonner";
import {useAction} from "next-safe-action/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import GradientText from "@/components/ui/text/gradient";
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {createTeamSchema} from "@/lib/schema";

export function JoinTeamForm() {
  const [code, setCode] = useState("");
  const {execute, isExecuting} = useAction(joinTeam, {
    onSuccess: () => {
      toast.success('Join team successfully');
    },
    onError: (err) => {
      toast.error(err.error.serverError || err.error.bindArgsValidationErrors || "Validation error, check your input!");
    }
  });

  return (
    <form onSubmit={() => {
      execute({secretCode: code});
    }} className="flex gap-2 text-sm md:text-base items-center">
      <Input placeholder="enter code" value={code} onChange={(v) => setCode(v.target.value)} type="text"/>
      <GradientButton disabled={isExecuting} type='submit' variant="glow" className="min-w-32">
        Join Team
      </GradientButton>
    </form>
  )
}

export function CreateTeamForm() {
  const {execute, isExecuting} = useAction(createTeam, {
    onSuccess: () => {
      toast.success('Join team successfully');
    },
    onError: (err) => {
      toast.error(err.error.serverError || err.error.bindArgsValidationErrors || "Validation error, check your input!");
    }
  });
  const form = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      institution: "",
      phoneNumber: "",
    }
  })

  function onSubmit(values: z.infer<typeof createTeamSchema>, e: BaseSyntheticEvent | undefined) {
    e?.preventDefault();
    execute({
      ...values
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GradientButton className='min-w-32'>Create Team</GradientButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white/20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="text-white space-y-2">
            <DialogHeader>
              <DialogTitle asChild>
                <GradientText className="text-base md:text-lg text-left">Create a Team</GradientText>
              </DialogTitle>
              <DialogDescription className="text-muted">
                Please notice! Once you create a team, you can&#39;t change anything.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="make an unique name"

                      type="text"
                      {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="input your campus/school"

                      type="text"
                      {...field} />
                  </FormControl>

                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="leader phone number"

                      type="text"
                      {...field} />
                  </FormControl>

                  <FormMessage/>
                </FormItem>
              )}
            />
            <DialogFooter>
              <GradientButton disabled={isExecuting} type='submit' variant="glow" className="min-w-32">
                Create Team
              </GradientButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}