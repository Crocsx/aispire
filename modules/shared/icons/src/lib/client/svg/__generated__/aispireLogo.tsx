import * as React from 'react';
import type { SVGProps } from 'react';
const SvgAispireLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 100 100"
    {...props}
  >
    <circle cx={50} cy={50} r={45} fill="currentColor" opacity={0.1} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={4}
      d="M50 85V55m0 0L35 40m15 15 15-15"
      opacity={0.8}
    />
    <circle cx={50} cy={30} r={10} fill="currentColor" opacity={0.8} />
    <rect
      width={20}
      height={20}
      x={40}
      y={65}
      fill="currentColor"
      opacity={0.6}
      rx={5}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M45 70v10m10-10v10m-5-10v10"
      opacity={0.8}
    />
    <path
      fill="currentColor"
      d="m70 20 5-5 5 5-5 5ZM25 70l5-5 5 5-5 5Z"
      opacity={0.6}
    />
  </svg>
);
export default SvgAispireLogo;
