import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LoginForm from "../(auth)/LoginForm";
import VendorProductScreen from "./src/VendorProductScreen";
import AddToCartScreen from "./src/Add_To_Cart";
import Coupon from "./src/Coupon";
import Vendor from "./src/Vendor";
import BackgroundServices from "./src/BackgroundServices";
import Category from "./src/Category";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="LoginForm"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="Coupon" component={Coupon} />
        <Stack.Screen name="Vendor" component={Vendor} />
        <Stack.Screen name="VendorProductScreen" component={VendorProductScreen} />
        <Stack.Screen name="AddToCart" component={AddToCartScreen} />
        <Stack.Screen name="BackgroundServices" component={BackgroundServices} />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
