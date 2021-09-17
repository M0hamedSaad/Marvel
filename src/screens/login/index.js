import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clip from "../../assets/images/login-shape.svg"


const Login = () => {
  const navigation = useNavigation();


  useEffect(() => {

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Clip
        width={50} height={50}
        //style={styles.clip}
      />
    </SafeAreaView>
  );
};
export default Login;
