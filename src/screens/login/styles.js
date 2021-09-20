import { StyleSheet, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
  },

  clip: {
    position: 'absolute',
    right: wp(-31),
   // left: I18nManager.isRTL ? wp(31) : null,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },
  logo: {
    marginHorizontal: wp(5),
    marginBottom: hp(15)
  },
  input: {
    marginHorizontal: wp(5),
    marginBottom: hp(3),
    paddingBottom: hp(1),
    paddingHorizontal: wp(1),
    borderBottomWidth: hp(.3),
    borderBottomColor: COLORS.LIGHT,
    width: wp(60),
    fontFamily: FONTS.LIGHT,
    color: COLORS.WHITE,
    fontSize: hp(2.2),
    textAlign:I18nManager.isRTL?'right':'left'
  },
  icons: {
    marginTop: 'auto',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: hp(1)
  },
  icon: {
    marginHorizontal: wp('1.5')
  },
  txtRights: {
    textAlign: 'center',
    color: COLORS.WHITE,
    marginBottom: hp(2),
    fontFamily: FONTS.LIGHT
  },
  btn: {
    marginTop: hp(4),
    marginHorizontal: wp(5),
    borderWidth: hp(.3),
    borderColor: COLORS.SECONDARY,
    paddingVertical: hp(1),
    width: wp('35')
  },
  btnTxt: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: FONTS.LIGHT,
    fontSize: hp(2.4),
  },
});

export default styles;
