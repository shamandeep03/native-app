import { View, StyleSheet } from "react-native";
import React from "react";

 import Coupon from "./src/Coupon";

//  import Add_To_Card from "./Add_To_Card";


import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen
          name="Coupon"
          component={Coupon}
          options={{ headerShown: false }}
        />
   

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
