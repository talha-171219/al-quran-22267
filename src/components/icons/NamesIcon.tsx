interface IconProps {
  className?: string;
}

export const NamesIcon = ({ className = "h-6 w-6" }: IconProps) => {
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
      {/* Star with Arabic calligraphy style */}
      <path
        d="M12 2 L14.5 9 L22 9.5 L16 14.5 L18 22 L12 17.5 L6 22 L8 14.5 L2 9.5 L9.5 9 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Arabic style decorative elements */}
      <circle cx="12" cy="12" r="3" fill="white" opacity="0.3" />
      <path
        d="M10 11.5 Q12 10 14 11.5"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.8"
      />
      <circle cx="12" cy="13" r="0.5" fill="white" />
    </svg>
  );
};
