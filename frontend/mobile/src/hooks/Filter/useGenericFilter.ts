import { useState } from 'react';

export function useGenericFilter<T extends Record<string, any>>() {
  const [filters, setFilters] = useState<T>({} as T);

  function setFilter<K extends keyof T>(key: K, value: T[K]) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function replaceFilters(data: T) {
    setFilters(data);
  }

  function clearFilters() {
    setFilters({} as T);
  }

  return {
    filters,
    setFilter,      
    setFilters: replaceFilters, 
    clearFilters,
  };
}
