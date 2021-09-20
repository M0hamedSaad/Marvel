import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import { translate } from '../../i18n'

import Facebook from "../../assets/images/facebook.svg"
import Twitter from "../../assets/images/twitter.svg"
import Instagram from "../../assets/images/instagram.svg"
import { Header, MyCarousel } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';



const Home = ({ route }) => {
  const navigation = useNavigation();
  const username = route?.params?.username

  const searching = (searchInput, flag) => {
    navigation.navigate('Search', { searchInput, username })
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
    <SafeAreaView style={styles.container} >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Header username={username} searching={searching} clear={true} defaultValue={''} />

        <MyCarousel />
        {!keyboardStatus &&
          <>
            <View style={styles.icons}>
              <Facebook style={styles.icon} />
              <Twitter style={styles.icon} />
              <Instagram style={styles.icon} />
            </View>
            <Text style={styles.txtRights}>{translate('rights')}</Text>
          </>}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
