import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

interface FavoriteButtonProps {
  propertyId: string;
  propertyName: string;
  variant?: 'icon' | 'full';
  className?: string;
}

export default function FavoriteButton({
  propertyId,
  propertyName,
  variant = 'icon',
  className = '',
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(propertyId);
  const label = active ? `Remove ${propertyName} from favorites` : `Save ${propertyName} to favorites`;

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={() => toggleFavorite(propertyId)}
        aria-pressed={active}
        className={`btn border px-6 py-3.5 transition-colors ${
          active
            ? 'border-gold bg-gold/10 text-gold'
            : 'border-navy/20 text-navy hover:border-gold hover:text-gold'
        } ${className}`}
      >
        <Heart size={15} fill={active ? 'currentColor' : 'none'} />
        {active ? 'Saved' : 'Save'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(propertyId);
      }}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        active
          ? 'bg-gold text-navy'
          : 'bg-navy/60 text-ivory hover:bg-navy/80'
      } ${className}`}
    >
      <Heart size={16} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
