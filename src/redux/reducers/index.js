import { combineReducers } from "redux";
import langState from "./lang";
import charactersState from "./getCharacters";
import searchState from "./getSearch";


export default combineReducers({
  langState,
  charactersState,
  searchState
});
