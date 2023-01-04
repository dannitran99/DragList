import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import listDrag from "./slices/listDrag";

export const store = configureStore({
  reducer: {
    listDrag,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
