interface IconProps {
  className?: string;
}

export const StoreIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Awning */}
      <path
        d="M4 8 L6 6 L18 6 L20 8 L20 10 L4 10 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Awning stripes */}
      <line x1="8" y1="6" x2="8" y2="10" strokeWidth="2" opacity="0.3" />
      <line x1="12" y1="6" x2="12" y2="10" strokeWidth="2" opacity="0.3" />
      <line x1="16" y1="6" x2="16" y2="10" strokeWidth="2" opacity="0.3" />
      {/* Shop building */}
      <rect x="6" y="10" width="12" height="10" fill="currentColor" opacity="0.6" />
      {/* Window */}
      <rect x="8" y="12" width="3" height="3" fill="white" opacity="0.4" />
      <rect x="13" y="12" width="3" height="3" fill="white" opacity="0.4" />
      {/* Door */}
      <rect x="10" y="16" width="4" height="4" fill="white" opacity="0.3" />
      <circle cx="13" cy="18" r="0.3" fill="currentColor" />
    </svg>
  );
};
