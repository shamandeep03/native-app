import { View, StyleSheet } from "react-native";
import React from "react";

 import Coupon from "./src/Coupon";
 import LoginForm from "./src/LoginForm";
 import SingUpForm from "./src/SingUpForm";
// import Icon_Navigation from "./src/Icon_Navigation";
//  import Add_To_Card from "./Add_To_Card";


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
         <Stack.Screen
          name="SignUpForm"
          component={SingUpForm}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="Coupon"
          component={Coupon}
          options={{ headerShown: false }}
        />
     {/* <Stack.Screen
          name="Icon_Navigation"
          component={Icon_Navigation}
          options={{ headerShown: false }}
        /> */}

        {/* <Stack.Screen
          name="BackgroundServices"
          component={BackgroundServices}
          options={{ headerShown: false }}
        /> */}

        {/* <Stack.Screen
          name="Add_To_Card"
          component={Add_To_Card}
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
