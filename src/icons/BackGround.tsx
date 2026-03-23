type IconProps = React.SVGProps<SVGSVGElement>;

export function BackGround(props: IconProps) {
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 930"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="12" width="1920" height="1080" fill="white" />
      <g filter="url(#filter0_d_909_1957)">
        <path
          d="M1932 528.076C1869.9 478.539 1807.7 429.002 1735.8 414.897C1663.8 400.86 1582.1 422.188 1490.6 417.418C1399.1 412.58 1297.8 381.577 1276.7 327.816C1255.6 274.054 1314.6 197.534 1316.7 139.616C1318.7 81.7664 1263.9 42.5865 1209 3.40674H1932V528.076Z"
          fill="#F3F3F3"
        />
      </g>
      <g filter="url(#filter1_d_909_1957)">
        <path
          d="M9 639.448C91.3 595.702 173.7 551.957 259.3 550.594C345 549.232 433.9 590.251 464.5 648.306C495.1 706.36 467.3 781.449 517.1 824.036C566.8 866.622 694 876.707 742.3 913.161C790.5 949.684 759.8 1012.64 729 1075.54H9V639.448Z"
          fill="#F3F3F3"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_909_1957"
          x="1193"
          y="1.40674"
          width="755"
          height="556.669"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="14" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_909_1957"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_909_1957"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_909_1957"
          x="0"
          y="550.562"
          width="790.395"
          height="572.975"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="7" dy="32" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_909_1957"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_909_1957"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
