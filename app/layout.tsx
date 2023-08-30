import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/navbar/Navbar'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'


export const metadata: Metadata = {
  title: 'BookAI',
  description: 'Find books based on your description.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className='min-h-screen antialiased'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='flex flex-col gap-y-[30rem]'>
            <div>
              <Navbar/>
              <div className='sm:mt-20 container max-w-7xl mx-auto my-auto h-full pt-12'>
                {children}
              </div>
            </div>
            <Footer/>
          </div>
          
          <Toaster />
        </ThemeProvider>
        </body>
    </html>
  )
}
