import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard
} from 'react-native';
import styles from './styles';
import { useNavigation, StackActions } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { translate } from '../../i18n'
import { COLORS } from '../../utils';

import Clip from "../../assets/images/login-shape.svg"
import Logo from "../../assets/images/logo.svg"
import Facebook from "../../assets/images/facebook.svg"
import Twitter from "../../assets/images/twitter.svg"
import Instagram from "../../assets/images/instagram.svg"



const Login = () => {
  const navigation = useNavigation();
  const [username, onChangeName] = useState('')

  const dismiss = () => { Keyboard.dismiss() }
  const login = () => {
    Keyboard.dismiss();
    //navigation.dispatch(StackActions.replace('home', { username }))
  }
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

      <View style={styles.icons}>
        <Facebook style={styles.icon} />
        <Twitter style={styles.icon} />
        <Instagram style={styles.icon} />
      </View>

      <Text style={styles.txtRights}>{translate('rights')}</Text>
    </SafeAreaView>
  );
};
export default Login;
