import { sourceSans3 } from '@/lib/fonts';
import '@/app/globals.css';

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sourceSans3.variable}>
      <body className="bg-transparent antialiased">
        {children}
      </body>
    </html>
  );
}
