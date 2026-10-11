import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { isFormBackendConfigured, submitForm } from '../lib/forms';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'unavailable'>(
    'idle',
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    const result = await submitForm({ type: 'newsletter', email });
    if (result.ok) {
      setStatus('done');
      setEmail('');
    } else {
      setStatus(result.reason === 'not-configured' ? 'unavailable' : 'idle');
      if (result.reason === 'error') setError('Something went wrong. Please try again.');
    }
  };

  if (status === 'done') {
    return (
      <p className="flex items-center gap-2 text-sm text-gold">
        <Check size={16} /> You&apos;re on the list. Thank you.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex items-center border border-ivory/25 focus-within:border-gold">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label="Subscribe"
          className="flex items-center gap-2 px-4 py-3 font-display text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-ivory disabled:opacity-60"
        >
          {status === 'loading' ? '...' : 'Join'} <ArrowRight size={14} />
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
      {status === 'unavailable' && (
        <p className="mt-2 text-xs text-ivory/50">
          Newsletter delivery isn&apos;t connected yet. Please email hello@ashvorth.co to
          subscribe.
        </p>
      )}
      {!isFormBackendConfigured && status === 'idle' && (
        <p className="mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-ivory/35">
          Sample form — connect a backend to receive sign-ups.
        </p>
      )}
    </form>
  );
}
