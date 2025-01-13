import Navbar from './navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen bg-[url("/landing.png")] bg-cover bg-center bg-fixed'>
      <Navbar />
      {children}
    </main>
  );
}
