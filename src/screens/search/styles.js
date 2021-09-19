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

  cardContainer: {
    width: wp(45),
    height: hp(25),
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    margin: 10
  },
  cardPress:
  {
    flex: 1,
    backgroundColor: COLORS.GRAY,
    borderRadius: 10,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: 5,
    width: '90%',
    backgroundColor: COLORS.LIGHT + 95,
    borderRadius: 10,
    padding: 5,
    marginLeft: '5%',
  },
  title: {
    fontSize: hp(1.5),
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    width: '100%'
  },
  desc: {
    fontSize: hp(1.4),
    color: COLORS.WHITE,
    fontFamily: FONTS.LIGHT,
    width: '100%'
  },
  noResult: {
    fontSize: hp(3),
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    marginTop:hp(3)
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
