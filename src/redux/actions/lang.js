import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";
import { CHANGE_LANG } from "../types";

export const changeLang = (payload) => {
  I18nManager.forceRTL(payload.isRTL)
  setTimeout(() => {
    RNRestart.Restart();
  }, 300);
  return {
    type: CHANGE_LANG,
    payload,
  };
};



