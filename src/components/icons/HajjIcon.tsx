interface IconProps {
  className?: string;
}

export const HajjIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Kaaba outline */}
      <rect x="7" y="9" width="10" height="11" rx="0.5" />
      {/* Top band */}
      <line x1="7" y1="12" x2="17" y2="12" strokeWidth="2.5" />
      {/* Vertical bands */}
      <line x1="9.5" y1="9" x2="9.5" y2="20" strokeWidth="1" />
      <line x1="14.5" y1="9" x2="14.5" y2="20" strokeWidth="1" />
      {/* Door */}
      <rect x="10.5" y="15" width="3" height="5" strokeWidth="1.5" />
      {/* Top decorative line */}
      <line x1="6" y1="9" x2="18" y2="9" strokeWidth="1.5" />
    </svg>
  );
};
