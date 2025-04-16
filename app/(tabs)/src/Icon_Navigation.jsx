// import React, { useMemo } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
// import * as RNLocalize from 'react-native-localize';
// import { NavigationContainer } from '@react-navigation/native';

// import Add_To_Card from '../Add_To_Card';

// const Tab = createBottomTabNavigator();

// const CenterText = ({ text }) => (
//   <View style={styles.center}>
//     <Text style={styles.text}>{text}</Text>
//   </View>
// );

// const HomeScreen = () => <CenterText text="Home" />;
// const CouponScreen = () => <CenterText text="Coupons" />;
// const CategoryScreen = () => <CenterText text="Categories" />;

// export default function App() {
//   const cartItemCount = 1;
//   const categoriesBadge = true;

//   const deviceLocale = useMemo(() => {
//     const locales = RNLocalize.getLocales();
//     return locales.length > 0 ? locales[0].languageTag : 'en-US';
//   }, []);

//   return (
//     <NavigationContainer independent={true}>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarActiveTintColor: '#6a0dad',
//           tabBarInactiveTintColor: '#333',
//           tabBarIcon: ({ color, size }) => {
//             let iconName = 'ellipse-outline';

//             if (route.name === 'Home') iconName = 'home-outline';
//             else if (route.name === 'Coupons') iconName = 'pricetags-outline';
//             else if (route.name === 'Categories') iconName = 'grid-outline';
//             else if (route.name === 'Cart') iconName = 'cart-outline';

//             return <Icon name={iconName} size={size} color={color} />;
//           },
//           tabBarBadge:
//             route.name === 'Cart'
//               ? cartItemCount
//               : route.name === 'Categories' && categoriesBadge
//               ? '●'
//               : null,
//           tabBarBadgeStyle:
//             route.name === 'Categories'
//               ? {
//                   backgroundColor: 'red',
//                   fontSize: 0,
//                   height: 8,
//                   minWidth: 8,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }
//               : undefined,
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Coupons" component={CouponScreen} />
//         <Tab.Screen name="Categories" component={CategoryScreen} />
//         <Tab.Screen name="Cart" component={Add_To_Card} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//   },
// });
