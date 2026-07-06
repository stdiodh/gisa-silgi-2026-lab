import { useEffect, useState } from 'react';

function getLocalStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

export function useLocalSetting<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = getLocalStorage()?.getItem(key);
    if (!stored) return initialValue;
    try {
      return JSON.parse(stored) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    getLocalStorage()?.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
