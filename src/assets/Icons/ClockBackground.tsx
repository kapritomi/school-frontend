export const ClockBackground = () => {
  return (
    <svg
      width="266"
      height="80"
      viewBox="0 0 266 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_757_3351)">
        <path
          d="M262 0H4V28.368C4 33.08 6.54974 37.4231 10.6642 39.7196L65.5466 70.3516C67.4833 71.4325 69.6644 72 71.8823 72H133H194.118C196.336 72 198.517 71.4325 200.453 70.3516L255.336 39.7196C259.45 37.4231 262 33.08 262 28.368V0Z"
          fill="#2E6544"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_757_3351"
          x="0"
          y="0"
          width="266"
          height="80"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_757_3351"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_757_3351"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
