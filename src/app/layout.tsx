
import '@/src/app/globals.css'


import { ResumeInfoProvider } from '../context/ResumeInfoContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='-z-10'>
      <body >
        <ResumeInfoProvider >
          {children}
        </ResumeInfoProvider>
      </body>
    </html>
  );
}