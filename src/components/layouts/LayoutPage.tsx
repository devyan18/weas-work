import type React from "react";
import { Navbar, Sidebar } from "@/components/ui";
import { useLayout } from "@/providers/LayoutProvider";

type Props = {
  children: React.ReactNode;
};

export const LayoutPage = ({ children }: Props) => {
  const { layout } = useLayout();

  return (
    <div
      className={`bg-primary min-h-dvh text-white p-4 grid gap-4 grid-rows-[49px_minmax(49px,_1fr)_100px] ${
        layout.viewSidebar ? "" : "grid-cols-[49px_minmax(49px,_1fr)_100px]"
      }`}
    >
      <Sidebar
        className={`row-start-1  ${
          layout.viewSidebar
            ? "col-start-1 col-span-2 row-span-12"
            : "col-start-1 col-span-1 row-start-1 row-span-1 w-[58px] h-[48px] flex items-center justify-center pt-8"
        }`}
      />
      <Navbar
        className={`${
          layout.viewSidebar
            ? "col-start-3 col-end-14"
            : "col-start-2 col-end-13"
        } col-span-12 row-start-1`}
      />
      <main
        className={`row-start-2 row-span-11 bg-black-200 rounded-3xl ${
          layout.viewSidebar
            ? "col-start-3 col-span-12"
            : "col-start-1 col-end-13"
        }`}
      >
        {children}
      </main>
    </div>
  );
};
