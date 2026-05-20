"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbContextType {

  items: BreadcrumbItem[];

  setItems: (
    items: BreadcrumbItem[]
  ) => void;
}

const BreadcrumbContext =
  createContext<
    BreadcrumbContextType | undefined
  >(undefined);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [items, setItems] =
    useState<BreadcrumbItem[]>([]);

  return (

    <BreadcrumbContext.Provider
      value={{
        items,
        setItems,
      }}
    >

      {children}

    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbs() {

  const context =
    useContext(BreadcrumbContext);

  if (!context) {

    throw new Error(
      "useBreadcrumbs must be used within BreadcrumbProvider"
    );
  }

  return context;
}