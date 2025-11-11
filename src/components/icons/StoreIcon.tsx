interface IconProps {
  className?: string;
}

export const StoreIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Awning */}
      <path d="M5 8 L6 6 L18 6 L19 8 Z" fill="currentColor" strokeWidth="2" />
      {/* Awning stripes */}
      <line x1="8" y1="6" x2="8" y2="8" strokeWidth="1.5" />
      <line x1="10" y1="6" x2="10" y2="8" strokeWidth="1.5" />
      <line x1="12" y1="6" x2="12" y2="8" strokeWidth="1.5" />
      <line x1="14" y1="6" x2="14" y2="8" strokeWidth="1.5" />
      <line x1="16" y1="6" x2="16" y2="8" strokeWidth="1.5" />
      {/* Building */}
      <rect x="6" y="8" width="12" height="12" strokeWidth="2" />
      {/* Windows */}
      <rect x="8" y="10" width="2.5" height="2.5" strokeWidth="1.5" />
      <rect x="11" y="10" width="2.5" height="2.5" strokeWidth="1.5" />
      <rect x="14" y="10" width="2.5" height="2.5" strokeWidth="1.5" />
      {/* Door */}
      <rect x="10" y="15" width="4" height="5" strokeWidth="1.5" />
      <circle cx="13" cy="17.5" r="0.4" fill="currentColor" />
    </svg>
  );
};
