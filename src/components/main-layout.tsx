import { StoreProvider } from "@/contexts/store-provider";
import React from "react";

export interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return (
    <StoreProvider>
      <main className="py-16">{children}</main>
    </StoreProvider>
  );
}
