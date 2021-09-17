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
import { useNavigation } from '@react-navigation/native';

import { translate } from '../../i18n'

import Facebook from "../../assets/images/facebook.svg"
import Twitter from "../../assets/images/twitter.svg"
import Instagram from "../../assets/images/instagram.svg"
import { Header } from '../../components/header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const Home = ({ route }) => {
  const navigation = useNavigation();
  const username = route?.params?.username

  const searching = () => {
    alert('call search api...')
    //navigation.dispatch(StackActions.replace('Ho', { username }))
  }
  return (

    <SafeAreaView style={styles.container} >
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <Header username={username} searching={searching} />


        <View style={styles.icons}>
          <Facebook style={styles.icon} />
          <Twitter style={styles.icon} />
          <Instagram style={styles.icon} />
        </View>
        <Text style={styles.txtRights}>{translate('rights')}</Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Home;
