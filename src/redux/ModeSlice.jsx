import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: JSON.parse(window?.localStorage.getItem("theme")) ?? "dark",
};

const ModeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export default ModeSlice.reducer;

export function setMode(value) {
  return (dispatch) => {
    dispatch(ModeSlice.actions.setMode(value));
  };
}
