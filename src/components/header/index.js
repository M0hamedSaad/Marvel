import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { FONTS, COLORS } from '../../utils';
import { useNavigation } from '@react-navigation/native'

import Logo from "../../assets/images/logo.svg"
import Search from "../../assets/images/search.svg"
import { Avatar } from 'react-native-elements';
import { translate } from '../../i18n';
const user = require("../../assets/images/user.png")

export const Header = ({ username, searching, clear, defaultValue }) => {
  const navigation = useNavigation()
  const [searchInput, onChangeSearch] = useState(defaultValue)
  const ref = useRef()

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Logo />
        <TouchableOpacity style={styles.simpleRow}>
          <Avatar
            size={'medium'}
            source={user}
          />
          <Text style={styles.username} numberOfLines={2}>{username}</Text>
          <Icon name='down' style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          returnKeyType='search'
          onSubmitEditing={() => {
            searching(searchInput, true);
            if (clear) {
              ref.current.clear();
              onChangeSearch('')
            }
          }}
          onChangeText={onChangeSearch}
          selectionColor={COLORS.LIGHT}
          style={[styles.input]}
          placeholderTextColor={COLORS.LIGHT}
          placeholder={translate('search')} >
          <Text style={styles.heighLight}>{searchInput}</Text>
        </TextInput>

        <TouchableOpacity onPress={() => {
          searching(searchInput, true);
          if (clear) {
            ref.current.clear();
            onChangeSearch('')
          }
        }}>
          <Search />
        </TouchableOpacity>

      </View>
      <View style={styles.line} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(100),
    paddingHorizontal: wp(5),
    flexDirection: 'row',

  },
  line: {
    width: wp(95),
    marginLeft: wp(2.5),
    borderBottomWidth: hp(.2),
    borderBottomColor: COLORS.GRAY,
    marginVertical: hp(2)
  },
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: hp(2),
    color: COLORS.LIGHT
  },
  username: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    fontSize: hp('2'),
    paddingHorizontal: wp(2),
    maxWidth: wp(25),
    textAlign: 'center'
  },
  inputContainer: {
    width: wp(90),
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: wp(7),
    backgroundColor: COLORS.GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(3),
    height: Platform.OS == 'ios' ? hp(5.5) : null

  },
  input: {
    width: '90%',
    paddingHorizontal: wp(2.5),
    fontFamily: FONTS.LIGHT,
    color: COLORS.WHITE,
    fontSize: hp(2),
    textAlign: I18nManager.isRTL ? 'right' : 'left'
  },
  heighLight: {
    backgroundColor: COLORS.LIGHT,
  }
});
