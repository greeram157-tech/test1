import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { locations } from '../data/properties';
import { site } from '../data/site';
import { isFormBackendConfigured, submitForm } from '../lib/forms';

interface FormState {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  location: string;
  budget: string;
  message: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  inquiryType: 'Buying a property',
  location: '',
  budget: '',
  message: '',
};

const inquiryTypes = [
  'Buying a property',
  'Selling a property',
  'Investment advisory',
  'Property valuation',
  'General enquiry',
];

const budgetRanges = [
  'Under $2M',
  '$2M – $5M',
  '$5M – $10M',
  '$10M – $25M',
  '$25M+',
  'Rental enquiry',
];

type Status = 'idle' | 'loading' | 'success' | 'unavailable' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Please enter a valid email address.';
    if (form.phone.trim().length < 6)
      next.phone = 'Please enter a contactable phone number.';
    if (form.message.trim().length < 10)
      next.message = 'Please tell us a little more (at least 10 characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    const result = await submitForm({ type: 'consultation', ...form });

    if (result.ok) {
      setStatus('success');
      setForm(initialState);
      return;
    }
    setStatus(result.reason === 'not-configured' ? 'unavailable' : 'error');
  };

  const inputClass = (key: keyof FormState) =>
    `field ${errors[key] ? 'border-red-400' : ''}`;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="c-name" className="field-label text-ivory/60">
          Full Name
        </label>
        <input
          id="c-name"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className={inputClass('name')}
          aria-invalid={Boolean(errors.name)}
          placeholder="Your name"
        />
        {errors.name && <FieldError message={errors.name} />}
      </div>

      <div>
        <label htmlFor="c-email" className="field-label text-ivory/60">
          Email Address
        </label>
        <input
          id="c-email"
          type="email"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          className={inputClass('email')}
          aria-invalid={Boolean(errors.email)}
          placeholder="you@example.com"
        />
        {errors.email && <FieldError message={errors.email} />}
      </div>

      <div>
        <label htmlFor="c-phone" className="field-label text-ivory/60">
          Phone Number
        </label>
        <input
          id="c-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => set('phone', e.target.value)}
          className={inputClass('phone')}
          aria-invalid={Boolean(errors.phone)}
          placeholder="+1 (000) 000-0000"
        />
        {errors.phone && <FieldError message={errors.phone} />}
      </div>

      <div>
        <label htmlFor="c-inquiry" className="field-label text-ivory/60">
          Inquiry Type
        </label>
        <select
          id="c-inquiry"
          value={form.inquiryType}
          onChange={(e) => set('inquiryType', e.target.value)}
          className="field"
        >
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="c-location" className="field-label text-ivory/60">
          Preferred Location
        </label>
        <select
          id="c-location"
          value={form.location}
          onChange={(e) => set('location', e.target.value)}
          className="field"
        >
          <option value="">Any location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
          <option value="Other">Other / not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="c-budget" className="field-label text-ivory/60">
          Budget Range
        </label>
        <select
          id="c-budget"
          value={form.budget}
          onChange={(e) => set('budget', e.target.value)}
          className="field"
        >
          <option value="">Select a range</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="field-label text-ivory/60">
          Message
        </label>
        <textarea
          id="c-message"
          rows={4}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          className={`${inputClass('message')} resize-none`}
          aria-invalid={Boolean(errors.message)}
          placeholder="Tell us what you're looking for…"
        />
        {errors.message && <FieldError message={errors.message} />}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-solid w-full disabled:opacity-70 sm:w-auto"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send size={15} /> Request Consultation
            </>
          )}
        </button>
      </div>

      <div className="sm:col-span-2" aria-live="polite">
        {status === 'success' && (
          <Feedback tone="success">
            Thank you — your enquiry has been received. An advisor will be in touch within
            one business day.
          </Feedback>
        )}
        {status === 'error' && (
          <Feedback tone="error">
            We couldn&apos;t send your enquiry. Please try again, or email {site.email}.
          </Feedback>
        )}
        {status === 'unavailable' && (
          <Feedback tone="info">
            This form isn&apos;t connected to a submission service yet, so your details
            weren&apos;t sent. Please reach us directly at{' '}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>{' '}
            or {site.phone}.
          </Feedback>
        )}
        {!isFormBackendConfigured && status === 'idle' && (
          <p className="text-xs uppercase tracking-[0.14em] text-ivory/35">
            Form validation is live — connect a backend to deliver submissions.
          </p>
        )}
      </div>
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
      <AlertCircle size={13} /> {message}
    </p>
  );
}

function Feedback({
  tone,
  children,
}: {
  tone: 'success' | 'error' | 'info';
  children: React.ReactNode;
}) {
  const tones = {
    success: 'border-gold/50 bg-gold/10 text-gold',
    error: 'border-red-400/50 bg-red-400/10 text-red-200',
    info: 'border-ivory/25 bg-ivory/5 text-ivory/80',
  } as const;

  return (
    <div className={`flex items-start gap-3 border px-4 py-3 text-sm ${tones[tone]}`}>
      {tone === 'success' ? (
        <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
      ) : (
        <AlertCircle size={17} className="mt-0.5 shrink-0" />
      )}
      <span>{children}</span>
    </div>
  );
}
