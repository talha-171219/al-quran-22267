interface IconProps {
  className?: string;
}

export const FastingIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Crescent Moon */}
      <path
        d="M9 3 A6 6 0 0 0 9 17 A4 4 0 0 1 9 3"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Star */}
      <path
        d="M17 4 L17.5 5.5 L19 6 L17.5 6.5 L17 8 L16.5 6.5 L15 6 L16.5 5.5 Z"
        fill="currentColor"
      />
      {/* Plate */}
      <ellipse cx="12" cy="18" rx="6" ry="2" strokeWidth="1.5" />
      {/* Fork and Spoon crossed */}
      <line x1="10" y1="14" x2="10" y2="21" strokeWidth="1" />
      <line x1="14" y1="14" x2="14" y2="21" strokeWidth="1" />
      <line x1="9" y1="15" x2="11" y2="15" strokeWidth="1" />
      <line x1="9" y1="16" x2="11" y2="16" strokeWidth="1" />
    </svg>
  );
};
