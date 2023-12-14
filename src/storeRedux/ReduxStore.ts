import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const ReduxStore = configureStore({ reducer: { user: UserReducer } });

export type AppState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;

type DispatchFunction = () => AppDispatch;
export const useAppDispatch: DispatchFunction = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
