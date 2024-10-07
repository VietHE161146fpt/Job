import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedState: (state, action) => {
        state.isLogged = action.payload;
    }
  },
})

export const { setLoggedState } = authSlice.actions

export default authSlice.reducer