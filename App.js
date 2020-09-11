import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
//import { Button, TextInput  } from 'react-native-paper';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import QRCode from 'react-native-qrcode-svg';

import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignupScreen from './Screens/SignupScreen';
import LoginScreen from './Screens/LoginScreen';
import LoadingScreen from './Screens/LoadingScreen';
import HomeScreen from './Screens/HomeScreen';
import { AsyncStorage } from 'react-native';

const Stack = createStackNavigator();

export default function App() {

  async function getToken() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        //console.log(value);
        setLogged(true);
      }
      else {
        setLogged(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [isLoggedin, setLogged] = useState(null);

  useEffect(() => {
    getToken();
  });

  return (

    /*<QRCode
      value="http://awesome.link.qr"
    />*/
    <NavigationNativeContainer >
      <Stack.Navigator
        headerMode='none'>
        {
          <>
            <Stack.Screen name="Loading" style={styles.container} component={LoadingScreen} />
            <Stack.Screen name="Home" style={styles.container} component={HomeScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        }

      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
