import type React from "react";
import { Navbar } from "../ui/Navbar";
import { Sidebar } from "../ui/Sidebar";

type Props = {
  children: React.ReactNode;
};

export const LayoutPage = ({ children }: Props) => {
  return (
    <div className="bg-primary min-h-dvh text-white p-4 grid gap-4 grid-rows-12 grid-cols-12">
      <Sidebar className="row-start-1 row-span-12 col-span-2" />
      <Navbar className="col-start-3 col-span-12 row-start-1" />
      <main className="row-start-2 row-span-11 col-span-12 bg-black-200 rounded-3xl">
        {children}
      </main>
    </div>
  );
};
