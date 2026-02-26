/**
 * Sanity Studio — embedded at /studio
 */

export const metadata = {
  title: 'Sanity Studio | Benson Home Solutions',
  robots: 'noindex, nofollow',
};

export default function StudioPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal text-cream">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sanity Studio</h1>
        <p className="mt-2 text-sm opacity-75">
          Studio will be wired up once Sanity schemas are deployed (Week 1).
        </p>
      </div>
    </div>
  );
}
