
import React from "react";
import { Provider } from "react-redux";
import { LogBox, StatusBar, Text } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { COLORS } from "./utils";
import StackNavigator from "./navigation/StackNavigator";
import Toast from 'react-native-toast-message'
import './i18n/i18n';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.PRIMARY} />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PersistGate>
    </Provider>

  );
};

export default App;
//EXAMPLES
/**
 *
 * import Toast from 'react-native-toast-message';
const showToast = () => {
    Toast.show({
      type: 'info',
      text1: 'اهلاً, بك',
      text2: 'This is some something 👋',
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  --------------------
import {useDispatch, useSelector} from 'react-redux';
import {changeLang} from '../../redux/actions/lang';


  const dispatch = useDispatch();
  const lang = useSelector(state => state.langState.locale);

 const _changeLang = () => {
    let payload = {locale: 'en', isRTL: false};
    if (lang === 'en') payload = {locale: 'ar', isRTL: true};
    dispatch(changeLang(payload));
  };



  ------------------------



 */