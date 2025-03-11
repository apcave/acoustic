import { configureStore } from "@reduxjs/toolkit";

import materialReducer from "@/store/materialSlice";
import modelReducer from "@/store/modelSlice";
import uiReducer from "@/store/uiSlice";

const store = configureStore({
  reducer: {
    mat: materialReducer,
    ui: uiReducer,
    model: modelReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
