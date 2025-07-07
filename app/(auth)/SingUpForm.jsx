import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupForm = () => {
  const navigation = useNavigation();

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

  const validateForm = () => {
    const { firstName, lastName, age, email, phoneNumber, gender, password } = form;
    if (!firstName || !lastName || !age || !email || !phoneNumber || !gender || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return false;
    }
    if (isNaN(age)) {
      Alert.alert('Error', 'Age must be a number.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    const payload = {
      id: 0,
      firstName: form.firstName,
      lastName: form.lastName,
      age: parseInt(form.age),
      email: form.email,
      phoneNumber: form.phoneNumber,
      gender: form.gender,
      passwordHash: form.password, // Correct password field
      roleId: 1,
      statusId: 1,
      isDeleted: false,
      promoBalance: 300, // Default ₹300
      profileImageId: 447,
    };

    try {
      const response = await fetch('http://product.sash.co.in/api/Account/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert(
          'Success',
          'Account created successfully! ₹300 promo balance added.'
        );

        // ✅ Redirect to Coupon screen after signup
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginForm' }],
        });
      } else {
        const errorText = await response.text();
        console.error('Signup failed:', errorText);
        Alert.alert('Error', 'Signup failed: ' + errorText);
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/duxekwjna/image/upload/v1744828895/djzkpedj63pxvcb7x8ng.jpg',
          }}
          style={styles.logo}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput placeholder="First Name" style={styles.input} onChangeText={val => handleChange('firstName', val)} />
        <TextInput placeholder="Last Name" style={styles.input} onChangeText={val => handleChange('lastName', val)} />
        <TextInput placeholder="Age" keyboardType="numeric" style={styles.input} onChangeText={val => handleChange('age', val)} />
        <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} onChangeText={val => handleChange('email', val)} />
        <TextInput placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} onChangeText={val => handleChange('phoneNumber', val)} />
        <TextInput placeholder="Gender" style={styles.input} onChangeText={val => handleChange('gender', val)} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={val => handleChange('password', val)} />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.loginLink}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('LoginForm')}>
            Login
          </Text>
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
    backgroundColor: 'white',
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
  logoContainer: {
    marginBottom: -30,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'contain',
    borderWidth: 2,
    marginBottom: 30,
  },
});
