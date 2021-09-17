import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login/';
import { check_lang } from '../utils/helperfunc'
const Stack = createNativeStackNavigator();
export default Navigator = () => {
  
  useEffect(() => { check_lang() }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
