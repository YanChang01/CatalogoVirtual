import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 14 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= Math.round(rating) ? "#c4355a" : "none"}
          stroke={s <= Math.round(rating) ? "#c4355a" : "#8a7d80"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
