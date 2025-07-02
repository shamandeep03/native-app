import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname } from 'expo-router'; // Import usePathname to get the current path

const { height, width } = Dimensions.get('window');

const LoginForm = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const pathname = usePathname(); // Get the current route path

  const handleLogin = async () => {
    if (!userName || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://product.sash.co.in:81/api/Account/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      const token = await response.text();

      if (response.ok && token && token.startsWith('ey')) {
        await AsyncStorage.setItem('userToken', token);
        navigation.navigate('Coupon'); // ✅ Ensure 'Coupon' screen exists in navigator
      } else {
        Alert.alert('Login Failed', 'Invalid token or credentials');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/duxekwjna/image/upload/v1744828895/djzkpedj63pxvcb7x8ng.jpg' }}
            style={styles.logo}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={userName}
            onChangeText={setUserName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.SingUp}>
            Don't have an account?{' '}
            <Text style={styles.nextpage} onPress={() => navigation.navigate('SignUpForm')}>
              SingUp
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: '#fff',
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    alignItems: 'center',
    marginBottom: 150,
    height: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '90%',
    fontWeight: '600',
    color: 'black',
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 5,
    padding: 10,
    width: '90%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  SingUp: {
    marginTop: 25,
  },
  nextpage: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

