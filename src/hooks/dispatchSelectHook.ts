import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState,AppDispatch } from "../services/redux-store/store";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
