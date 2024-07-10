import { ReactNode } from "@tanstack/react-router";
import { createContext, useState, useEffect, useContext } from "react";

type Layout = {
  viewSidebar: boolean;
};

type LayoutContextType = {
  layout: Layout;
  toggleSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType>({
  layout: {
    viewSidebar: true,
  },
  toggleSidebar: () => {},
});

type Props = {
  children: ReactNode;
};

export const LayoutProvider = (props: Props) => {
  const [layout, setLayout] = useState<Layout>({
    viewSidebar: true,
  });

  useEffect(() => {
    const layout = localStorage.getItem("layout");
    if (layout) {
      setLayout(JSON.parse(layout));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("layout", JSON.stringify(layout));
  }, [layout]);

  return (
    <LayoutContext.Provider
      value={{
        layout,
        toggleSidebar: () =>
          setLayout({ ...layout, viewSidebar: !layout.viewSidebar }),
      }}
    >
      {props.children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
