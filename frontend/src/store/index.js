import { configureStore } from "@reduxjs/toolkit";
import audiosReducer from "../features/audios/audiosSlice";

export const store = configureStore({
  reducer: {
    audios: audiosReducer,
  },
});
