import { SVGProps } from "react";

export function UnderlineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6 21q-.425 0-.712-.288T5 20t.288-.712T6 19h12q.425 0 .713.288T19 20t-.288.713T18 21zm6-4q-2.525 0-3.925-1.575t-1.4-4.175V4.275q0-.525.388-.9T7.975 3t.9.375t.375.9V11.4q0 1.4.7 2.275t2.05.875t2.05-.875t.7-2.275V4.275q0-.525.388-.9T16.05 3t.9.375t.375.9v6.975q0 2.6-1.4 4.175T12 17"
      ></path>
    </svg>
  );
}
