import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store';

/** Typed hooks — ใช้แทน useDispatch/useSelector ดิบทั้ง project */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector;
