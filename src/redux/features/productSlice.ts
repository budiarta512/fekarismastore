import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct, IUser } from "../../utils/types";
import productService from "../../services/productService";

export interface UserState {
  status: "idle" | "loading" | "failed" | "succeed";
  data: IProduct[];
  detailData: IProduct | null;
  errorMsg: any;
}

const initialState: UserState = {
  status: "idle",
  data: [],
  detailData: null,
  errorMsg: {},
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (e, { rejectWithValue }) => {
    try {
      const response = await productService.fetchProduct();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const showProduct = createAsyncThunk(
  "product/showProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productService.showProduct(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const storeProduct = createAsyncThunk(
  "product/storeProduct",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await productService.storeProduct(data);
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await productService.updateProduct(data);
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productService.deleteProduct(id);
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchProduct
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeed";
        state.data = action.payload?.data.data;
      })

      // showProduct
      .addCase(showProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showProduct.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(showProduct.fulfilled, (state, action) => {
        state.status = "succeed";
        state.detailData = action.payload.data.data;
      })

      // storeProduct
      .addCase(storeProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(storeProduct.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(storeProduct.fulfilled, (state) => {
        state.status = "succeed";
      })

      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.status = "succeed";
      })

      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = "succeed";
      });
  },
});

// export const {getBanner} = bannerSlice.actions

export default productSlice.reducer;
