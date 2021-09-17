import React , {useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  I18nManager,
  TouchableOpacity,
  Platform,
  BackHandler
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

import { FONTS, COLORS } from '../../utils';
import { useNavigation } from '@react-navigation/native'

const menu = require('../../assets/images/menu.png');
const notifyIcon = require('../../assets/images/notification.png');


export const Header = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        <TouchableOpacity style={styles.borderMenu} onPress={() => navigation.openDrawer()}>
          <Image style={styles.img} source={menu} />
        </TouchableOpacity>

        {notify &&
          <TouchableOpacity onPress={() => navigation.navigate('Notify')}>
            <Image style={styles.notify} source={notifyIcon} />
          </TouchableOpacity>
        }
      </View>

      <Text style={styles.txt}>{title}</Text>
      {arrow && (
        <Icon
          name={I18nManager.isRTL ? "left" : 'right'}
          style={styles.arrow}
          onPress={() => {
            let canGoBack = navigation.canGoBack();
           if( canGoBack ) 
           {
            navigation.goBack()
            isShow(false)
           } else BackHandler.exitApp();
          }}
        />
      )}
      <View style={styles.hideWidth} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    paddingVertical: '5%',
    paddingHorizontal: '6%',
    flexDirection: 'row',
  },
  borderMenu: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 5,
    borderRadius: 5,
  },
  img: {
    height: 15,
    width: 15,
  },
  pen: {
    height: 30,
    width: 30,
    marginLeft: 10
  },

  txt: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.darkGray,
    textAlign: 'center',
    fontSize: hp('2.5'),
  },
  notify:
  {
    width: 25, height: 25, color: COLORS.primary, marginLeft: 10
  },
  hideWidth: {
    width: hp('3'),
  },

  arrow: {
    fontSize: 22,
    right: 1,
    bottom: Platform.OS == "ios" ? 1 : 20,
    marginRight: 10,
    position: 'absolute',
    color: COLORS.primary,
  },
});
