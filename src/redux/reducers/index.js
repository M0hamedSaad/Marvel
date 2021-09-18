import { combineReducers } from "redux";
import langState from "./lang";
import charactersState from "./getCharacters";


export default combineReducers({
  langState,
  charactersState
});
