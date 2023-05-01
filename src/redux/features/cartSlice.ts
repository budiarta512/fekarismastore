import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart, IStoreCart } from "../../utils/types";
import cartService from "../../services/cartService";

export interface CartState {
  status: "idle" | "loading" | "failed" | "succeed";
  data: ICart[];
  detailData: ICart | null;
  errorMsg: any;
  refreshCart: number;
}

const initialState: CartState = {
  status: "idle",
  data: [],
  detailData: null,
  errorMsg: {},
  refreshCart: 0,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (options: string | undefined, { rejectWithValue }) => {
    try {
      const response = await cartService.fetchCart(options);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const showCart = createAsyncThunk(
  "cart/showCart",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await cartService.showCart(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const storeCart = createAsyncThunk(
  "cart/storeCart",
  async (data: IStoreCart, { rejectWithValue }) => {
    try {
      const response = await cartService.storeCart(data);
      if (response.status === 201) {
        return response;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (data: { id: string; data: IStoreCart }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateCart(data);
      if (response.status === 200) {
        return response;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await cartService.deleteCart(id);
      if (response.status === 200) {
        return response;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    refreshCart: (state) => {
      state.refreshCart = state.refreshCart + 1;
    },
  },
  extraReducers: (builder) => {
    builder

      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeed";
        state.data = action.payload?.data.data;
      })

      // showCart
      .addCase(showCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(showCart.fulfilled, (state, action) => {
        state.status = "succeed";
        state.detailData = action.payload.data.data;
      })

      // storeCart
      .addCase(storeCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(storeCart.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(storeCart.fulfilled, (state) => {
        state.status = "succeed";
      })

      // updateCart
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(updateCart.fulfilled, (state) => {
        state.status = "succeed";
      })

      // deleteCart
      .addCase(deleteCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.status = "succeed";
      });
  },
});

// export const {getBanner} = bannerSlice.actions

export const { refreshCart } = cartSlice.actions;
export default cartSlice.reducer;
