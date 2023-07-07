import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ModelProvider } from '@/providers/model-provider';
import { ToastrProvider } from '@/providers/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastrProvider /> {/* this is the toast provider */}
          <ModelProvider /> {/* this is the model provider */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
