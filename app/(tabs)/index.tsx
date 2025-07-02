import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LoginForm from "../(auth)/LoginForm";
import VendorProductScreen from "./src/VendorProductScreen";
import MyCart from "./src/My_Cart";
import Coupon from "./src/Coupon";
import Vendor from "./src/Vendor";
import BackgroundServices from "./src/BackgroundServices";
import Category from "./src/Category";
import Logout from "./src/Logout";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="LoginForm"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="Logout" component={Logout} /> 
        <Stack.Screen name="Coupon" component={Coupon} />
        <Stack.Screen name="Vendor" component={Vendor} />
        <Stack.Screen name="VendorProductScreen" component={VendorProductScreen} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="BackgroundServices" component={BackgroundServices} />
        <Stack.Screen name="Category" component={Category} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
