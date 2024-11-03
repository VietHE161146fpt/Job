// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    singleUser: null,
    users: [], // Danh sách tất cả người dùng
    searchUserByText: "",
  },
  reducers: {
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSearchUserByText: (state, action) => {
      state.searchUserByText = action.payload;
    },
  },
});

export const { setSingleUser, setUsers, setSearchUserByText } = userSlice.actions;
export default userSlice.reducer;
