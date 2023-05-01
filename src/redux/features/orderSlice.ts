import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../utils/types";
import orderService from "../../services/orderService";

export interface OrderState {
  status: "idle" | "loading" | "failed" | "succeed";
  data: IOrder[];
  detailData: IOrder | null;
  errorMsg: any;
}

const initialState: OrderState = {
  status: "idle",
  data: [],
  detailData: null,
  errorMsg: {},
};

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (options: string | undefined, { rejectWithValue }) => {
    try {
      const response = await orderService.fetchOrder(options);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const showOrder = createAsyncThunk(
  "order/showOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderService.showOrder(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const showOrderByUserId = createAsyncThunk(
  "order/showOrderByUserId",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderService.showOrderByUserId(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const storeOrder = createAsyncThunk(
  "order/storeOrder",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await orderService.storeOrder(data);
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

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (data: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await orderService.updateOrder(data);
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

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderService.deleteOrder(id);
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchOrder
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "succeed";
        state.data = action.payload?.data.data;
      })

      // showOrder
      .addCase(showOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showOrder.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(showOrder.fulfilled, (state, action) => {
        state.status = "succeed";
        state.detailData = action.payload.data.data;
      })

      // showOrderByUserId
      .addCase(showOrderByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showOrderByUserId.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(showOrderByUserId.fulfilled, (state, action) => {
        state.status = "succeed";
        state.detailData = action.payload.data.data;
      })

      // storeOrder
      .addCase(storeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(storeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(storeOrder.fulfilled, (state) => {
        state.status = "succeed";
      })

      // updateOrder
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.status = "succeed";
      })

      // deleteOrder
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.status = "succeed";
      });
  },
});

// export const {getBanner} = bannerSlice.actions

export default orderSlice.reducer;
