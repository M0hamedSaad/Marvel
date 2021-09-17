import Toast from 'react-native-toast-message';
import { store } from '../redux/store';
import RNRestart from 'react-native-restart';
import { I18nManager } from 'react-native'

export const showToast = (msg, type) => {
  Toast.show({
    type: 'error',
    text1: msg,
    visibilityTime: 2000,
    autoHide: true,
  });
};

export const check_lang = async () => {
  const state = store.getState();
  const lang = state.langState.locale
  console.log({ lang });

  if (lang == 'ar') {
    I18nManager.forceRTL(true);
    if (!I18nManager.isRTL) {
      setTimeout(() => { RNRestart.Restart(); }, 300);
    }
  }
  else {
    I18nManager.forceRTL(false);
    if (I18nManager.isRTL) {
      setTimeout(() => { RNRestart.Restart(); }, 300);
    }
  }

};
