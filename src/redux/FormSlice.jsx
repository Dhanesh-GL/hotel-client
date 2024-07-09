import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: "login",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm(state, action) {
      state.form = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export default formSlice.reducer;

export function setForm(value) {
  return (dispatch) => {
    dispatch(formSlice.actions.setForm(value));
  };
}
