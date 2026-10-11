import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-ivory px-6 py-24 text-center">
      <span className="eyebrow text-ocean">Error 404</span>
      <h1 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight text-navy sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/60">
        The page you&apos;re looking for may have been moved or is no longer available.
      </p>
      <Link to="/" className="btn-navy mt-8">
        <ArrowLeft size={15} /> Return Home
      </Link>
    </div>
  );
}
