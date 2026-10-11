import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { site } from '../data/site';
import { isFormBackendConfigured, submitForm } from '../lib/forms';

interface PropertyInquiryFormProps {
  propertyName: string;
  propertySlug: string;
}

type Status = 'idle' | 'loading' | 'success' | 'unavailable' | 'error';

export default function PropertyInquiryForm({
  propertyName,
  propertySlug,
}: PropertyInquiryFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    `I'd like more information about ${propertyName}.`,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Please enter a valid email.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    const result = await submitForm({
      type: 'property-inquiry',
      property: propertyName,
      propertySlug,
      name,
      email,
      phone,
      message,
    });
    if (result.ok) {
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage(`I'd like more information about ${propertyName}.`);
      return;
    }
    setStatus(result.reason === 'not-configured' ? 'unavailable' : 'error');
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="pi-name" className="field-label">
          Name
        </label>
        <input
          id="pi-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`field ${errors.name ? 'border-red-400' : ''}`}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="pi-email" className="field-label">
          Email
        </label>
        <input
          id="pi-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`field ${errors.email ? 'border-red-400' : ''}`}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="pi-phone" className="field-label">
          Phone <span className="text-navy/30">(optional)</span>
        </label>
        <input
          id="pi-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="field"
        />
      </div>

      <div>
        <label htmlFor="pi-message" className="field-label">
          Message
        </label>
        <textarea
          id="pi-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="field resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-navy w-full disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={15} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={15} /> Send Enquiry
          </>
        )}
      </button>

      <div aria-live="polite">
        {status === 'success' && (
          <p className="flex items-start gap-2 text-xs text-green-700">
            <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
            Your enquiry has been received. The listing agent will respond shortly.
          </p>
        )}
        {status === 'error' && (
          <p className="flex items-start gap-2 text-xs text-red-500">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            We couldn&apos;t send your enquiry. Please email {site.email}.
          </p>
        )}
        {status === 'unavailable' && (
          <p className="flex items-start gap-2 text-xs text-navy/60">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            Enquiry delivery isn&apos;t connected yet. Please contact the agent directly at{' '}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </p>
        )}
        {!isFormBackendConfigured && status === 'idle' && (
          <p className="text-[0.68rem] uppercase tracking-[0.14em] text-navy/35">
            Sample form — connect a backend to deliver enquiries.
          </p>
        )}
      </div>
    </form>
  );
}
