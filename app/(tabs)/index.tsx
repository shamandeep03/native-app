import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ✅ Screens
import LoginForm from "../(auth)/LoginForm";
import Logout from "./src/Logout";
import Coupon from "./src/Coupon";
import Vendor from "./src/Vendor";
import Category from "./src/Category";
import VendorProductScreen from "./src/VendorProductScreen";
import My_Cart from "./src/My_Cart";
import Order from "./src/Order";
import AllOrders from "./src/AllOrders";
import BackgroundServices from "./src/BackgroundServices";

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
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="VendorProductScreen" component={VendorProductScreen} />
        <Stack.Screen name="My_Cart" component={My_Cart} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="AllOrders" component={AllOrders} />
        <Stack.Screen name="BackgroundServices" component={BackgroundServices} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
