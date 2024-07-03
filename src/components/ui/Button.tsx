type Props = {
  value: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  size?: "sm" | "md" | "lg";
};

export const Button = ({
  value,
  variant = "primary",
  onClick,
  type = "button",
  size = "md",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-pregular ${variant === "secondary" ? "bg-red-600 hover:bg-red-800 text-white" : "bg-gradient-to-l from-secondary-300 to-secondary-900 hover:bg-gradient-to-l hover:from-secondary-900 hover:to-secondary-900 text-white"}  rounded-xl p-1 px-5 active:scale-95 transition-transform duration-120 ease-in-out ${
        size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-lg"
      }`}
    >
      {value}
    </button>
  );
};
