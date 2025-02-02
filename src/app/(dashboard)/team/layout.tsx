import { auth } from '@/auth';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ comp: string }>;
}>) {
  const session = await auth();

  return (
    <>
      <title>{`Dashboard - ${session?.user?.name?.split(' ')[0]}`}</title>
      {children}
    </>
  );
}