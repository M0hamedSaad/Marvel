import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import styles from './styles';
import { useNavigation, StackActions } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { translate } from '../../i18n'
import { COLORS } from '../../utils';
import Toast from 'react-native-simple-toast';

import Clip from "../../assets/images/login-shape.svg"
import Logo from "../../assets/images/logo.svg"
import Facebook from "../../assets/images/facebook.svg"
import Twitter from "../../assets/images/twitter.svg"
import Instagram from "../../assets/images/instagram.svg"


import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../../redux/actions/lang';






const Login = () => {
  const navigation = useNavigation();
  const [username, onChangeName] = useState('')

  const dispatch = useDispatch();
  const lang = useSelector(state => state.langState.locale);

  const _changeLang = () => {
    let payload = { locale: 'en', isRTL: false };
    if (lang === 'en') payload = { locale: 'ar', isRTL: true };
    dispatch(changeLang(payload));
  };

  const dismiss = () => { Keyboard.dismiss() }
  const login = () => {
    //Keyboard.dismiss();
    navigation.navigate('Home', { username })

    // username ? navigation.dispatch(StackActions.replace('Home', { username }))
    //   : Toast.show(translate('nameRequire'), Toast.SHORT);
    //  ToastAndroid.show('Username is required.', ToastAndroid.SHORT)
  }


  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (

    <SafeAreaView
      style={styles.container}
      onStartShouldSetResponder={dismiss}>

      <Logo style={styles.logo} />
      <Clip style={styles.clip} width={wp(100)} height={hp(100)} />

      <TextInput
        onChangeText={onChangeName}
        selectionColor={COLORS.LIGHT}
        style={styles.input}
        placeholderTextColor={COLORS.LIGHT}
        placeholder={translate('username')} />

      <TextInput
        secureTextEntry
        selectionColor={COLORS.LIGHT}
        style={styles.input}
        placeholderTextColor={COLORS.LIGHT}
        placeholder={translate('password')} />

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnTxt}>{translate('login')}</Text>
      </TouchableOpacity>

      {!keyboardStatus &&
        <>
          <View style={styles.icons}>
            <Facebook style={styles.icon} />
            <Twitter style={styles.icon} />
            <Instagram style={styles.icon} />
          </View>

          <Text style={styles.txtRights}>{translate('rights')}</Text>

          <TouchableOpacity onPress={_changeLang}>
            <Text style={[styles.txtRights, { textDecorationLine: 'underline' }]}>{translate('en')}</Text>
          </TouchableOpacity>
        </>
      }

    </SafeAreaView>
  );
};
export default Login;
