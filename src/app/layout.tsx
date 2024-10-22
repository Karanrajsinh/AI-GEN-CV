
"use client"

import { ResumeInfoProvider } from '@/context/ResumeInfoContext';
import '@/app/globals.css'
import { ModalProvider } from '@/context/ModalContext';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='-z-10 bg-slate-500'>
      <body >
        <ModalProvider>

          <ResumeInfoProvider >
            {children}
          </ResumeInfoProvider>
        </ModalProvider>
      </body>
    </html>
  );
}