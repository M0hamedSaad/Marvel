import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import { FONTS, COLORS } from '../../utils';


import Left from "../../assets/images/arrow-right.svg"
import { useNavigation } from '@react-navigation/core';
import { Icon } from 'react-native-elements';


export const HeaderDetails = ({ item }) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FastImage
          source={{ uri: item?.thumbnail?.path + '.' + item?.thumbnail?.extension }}
          style={{ width: '100%', height: '100%' }}
          resizeMode={'cover'}
        />
        <TouchableOpacity style={styles.back} onPress={() => { navigation.goBack() }} >
          <Icon name='arrow-back' type='Ionicons' color='#fff' />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item?.name}
          </Text>
          {item?.description != '' &&
            <Text style={styles.desc} numberOfLines={4} >
              {'\n' + item?.description}
            </Text>}
        </View>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: 250,
    backgroundColor: '#000'

  },
  back: {
    position: 'absolute',
    left: wp(3),
    top: hp(2),
    width: wp(8), height: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.LIGHT
  },
  textContainer: {
    position: 'absolute',
    bottom: 5,
    width: wp(90),
    backgroundColor: COLORS.LIGHT + 95,
    borderRadius: 10,
    padding: 5,
    marginLeft: wp(5),
  },
  title: {
    fontSize: hp(2),
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    width: '100%'
  },
  desc: {
    fontSize: hp(1.8),
    color: COLORS.WHITE,
    fontFamily: FONTS.LIGHT,
    width: '100%'
  },

});
