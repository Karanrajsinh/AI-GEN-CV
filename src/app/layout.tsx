
import { ResumeInfoProvider } from '@/src/context/ResumeInfoContext';
import '@/src/app/globals.css'
import { Toaster } from '@/components/ui/sonner';
import { UserDetailsProvider } from '../context/UserContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {



  return (
    <html lang='en' suppressHydrationWarning>
      <body   >

        <ResumeInfoProvider >
          <UserDetailsProvider>
            {children}
            <Toaster position='top-center' toastOptions={{
              className: "bg-slate-900 text-white border border-cyan-600 rounded-none text-xs max-w-fit mx-auto m-0 text-center flex items-center justify-center font-bold  "
            }} />
          </UserDetailsProvider>
        </ResumeInfoProvider>
      </body>
    </html>
  );
}