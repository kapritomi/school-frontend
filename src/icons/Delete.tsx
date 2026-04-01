type IconProps = React.SVGProps<SVGSVGElement>;

export function DeleteIcon(props: IconProps) {
  return (
    <svg
      width="30"
      height="28"
      viewBox="0 0 30 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 6H30.0008" stroke="currentColor" strokeWidth="2" />
      <path
        d="M1 6.00098C1 6.00098 5.5 6.50098 5.5 7.50098C5.5 8.50098 5.51238 25.4668 5.5 26.001C5.48762 26.5351 24.5026 26.542 24.5 26.001C24.4974 25.46 24.5 7.99922 24.5 7.5C24.5 6.5 29 6.00176 29 6.00176"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="11"
        y1="13"
        x2="11"
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="19"
        y1="13"
        x2="19"
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 2C11 2 12.5 1 15 1C17.5 1 19 2 19 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
