import '../app/globals.css';
import type { ReactNode } from 'react';

/**
 * Root layout for the Next.js App Router.
 *
 * This layout wraps every route in the application.  It imports the global
 * styles (including Tailwind CSS) and defines the basic HTML structure.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}