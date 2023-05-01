import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStoreSupplier, ISupplier } from "../../utils/types";
import SupplierService from "../../services/SupplierService";

export interface SupplierState {
  status: "idle" | "loading" | "failed" | "succeed";
  data: ISupplier[];
  detailData: ISupplier | null;
  errorMsg: any;
}

const initialState: SupplierState = {
  status: "idle",
  data: [],
  detailData: null,
  errorMsg: {},
};

export const fetchSupplier = createAsyncThunk(
  "supplier/fetchSupplier",
  async (options: string | undefined, { rejectWithValue }) => {
    try {
      const response = await SupplierService.fetchSupplier(options);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const showSupplier = createAsyncThunk(
  "supplier/showSupplier",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await SupplierService.showSupplier(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const storeSupplier = createAsyncThunk(
  "supplier/storeSupplier",
  async (data: IStoreSupplier, { rejectWithValue }) => {
    try {
      const response = await SupplierService.storeSupplier(data);
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

export const updateSupplier = createAsyncThunk(
  "supplier/updateSupplier",
  async (data: { id: string; data: IStoreSupplier }, { rejectWithValue }) => {
    try {
      const response = await SupplierService.updateSupplier(data);
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

export const deleteSupplier = createAsyncThunk(
  "supplier/deleteSupplier",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await SupplierService.deleteSupplier(id);
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

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchSupplier
      .addCase(fetchSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSupplier.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(fetchSupplier.fulfilled, (state, action) => {
        state.status = "succeed";
        state.data = action.payload?.data.data;
      })

      // showSupplier
      .addCase(showSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showSupplier.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(showSupplier.fulfilled, (state, action) => {
        state.status = "succeed";
        state.detailData = action.payload.data.data;
      })

      // storeSupplier
      .addCase(storeSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(storeSupplier.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(storeSupplier.fulfilled, (state) => {
        state.status = "succeed";
      })

      // updateSupplier
      .addCase(updateSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(updateSupplier.fulfilled, (state) => {
        state.status = "succeed";
      })

      // deleteSupplier
      .addCase(deleteSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(deleteSupplier.fulfilled, (state) => {
        state.status = "succeed";
      });
  },
});

// export const {getBanner} = bannerSlice.actions

export default supplierSlice.reducer;
