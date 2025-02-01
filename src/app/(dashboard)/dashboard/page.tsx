import {getProfile} from '@/app/_action/user'
import {BasicForm, ImageUpload} from './form'
import {Checkbox} from '@/components/ui/checkbox'
import {auth} from '@/auth';
import {redirect} from 'next/navigation';

export default async function Dashboard() {
  const profile = await getProfile();
  const session = await auth();
  const {pKTM, pIG, pTwibbon, pPDDikti} = {pKTM: "ktm", pIG: "followIG", pPDDikti: "pdDikti", pTwibbon: "twibbon"}

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
        <div className="rounded-lg md:rounded-2xl bg-stone-400/10 backdrop-blur-sm p-4 md:p-6">
          <BasicForm defaultValues={defaultValues}/>
        </div>
        <div
          className="rounded-lg md:rounded-2xl flex flex-col bg-stone-400/10 backdrop-blur-sm p-4 md:p-6 lg:col-span-2 text-sm">
          <p className="mb-2 md:mb-4">Update Status</p>
          <div className="grid md:grid-cols-2 flex-1">
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.identityCardUrl}/>
              </div>
              KTM/Student Card
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.pdDiktiUrl}/>
              </div>
              PDDikti
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.followIGUrl}/>
              </div>
              Instagram M-Fest
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.twibbon}/>
              </div>
              Twibbon
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.email}/>
              </div>
              Email
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.name}/>
              </div>
              Name
            </div>
            <div className="flex gap-2 items-center">
              <div className="grid h-full place-items-center">
                <Checkbox aria-readonly disabled checked={!!profile?.semester}/>
              </div>
              Semester
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex-1 w-full rounded-lg md:rounded-2xl bg-stone-400/10 backdrop-blur-sm grid grid-cols-1 md:grid-cols-4 gap-2 @md:gap-4 @lg:gap-6 h-full p-4 md:p-6">
        <div className="md:col-span-2 grid grid-rows-2 gap-2">
          <div className="h-full">
            <ImageUpload prefix={pKTM} desc='Upload your KTM/Student Card'/>
          </div>
          <div className="h-full">
            <ImageUpload prefix={pPDDikti} desc='Upload PDDikti Statement'/>
          </div>
        </div>
        <div className="h-full">
          <ImageUpload prefix={pTwibbon} desc='Upload your Twibbon Screenshot'/>
        </div>
        <div className="h-full">
          <ImageUpload prefix={pIG} desc="Upload M-Fest's Ig following proof"/>
        </div>
      </div>
    </div>
  )
}