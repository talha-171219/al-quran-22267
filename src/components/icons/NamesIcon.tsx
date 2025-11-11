interface IconProps {
  className?: string;
}

export const NamesIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Star frame */}
      <path
        d="M12 2 L14 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10 8 Z"
        strokeWidth="2.5"
      />
      {/* Allah calligraphy (stylized) */}
      <text x="12" y="14" fontSize="8" textAnchor="middle" fill="currentColor" fontWeight="bold" style={{ fontFamily: 'serif' }}>
        الله
      </text>
    </svg>
  );
};
