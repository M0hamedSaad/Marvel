import { Platform } from 'react-native'
export const FONTS = {
  BLACK: Platform.OS == 'ios' ? "Montserrat-Arabic Black" : "Montserrat-Arabic-Black",
  BOLD: Platform.OS == 'ios' ? "Montserrat-Arabic" : "Montserrat-Arabic-Bold",
  EXTRA_BOLD: Platform.OS == 'ios' ? "Montserrat-Arabic ExtraBold" : "Montserrat-Arabic-ExtraBold",
  EXTRA_LIGHT: Platform.OS == 'ios' ? "Montserrat-Arabic ExtraLight" : "Montserrat-Arabic-ExtraLight",
  LIGHT: Platform.OS == 'ios' ? "Montserrat-Arabic Light" : "Montserrat-Arabic-Light",
  MEDIUM: Platform.OS == 'ios' ? "Montserrat-Arabic Medium" : "Montserrat-Arabic-Medium",
  REGULAR: Platform.OS == 'ios' ? "Montserrat-Arabic Regular" : "Montserrat-Arabic-Regular",
  SEMI_BOLD: Platform.OS == 'ios' ? "Montserrat-Arabic SemiBold" : "Montserrat-Arabic-SemiBold",
  THIN: Platform.OS == 'ios' ? "Montserrat-Arabic Thin" : "Montserrat-Arabic-Thin",

};
