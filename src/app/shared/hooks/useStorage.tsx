import { useContext } from 'react';
import { StorageContext } from '../contexts/storage.context';

export const useStorage = () => useContext(StorageContext);
