import { auth } from '@/auth';

export default async function Dashboard() {
  const session = await auth()

  return (
    <div className="">{session?.user?.email}</div>
  )
}