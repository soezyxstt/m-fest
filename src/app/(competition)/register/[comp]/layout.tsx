export default async function RegisterLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ comp: string }>;
}>) {

  const { comp } = await params;
  return (
    <>
      <title>{`${comp.toUpperCase()} - Register | M-Fest 2025`}</title>
      {children}
    </>
  );
}