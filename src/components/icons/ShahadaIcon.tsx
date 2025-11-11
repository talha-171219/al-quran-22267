interface IconProps {
  className?: string;
}

export const ShahadaIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Fork */}
      <line x1="8" y1="8" x2="8" y2="16" strokeWidth="2" />
      <line x1="6" y1="8" x2="6" y2="11" strokeWidth="1.5" />
      <line x1="10" y1="8" x2="10" y2="11" strokeWidth="1.5" />
      {/* Knife */}
      <line x1="16" y1="8" x2="16" y2="16" strokeWidth="2" />
      <path d="M14 8 L18 8 L16 10 Z" fill="currentColor" />
      {/* Allah text */}
      <text x="4" y="6" fontSize="6" fill="currentColor" fontWeight="bold" style={{ fontFamily: 'serif' }}>الله</text>
      {/* Speaker */}
      <path d="M18 18 L18 22 L16 21 L14 21 L14 19 L16 19 Z" fill="currentColor" strokeWidth="0" />
      <path d="M19 19 Q20 20 20 20.5 Q20 21 19 22" strokeWidth="1.5" />
    </svg>
  );
};
