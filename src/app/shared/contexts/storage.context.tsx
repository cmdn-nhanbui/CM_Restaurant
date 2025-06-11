import { createContext, type ReactNode } from 'react';

const defaultValue = undefined;

export const Storage = ({ children }: { children: ReactNode }) => {
  return <StorageContext.Provider value={undefined}>{children}</StorageContext.Provider>;
};

export const StorageContext = createContext(defaultValue);
