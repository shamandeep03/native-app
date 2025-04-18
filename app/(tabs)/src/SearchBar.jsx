// app/(tabs)/src/SearchBar.jsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or MaterialIcons, FontAwesome etc.

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      <Ionicons name="search" size={20} color="#555" style={styles.icon} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    elevation: 2, // shadow on Android
    shadowColor: '#000', // shadow on iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    marginTop:45
   
  },
  icon: {
    marginRight: 8,
    fontWeight:900,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
});
