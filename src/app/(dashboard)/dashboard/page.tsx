import { getCachedProfile } from '@/app/_action/user'
import { BasicForm, ImageUpload } from './form'
import { Checkbox } from '@/components/ui/checkbox'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import CldImage from "@/components/ui/CldImage";

export default async function Dashboard() {
  const session = await auth();
  const profile = await getCachedProfile(session?.user?.email ?? "");
  // const profile = await getProfile();
  const { pKTM, pIG, pTwibbon, pPDDikti } = { pKTM: "ktm", pIG: "followIG", pPDDikti: "pdDikti", pTwibbon: "twibbon" } as const

  if (!session) {
    redirect('/sign-in');
  }

  const defaultName = profile ? profile.name : session.user?.name ?? ""
  const defaultEmail = profile ? profile.email : session.user?.email ?? ""

  const defaultValues = {
    name: defaultName,
    email: defaultEmail,
    semester: profile?.semester ?? 0,
  }

  return (
    <div className="@container flex flex-col h-full space-y-4 @md:space-y-6 @lg:space-y-8">
      <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6 @lg:gap-8 w-full">
        <div className="rounded-lg md:rounded-2xl bg-stone-400/10 backdrop-blur-sm p-4 md:p-6 h-64 max-sm:order-2">
          <BasicForm defaultValues={defaultValues} />
        </div>
        <div
          className="rounded-lg md:rounded-2xl flex flex-col bg-stone-400/10 backdrop-blur-sm p-4 md:p-6 lg:col-span-2 text-sm max-sm:order-1">
          <p className="mb-2 md:mb-4">Update Status</p>
          <div className="grid md:grid-cols-2 flex-1">
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.ktm} />
              </div>
              KTM/Student Card
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.pdDikti} />
              </div>
              PDDikti
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.followIG} />
              </div>
              Instagram M-Fest
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.twibbon} />
              </div>
              Twibbon
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.email} />
              </div>
              Email
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.name} />
              </div>
              Name
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.semester} />
              </div>
              Semester
            </div>
          </div>
        </div>
      </div>
      <div
        className="@md:h-[calc(100%-var(--spacing)*72)] @md:overflow-hidden relative w-full rounded-lg md:rounded-2xl bg-stone-400/10 backdrop-blur-sm flex max-sm:flex-col gap-2 @md:gap-4 @lg:gap-6 p-4 md:p-6">
        <div className="md:col-span-2 grid grid-rows-2 gap-2 md:w-1/2">
          <div className="h-full w-full relative">
            {!!profile?.ktm && <CldImage src={profile?.ktm ?? ""} alt={'upload ktm'} width="500" height="200"
              className="w-full h-full object-cover object-center rounded-md relative z-0" />}
            <ImageUpload prefix={pKTM} onTop={!!profile?.ktm} desc='Upload your KTM/Student Card' />
          </div>
          <div className="w-full h-full relative">
            {!!profile?.pdDikti && <CldImage src={profile?.pdDikti ?? ""} alt={'upload ss pddikti'} width={500} height={200}
              className="w-full h-full object-cover object-center rounded-md" />}
            <ImageUpload prefix={pPDDikti} onTop={!!profile?.pdDikti} desc='Upload PDDikti Statement' />
          </div>
        </div>
        <div className="md:w-1/4 relative">
          {!!profile?.twibbon && <CldImage src={profile?.twibbon ?? ""} alt={'upload twibbon'} width={300} height={500}
            className="w-full object-cover object-center h-full rounded-md" />}
          <ImageUpload prefix={pTwibbon} onTop={!!profile?.twibbon} desc='Upload your Twibbon Screenshot' />
        </div>
        <div className="md:w-1/4 relative">
          {!!profile?.followIG && <CldImage src={profile?.followIG ?? ""} alt={'upload ig'} width={300} height={500}
            className="w-full object-cover object-center h-full rounded-md" />}
          <ImageUpload onTop={!!profile?.followIG} prefix={pIG} desc="Upload M-Fest's Ig following proof" />
        </div>
      </div>
    </div>
  )
}