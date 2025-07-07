import React, { useEffect, useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

const LoginForm = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // 👇 Check for existing token when component mounts
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.replace('Coupon'); // 👈 Avoid going back to login screen
      } else {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

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

      if (response.ok && token?.startsWith('ey')) {
        await AsyncStorage.setItem('userToken', token);

        const userInfoRes = await fetch('http://product.sash.co.in:81/api/Address/user-info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userInfo = await userInfoRes.json();
        const userId = userInfo?.id || userInfo?.data?.id || userInfo?.userId;

        if (userId) {
          await AsyncStorage.setItem('userId', userId.toString());
          navigation.replace('Coupon'); // 👈 Navigate to main screen and prevent going back
        } else {
          Alert.alert('Login Failed', 'User ID not found in response');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/duxekwjna/image/upload/v1744828895/djzkpedj63pxvcb7x8ng.jpg',
            }}
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
            <Text
              style={styles.nextpage}
              onPress={() => navigation.navigate('SignUpForm')}
            >
              Sign Up
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