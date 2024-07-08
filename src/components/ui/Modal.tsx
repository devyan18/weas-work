import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
  static?: boolean;
};

export const Modal = (props: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (props.onClose) props.onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  return (
    <dialog
      open={props.open}
      className={`absolute top-0 left-0 w-screen min-h-screen backdrop-blur-md bg-transparent ${props.open ? "flex flex-row justify-center items-center min-h-screen" : ""}`}
      onClick={() => {
        if (props.static) {
          return;
        }

        if (props.onClose) props.onClose();
      }}
    >
      <div className="" onClick={(e) => e.stopPropagation()}>
        {props.open ? props.children : null}
      </div>
    </dialog>
  );
};

export const useModal = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return {
    toggle: () => setOpen(!isOpen),
    open: () => setOpen(true),
    close: () => setOpen(false),
    isOpen,
  };
};
