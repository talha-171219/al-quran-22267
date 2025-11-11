interface IconProps {
  className?: string;
}

export const HajjIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Kaaba structure */}
      <rect x="8" y="10" width="8" height="10" fill="currentColor" opacity="0.9" />
      <path d="M8 10 L12 6 L16 10" fill="currentColor" opacity="0.7" />
      {/* Door */}
      <rect x="10.5" y="15" width="3" height="5" fill="white" opacity="0.3" />
      {/* Decorative band */}
      <line x1="7" y1="14" x2="17" y2="14" strokeWidth="2" />
      {/* Corner stones */}
      <circle cx="16.5" cy="15" r="0.8" fill="gold" />
    </svg>
  );
};
