export default async function EventLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ event: string }>;
}>) {

  const { event } = await params;
  const capitalizedEvent = event
    .split(/\s/)
    .map(part => 
      part.includes('-') 
        ? part.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('-')
        : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(' ');

  return (
    <>
      <title>{`${capitalizedEvent} | M-Fest 2025`}</title>
      {children}
    </>
  );
}