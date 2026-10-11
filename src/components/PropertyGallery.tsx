import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  name: string;
}

export default function PropertyGallery({ images, name }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);

  const go = (delta: number) =>
    setActive((i) => (i + delta + images.length) % images.length);

  return (
    <div>
      <div className="group relative overflow-hidden bg-navy">
        <img
          src={images[active]}
          alt={`${name} — photograph ${active + 1} of ${images.length}`}
          className="aspect-[16/10] w-full object-cover"
        />

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photograph"
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-navy/60 text-ivory opacity-0 transition-opacity hover:bg-navy/85 focus-visible:opacity-100 group-hover:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photograph"
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-navy/60 text-ivory opacity-0 transition-opacity hover:bg-navy/85 focus-visible:opacity-100 group-hover:opacity-100"
        >
          <ChevronRight size={20} />
        </button>

        <span className="absolute bottom-4 right-4 bg-navy/75 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ivory">
          {active + 1} / {images.length}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`View photograph ${index + 1}`}
            aria-current={index === active}
            className={`overflow-hidden border-2 transition-colors ${
              index === active ? 'border-gold' : 'border-transparent hover:border-navy/20'
            }`}
          >
            <img
              src={image}
              alt=""
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
