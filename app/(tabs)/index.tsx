import { View, StyleSheet } from "react-native";
import React from "react";

 import Coupon from "./src/Coupon";
import LoginForm from '../(auth)/LoginForm';
import AddToCartScreen from "./src/Add_To_Cart";



import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="LoginForm">
      <Stack.Screen
          name="LoginForm"
          component={LoginForm}
          options={{ headerShown: false }}
        />
         {/* <Stack.Screen
          name="SignUpForm"
          component={SingUpForm}
          options={{ headerShown: false }}
        /> */}
      <Stack.Screen
          name="Coupon"
          component={Coupon}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add_To_Cart" component={AddToCartScreen} />
   

        {/* <Stack.Screen
          name="BackgroundServices"
          component={BackgroundServices}
          options={{ headerShown: false }}
        /> */}

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
