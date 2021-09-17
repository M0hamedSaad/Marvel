import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { check_lang } from '../utils/helperfunc'

import Login from '../screens/login';
import Home from '../screens/home';
import { I18nManager } from 'react-native';


const Stack = createNativeStackNavigator();
export default Navigator = () => {

  useEffect(() => { check_lang() }, []);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: I18nManager.isRTL ? 'slide_from_right' : 'slide_from_left',
    }} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
