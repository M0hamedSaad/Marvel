import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
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


  return (
    <SafeAreaView style={styles.container} >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Header username={username} searching={searching} clear={true} defaultValue={''} />

        <MyCarousel />

        <View style={styles.icons}>
          <Facebook style={styles.icon} />
          <Twitter style={styles.icon} />
          <Instagram style={styles.icon} />
        </View>
        <Text style={styles.txtRights}>{translate('rights')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
