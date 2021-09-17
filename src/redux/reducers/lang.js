import { CHANGE_LANG } from "../types";

const INITIAL_STATE = {
  locale: "en",
  isRTL: false,
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case CHANGE_LANG:
      return {
        ...state,
        locale: action.payload.locale,
        isRTL: action.payload.isRTL,
      };
    default:
      return state;
  }
};
