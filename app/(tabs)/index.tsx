import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ✅ Screens Import
import LoginForm from "../(auth)/LoginForm";
import VendorProductScreen from "./src/VendorProductScreen";
import AddToCartScreen from "./src/Add_To_Cart";
import Coupon from "./src/Coupon";
import VendorScreen from "./src/Vendor";
import BackgroundServices from "./src/BackgroundServices";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator
      initialRouteName="LoginForm"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="VendorProductScreen" component={VendorProductScreen} />
      <Stack.Screen name="Add_To_Cart" component={AddToCartScreen} />
      <Stack.Screen name="Coupon" component={Coupon} />
      <Stack.Screen
        name="Vendor"
        component={VendorScreen}
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="BackgroundServices" component={BackgroundServices} />
    </Stack.Navigator>
  );
}
