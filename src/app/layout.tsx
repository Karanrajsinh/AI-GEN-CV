
import { ResumeInfoProvider } from '@/src/context/ResumeInfoContext';
import '@/src/app/globals.css'
import { Toaster } from '@/components/ui/sonner';


export const metadata =
{
  title: {
    template: `AI-GEN CV | %s`,
    default: 'AI-GEN CV'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {



  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <ResumeInfoProvider >
          {children}
          <Toaster position='top-center' toastOptions={{
            className: "bg-slate-900 text-white border border-cyan-600 rounded-none text-xs max-w-fit mx-auto text-center flex items-center justify-center font-bold  "
          }} />
        </ResumeInfoProvider>
      </body>
    </html>
  );
}