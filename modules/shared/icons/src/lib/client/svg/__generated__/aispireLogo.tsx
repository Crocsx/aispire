import * as React from 'react';
import type { SVGProps } from 'react';
const SvgAispireLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 100 100"
    fill="currentColor"
    {...props}
  >
    <circle cx={50} cy={40} r={20} />
    <circle cx={43} cy={37} r={3} fill="#FFF" />
    <circle cx={57} cy={37} r={3} fill="#FFF" />
    <path fill="none" stroke="#FFF" strokeWidth={2} d="M43 45q7 7 14 0" />
    <rect width={30} height={25} x={35} y={60} fill="currentColor" rx={5} />
    <path stroke="currentColor" strokeWidth={3} d="M40 25 30 10" />
    <circle cx={30} cy={10} r={3} fill="currentColor" />
    <path stroke="currentColor" strokeWidth={3} d="m60 25 10-15" />
    <circle cx={70} cy={10} r={3} fill="currentColor" />
  </svg>
);
export default SvgAispireLogo;
