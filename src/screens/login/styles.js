import { StyleSheet, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clip: {
    position: 'absolute',
    right: 0,
    width: wp(15),
    height: hp(100)
  },
});

export default styles;
