import { View, StyleSheet } from 'react-native';
import React from 'react';
 import HomePage from './HomePage';
// import Login from './Login';
// import ForgotPassword from './ForgotPassword'
 import VegFood from './VegFood';
 import NonVegFood from './NonVegFood';
 import Add_To_Card from './Add_To_Card';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import BackgroundServices from "./BackgroundServices"; 

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }} 
        /> 
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} 
        /> */}
        {/* <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }} 
        /> 
        <Stack.Screen
          name="BackgroundServices"
          component={BackgroundServices}
          options={{ headerShown: false }} 
        />*/}
       
        <Stack.Screen
          name="VegFood"
          component={VegFood}
          options={{ headerShown: false }} 
        />  
        <Stack.Screen
          name="NonVegFood"
          component={NonVegFood}
          options={{ headerShown: false }} 
        /> 
        <Stack.Screen
          name="Add_To_Card"
          component={Add_To_Card}
          options={{ headerShown: false }} 
        />  
      </Stack.Navigator>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
