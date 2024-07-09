import { createSlice } from "@reduxjs/toolkit";
import login1 from "../assets/login2.svg";
import login2 from "../assets/login1.svg";
import register1 from "../assets/register2.svg";
import register2 from "../assets/register1.svg";
import forgot1 from "../assets/reset2.svg";
import forgot2 from "../assets/reset1.svg";
import landing1 from "../assets/landing1.svg";
import landing2 from "../assets/landing2.svg";
import profile1 from "../assets/profile1.svg";
import profile2 from "../assets/profile2.svg";

const theme = {
  theme: JSON.parse(window?.localStorage.getItem("theme")) ?? "dark",
};
 const initialState = {
  login: theme.theme === "dark" ? login2 : login1,
  register: theme.theme === "dark" ? register1 : register2,
  forgot: theme.theme === "dark" ? forgot1 : forgot2,
  landing: theme.theme === "dark" ? landing2 : landing1,
  profile: theme.theme === "dark" ? profile2 : profile1,
};

const svgSlice = createSlice({
  name: "svg",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.login = action.payload;
    },
    setRegister(state, action) {
      state.register = action.payload;
    },
    setForgot(state, action) {
      state.forgot = action.payload;
    },
    setLanding(state, action) {
      state.landing = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});
 
export default svgSlice.reducer;

export function setLogin(value) {
  return (dispatch) => {
    dispatch(svgSlice.actions.setLogin(value));
  };
}

export function setRegister(value) {
  return (dispatch) => {
    dispatch(svgSlice.actions.setRegister(value));
  };
}

export function setForgot(value) {
  return (dispatch) => {
    dispatch(svgSlice.actions.setForgot(value));
  };
}

export function setLanding(value) {
  return (dispatch) => {
    dispatch(svgSlice.actions.setLanding(value));
  };
}
export function setProfile(value) {
  return (dispatch) => {
    dispatch(svgSlice.actions.setProfile(value));
  };
}
