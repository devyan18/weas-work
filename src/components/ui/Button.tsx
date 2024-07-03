type Props = {
  value: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export const Button = ({ value, variant = "primary", onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`font-pregular ${variant === "secondary" ? "bg-red-600 hover:bg-red-800 text-white" : "bg-gradient-to-l from-secondary-300 to-secondary-900 hover:bg-gradient-to-l hover:from-secondary-900 hover:to-secondary-900 text-white"}  rounded-xl p-1 px-5 active:scale-95 transition-transform duration-120 ease-in-out`}
    >
      {value}
    </button>
  );
};
