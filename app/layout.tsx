import type { Metadata } from 'next';
import './globals.css';
import AppThemeProvider from '@/components/providers/AppThemeProvider';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'CareFlow | Healthcare Grievance Management',
  description: 'Secure and efficient healthcare incident reporting system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppThemeProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</main>
        </AppThemeProvider>
      </body>
    </html>
  );
}
