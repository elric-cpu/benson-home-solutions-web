import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Benson Home Solutions',
  description: 'Send the repair list, address, photos, or scope details. Benson Home Solutions handles post-inspection repairs, moisture issues, and emergency restoration.',
  alternates: {
    canonical: 'https://bensonhomesolutions.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}