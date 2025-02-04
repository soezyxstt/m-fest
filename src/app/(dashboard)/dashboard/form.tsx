"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  SubmitHandler,
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  CloudUpload,
} from "lucide-react"
import {
  FileInput,
  FileUploader,
} from "@/components/ui/file-upload"
import GradientButton from '@/components/ui/button/bg-gradient'
import { UnderlineInput } from '@/components/ui/input/regis-input'
import { updateOrCreateProfileSchema } from '@/lib/schema'
import { uploadImage } from "@/app/_action/upload-image";
import { useAction } from "next-safe-action/hooks";
import { updateOrCreateProfile } from "@/app/_action/user";

const formSchema = z.object({
  image: z.string()
});

export function BasicForm({ defaultValues, revalidate }: { defaultValues: { name: string; email: string; semester: number }, revalidate: () => void }) {
  const form = useForm<z.infer<typeof updateOrCreateProfileSchema>>({
    resolver: zodResolver(updateOrCreateProfileSchema),
    defaultValues
  })

  const { execute, isExecuting } = useAction(updateOrCreateProfile, {
    onSuccess: () => {
      setTimeout(() => {
        toast.success('Image uploaded successfully');
        // location.reload();
        revalidate();
      })
    },
    onError: (err) => {
      toast.error(err.error.serverError || err.error.bindArgsValidationErrors || "Validation error, check your input!");
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateOrCreateProfileSchema>> = (values, e) => {
    e?.preventDefault();
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
        <div className="">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UnderlineInput
                    className='text-sm'
                    placeholder="email"
                    readOnly
                    disabled
                    type="email"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UnderlineInput
                    className='text-sm'
                    placeholder="name"
                    type="text"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="semester"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormControl>
                  <UnderlineInput
                    className='text-sm'
                    placeholder="semester"
                    type="number"
                    onChange={(e) => {
                      onChange(e.target.valueAsNumber);
                    }}

                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <GradientButton disabled={isExecuting} containerClassName='mt-4' size='sm' className='min-w-28' variant='glow'
          type="submit">Submit</GradientButton>
      </form>
    </Form>
  )
}

interface ImageUploadProps {
  desc?: string;
  prefix: 'ktm' | 'pdDikti' | 'followIG' | 'twibbon';
  onTop?: boolean;
  revalidate: () => void;
}

export function ImageUpload({ desc, prefix, onTop = false, revalidate }: ImageUploadProps) {
  const [files, setFiles] = useState<File[] | null>(null);
  const { execute } = useAction(uploadImage, {
    onError: (err) => {
      toast.error(err.error.serverError || err.error.bindArgsValidationErrors || "Validation error, check your input!");
    },
    onSuccess: () => {
      setTimeout(() => {
        toast.success('Image uploaded successfully');
        // location.reload();
        revalidate();
      }
        , 500);
    }, onSettled: () => {
      setFiles(null);
    }
  });

  const dropZoneConfig = {
    maxFiles: 2,
    maxSize: 1024 * 1024 * 5,
    multiple: true,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form className="flex flex-col justify-between h-full w-full">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className='h-full'>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(files) => {
                    setFiles(files);
                    if (files && files.length > 0) {
                      execute({ file: files[0], prefix });
                    }
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className={`relative bg-transparent rounded-lg p-1 h-full ${onTop && "absolute w-full z-10 bg-stone-900 opacity-50 top-0 left-0"}`}
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500 h-full"
                  >
                    <div className="flex items-center justify-center flex-col p-6 w-full h-full">
                      <CloudUpload className='text-gray-500 w-6 h-6' />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400 text-center">
                        <span className="font-semibold">{desc ?? "Upload KTM/Student Id"}</span>
                        &nbsp; or drag and drop (max 5 Mb)
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, or JPEG
                      </p>
                    </div>
                  </FileInput>
                  {/* <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-2 w-2 stroke-current" />
                          <span className='text-xs'>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent> */}
                </FileUploader>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}