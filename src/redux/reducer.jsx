import { combineReducers } from "@reduxjs/toolkit";
import stateSlice from "./stateSlice";
import modeSlice from "./ModeSlice";
import svgSlice from "./svgSlice";
import formSlice from "./FormSlice";

const rootReducer = combineReducers({
  user: stateSlice,
  mode: modeSlice,
  svg: svgSlice,
  form: formSlice,
});

export { rootReducer };
