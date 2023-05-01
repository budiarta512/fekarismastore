import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./features/userSlice";
import productSlice from "./features/productSlice";
import supplierSlice from "./features/supplierSlice";
import cartSlice from "./features/cartSlice";
import orderSlice from "./features/orderSlice";
import transactionSlice from "./features/transactionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    supplier: supplierSlice,
    cart: cartSlice,
    order: orderSlice,
    transaction: transactionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
