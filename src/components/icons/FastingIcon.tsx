interface IconProps {
  className?: string;
}

export const FastingIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Crescent Moon */}
      <path
        d="M8 4 A7 7 0 0 0 8 18 A5 5 0 0 1 8 4"
        fill="currentColor"
      />
      {/* Airplane */}
      <path d="M15 8 L19 10 L15 12 Z" fill="currentColor" />
      <rect x="13" y="9.5" width="4" height="1" fill="currentColor" />
      <path d="M13 9 L13 11 L14 10.5 Z" fill="currentColor" />
    </svg>
  );
};
