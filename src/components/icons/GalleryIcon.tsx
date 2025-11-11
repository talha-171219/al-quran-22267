interface IconProps {
  className?: string;
}

export const GalleryIcon = ({ className = "h-6 w-6" }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Mosque dome */}
      <path
        d="M12 4 Q8 6 8 10 L16 10 Q16 6 12 4"
        fill="currentColor"
        opacity="0.8"
      />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
      {/* Mosque building */}
      <rect x="6" y="10" width="12" height="10" fill="currentColor" opacity="0.6" />
      {/* Minaret left */}
      <rect x="5" y="7" width="2" height="13" fill="currentColor" opacity="0.7" />
      <path d="M5 7 L6 4 L7 7" fill="currentColor" />
      {/* Minaret right */}
      <rect x="17" y="7" width="2" height="13" fill="currentColor" opacity="0.7" />
      <path d="M17 7 L18 4 L19 7" fill="currentColor" />
      {/* Door arch */}
      <path
        d="M10 14 L10 20 L14 20 L14 14 Q14 12 12 12 Q10 12 10 14"
        fill="white"
        opacity="0.3"
      />
      {/* Crescent moon */}
      <path
        d="M19 3 A2 2 0 0 0 19 7 A1.5 1.5 0 0 1 19 3"
        fill="gold"
      />
    </svg>
  );
};
