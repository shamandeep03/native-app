import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

const SignupForm = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phoneNumber: '',
    gender: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSignup = async () => {
    const payload = {
      ...form,
      age: parseInt(form.age),
      roleId: 1, // You can change this as needed
      statusId: 1,
      profileImageId: 1,
      id: 0,
    };

    try {
      const response = await fetch('http://product.sash.co.in/api/Account/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Something went wrong during signup');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput placeholder="First Name" style={styles.input} onChangeText={val => handleChange('firstName', val)} />
        <TextInput placeholder="Last Name" style={styles.input} onChangeText={val => handleChange('lastName', val)} />
        <TextInput placeholder="Age" keyboardType="numeric" style={styles.input} onChangeText={val => handleChange('age', val)} />
        <TextInput placeholder="Email" style={styles.input} onChangeText={val => handleChange('email', val)} />
        <TextInput placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} onChangeText={val => handleChange('phoneNumber', val)} />
        <TextInput placeholder="Gender" style={styles.input} onChangeText={val => handleChange('gender', val)} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={val => handleChange('password', val)} />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.loginLink}>
          Already have an account? <Text style={styles.linkText} onPress={() => navigation.navigate('LoginForm')}>Login</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
    width: '100%',
    fontWeight: '600',
    color: 'black',
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 5,
    padding: 12,
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
  },
  linkText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});
