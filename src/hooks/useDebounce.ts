import { useCallback } from 'react';

export const useDebounce = (
  func: (value: string) => void,
  wait: number
) => {
  return useCallback(
    (value: string) => {
      const timeout = setTimeout(() => func(value), wait);
      return () => clearTimeout(timeout);
    },
    [func, wait]
  );
}; 