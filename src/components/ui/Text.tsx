import type { ReactNode } from "react";

type Props = {
  type: "title" | "subtitle" | "body" | "info";
  truncate?: boolean;
  children: ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "danger" | "success" | "warning";
  weight?: "light" | "regular" | "bold";
};

export const Text = ({
  type,
  className = "",
  color,
  truncate,
  children,
  weight = "regular",
}: Props) => {
  return (
    <span
      className={`p-0 m-0 ${
        type === "title"
          ? "text-4xl"
          : type === "subtitle"
            ? "text-2xl"
            : type === "body"
              ? "text-lg"
              : "text-sm"
      } ${truncate ? "truncate" : ""} ${
        color === "primary"
          ? "text-white"
          : color === "secondary"
            ? "text-gray-400"
            : color === "danger"
              ? "text-red-500"
              : color === "success"
                ? "text-green-500"
                : color === "warning"
                  ? "text-yellow-400"
                  : "text-white"
      } ${
        weight === "light"
          ? "font-plight"
          : weight === "regular"
            ? "font-pregular"
            : weight === "bold"
              ? "font-pbold"
              : "font-pregular"
      } ${className}`}
    >
      {children}
    </span>
  );
};
