import Header from '@/components/Header';
import './globals.css'

export const metadata = {
  title: "News Website",
  description: "A dynamic news website with SSR.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className='bg-gray-800'>
          <div className='min-h-screen max-w-6xl mx-auto py-4'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
