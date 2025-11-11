interface IconProps {
  className?: string;
}

export const ShahadaIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Calligraphy waves */}
      <path
        d="M4 10 Q8 8 12 10 T20 10"
        fill="none"
        strokeWidth="2"
      />
      <path
        d="M4 14 Q8 12 12 14 T20 14"
        fill="none"
        strokeWidth="1.5"
      />
      {/* Speaker/Audio icon */}
      <path d="M15 4 L15 20 L11 16 L7 16 L7 8 L11 8 Z" fill="currentColor" opacity="0.8" />
      {/* Sound waves */}
      <path d="M17 8 Q19 10 19 12 Q19 14 17 16" fill="none" strokeWidth="1.5" />
      <path d="M19 6 Q22 9 22 12 Q22 15 19 18" fill="none" strokeWidth="1.5" />
    </svg>
  );
};
