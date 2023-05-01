import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin, IRegister, IUser } from "../../utils/types";
import userService from "../../services/userService";
import { getToken, login as setToken } from "../../utils/auth";

export interface UserState {
  status: "idle" | "loading" | "failed" | "succeed";
  data: IUser[];
  detailData: any;
  errorMsg: any;
  isLogin: boolean;
  user: IUser | null;
}

const initialState: UserState = {
  status: "idle",
  data: [],
  detailData: [],
  errorMsg: {},
  isLogin: getToken() ? true : false,
  user: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (options: string | undefined, { rejectWithValue }) => {
    try {
      const response = await userService.fetchUser(options);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const showUser = createAsyncThunk(
  "user/showUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userService.showUser(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: ILogin, { rejectWithValue }) => {
    try {
      const response = await userService.loginUser(data);
      if (response.status === 200) {
        setToken(response.data.data.access_token);
        window.location.reload();
        return response;
      } else {
        return rejectWithValue(response.data.errors);
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: IRegister, { rejectWithValue }) => {
    try {
      const response = await userService.registerUser(data);
      if (response.status === 201) {
        return response;
      } else {
        return rejectWithValue(response.data.errors);
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const verify = createAsyncThunk(
  "user/verify",
  async (options: string | undefined, { rejectWithValue }) => {
    try {
      const response = await userService.verify(options);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeed";
        state.data = action.payload?.data;
      })

      // showUser
      .addCase(showUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.status = "succeed";
        state.detailData = action.payload.data.data;
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "succeed";
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeed";
      })

      // verify
      .addCase(verify.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verify.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.status = "succeed";
        state.user = action.payload.data.data.user;
      });
  },
});

// export const {getBanner} = bannerSlice.actions

export default userSlice.reducer;
