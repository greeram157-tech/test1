import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text?: string;
  className?: string;
}

export default function ShareButton({ title, text, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* user dismissed the share sheet — no action needed */
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className={`btn border border-navy/20 px-6 py-3.5 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-ivory ${className}`}
    >
      {copied ? <Check size={15} /> : <Share2 size={15} />}
      {copied ? 'Link Copied' : 'Share'}
    </button>
  );
}
