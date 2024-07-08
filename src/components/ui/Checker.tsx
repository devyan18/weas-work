import { SVGProps } from "react";

export function MaterialSymbolsCheckIndeterminateSmallRounded(
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
        d="M7 13q-.425 0-.712-.288T6 12t.288-.712T7 11h10q.425 0 .713.288T18 12t-.288.713T17 13z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsFitbitCheckSmallRounded(
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
        d="m10.5 13.4l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-5.6 5.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.9 1.9Z"
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
    <div className={`flex items-center justify-center ${className}`}>
      {!startCheck ? (
        <MaterialSymbolsCheckIndeterminateSmallRounded width={24} height={24} />
      ) : (
        <MaterialSymbolsFitbitCheckSmallRounded width={24} height={24} />
      )}
    </div>
  );
};
