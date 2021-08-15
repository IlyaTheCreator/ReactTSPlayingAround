import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

// this file's main purpose is to provide the necessary types for hooks.
// dispatch is for running reducers by an action
// selector is for getting whatever we need from state

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector