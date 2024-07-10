import { SVGProps } from "react";

export function MaterialSymbolsCheckBoxOutlineBlank(
  props: SVGProps<SVGSVGElement>,
) {
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
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsCheckBoxRounded(props: SVGProps<SVGSVGElement>) {
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
        d="m10.6 13.4l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.5q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
      ></path>
    </svg>
  );
}

export const Checker = ({
  startCheck,
  className = "",
}: {
  startCheck: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-center ${className} h-[24px] w-[24px]`}
    >
      {!startCheck ? (
        <MaterialSymbolsCheckBoxOutlineBlank width={20} height={20} />
      ) : (
        <MaterialSymbolsCheckBoxRounded width={20} height={20} />
      )}
    </div>
  );
};
