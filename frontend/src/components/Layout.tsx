import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <Navigation />
      <main className="pb-20 md:pt-20 md:pb-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;