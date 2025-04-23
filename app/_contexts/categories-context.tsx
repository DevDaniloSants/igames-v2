"use client";

import { Category } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

import { getCategories } from "../_data-access/category/get-categories";

type CategoriesContextType = {
  categories: Category[];
  loading: boolean;
  error: Error | null;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined,
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        if (categories.length <= 0) {
          const data = await getCategories();
          setCategories(data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Erro ao carregar categorias"),
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, [categories]);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error(
      "useCategories deve ser usado dentro de um CategoriesProvider",
    );
  }
  return context;
}
