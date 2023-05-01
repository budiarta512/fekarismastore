import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStoreTransaction, ITransaction } from "../../utils/types";
import transactionService from "../../services/transactionService";

export interface TraansactionState {
  status: "idle" | "loading" | "failed" | "succeed";
  data: ITransaction[];
  detailData: ITransaction | null;
  errorMsg: any;
}

const initialState: TraansactionState = {
  status: "idle",
  data: [],
  detailData: null,
  errorMsg: {},
};

export const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async (options: string | undefined, { rejectWithValue }) => {
    try {
      const response = await transactionService.fetchTransaction(options);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const showTransaction = createAsyncThunk(
  "transaction/showTransaction",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await transactionService.showTransaction(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const storeTransaction = createAsyncThunk(
  "transaction/storeTransaction",
  async (data: IStoreTransaction, { rejectWithValue }) => {
    try {
      const response = await transactionService.storeTransaction(data);
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

export const updateTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async (
    data: { id: string; data: IStoreTransaction },
    { rejectWithValue }
  ) => {
    try {
      const response = await transactionService.updateTransaction(data);
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

export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await transactionService.deleteTransaction(id);
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

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchTransaction
      .addCase(fetchTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.status = "succeed";
        state.data = action.payload?.data.data;
      })

      // showTransaction
      .addCase(showTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showTransaction.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(showTransaction.fulfilled, (state, action) => {
        state.status = "succeed";
        state.detailData = action.payload.data.data;
      })

      // storeTransaction
      .addCase(storeTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(storeTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(storeTransaction.fulfilled, (state) => {
        state.status = "succeed";
      })

      // updateTransaction
      .addCase(updateTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(updateTransaction.fulfilled, (state) => {
        state.status = "succeed";
      })

      // deleteTransaction
      .addCase(deleteTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.status = "succeed";
      });
  },
});

// export const {getBanner} = bannerSlice.actions

export default transactionSlice.reducer;
