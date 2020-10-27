import { combineReducers } from "redux";
import searchReducer from "./searchReducer";

// Even though we are only using a single reducer this will come useful as the application grows
const rootReducer = combineReducers({
  searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

