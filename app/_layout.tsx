import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper'; // ✅ Paper Provider

type FooterIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  badge?: number;
  dot?: boolean;
};

export default function TabsLayout() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const pathname = usePathname() || '';
  const cartItemCount = 1;
  const showCategoriesDot = true;

  const hideOnRoutes = ['/(auth)/LoginForm', '/SignUpForm'];
  const shouldHide = hideOnRoutes.includes(pathname);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={shouldHide} />

        {/* 🔍 Search Bar */}
        {!shouldHide && (
          <View style={styles.searchBarContainer}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              returnKeyType="search"
            />
          </View>
        )}

        {/* 📄 Page Content */}
        <View style={styles.content}>
          <Slot />
        </View>

        {/* 🚀 Footer Navigation */}
        {!shouldHide && (
          <View style={styles.footer}>
            <FooterIcon name="home-outline" label="Home" onPress={() => router.push('/(tabs)/src/Coupon')} dot={showCategoriesDot} />
            <FooterIcon name="search-outline" label="Search" onPress={() => router.push('/(tabs)/src/Coupon')} dot={showCategoriesDot} />
            <FooterIcon name="grid-outline" label="Categories" onPress={() => pathname !== '/(tabs)/src/Category' && router.push('/(tabs)/src/Category')} />
            <FooterIcon name="person-outline" label="Account" onPress={() => router.push("./src/Logout")} />
            <FooterIcon name="cart-outline" label="Cart" onPress={() => router.push('/(tabs)/src/My_Cart')} badge={cartItemCount} />
          </View>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}

const FooterIcon = ({ name, label, onPress, badge = 0, dot = false }: FooterIconProps) => (
  <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
    <View>
      <Ionicons name={name} size={24} color="black" />
      {dot && <View style={styles.redDot} />}
      {badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
    <Text style={styles.iconLabel}>{label}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 15,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingBottom: 60,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 10,
    elevation: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLabel: {
    fontSize: 12,
    color: 'black',
    marginTop: 2,
  },
  redDot: {
    position: 'absolute',
    top: -2,
    right: -6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
