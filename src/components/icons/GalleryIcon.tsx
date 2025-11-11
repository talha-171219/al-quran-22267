interface IconProps {
  className?: string;
}

export const GalleryIcon = ({ className = "h-6 w-6" }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Crescent moon */}
      <path
        d="M8 6 A5 5 0 0 0 8 16 A3.5 3.5 0 0 1 8 6"
        fill="currentColor"
      />
      {/* Mosque dome */}
      <path d="M12 10 Q10 11 10 13 L18 13 Q18 11 16 10 Z" fill="currentColor" />
      <circle cx="14" cy="9.5" r="0.8" fill="currentColor" />
      {/* Minaret */}
      <rect x="19" y="11" width="2" height="9" strokeWidth="2" />
      <path d="M18.5 11 L20 8 L21.5 11" fill="currentColor" strokeWidth="1" />
      <circle cx="20" cy="7.5" r="0.6" fill="currentColor" />
      {/* Building base */}
      <rect x="10" y="13" width="8" height="7" strokeWidth="2" />
      {/* Arched door */}
      <path d="M13 16 L13 20 L15 20 L15 16 Q15 15 14 15 Q13 15 13 16" strokeWidth="1.5" />
    </svg>
  );
};
