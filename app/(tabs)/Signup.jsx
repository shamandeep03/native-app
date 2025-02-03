import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import axios from 'axios';

const Signup = props => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState(''); // No need for confirmPassword now

  const handleSignup = async () => {
    // Validate that all fields are filled out
    if (!firstName || !email || !contactNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Prepare the data for the API request
    const data = {
      Name: firstName,          // Updated field name for name
      Email: email,             // Updated field name for email
      PhoneNumber: contactNumber,  // Updated field name for phone number
      Password: password,
    };

    try {
      console.log('Sending request data:', data); // Log request data for debugging

      const response = await axios.post('http://identity.sash.co.in/api/AuthApi/Register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle success
      console.log('Signup Success:', response.data);
      Alert.alert('Success', 'Account created successfully');
      props.navigation.navigate('Login');
    } catch (error) {
      // Handle error with detailed logging
      if (error.response) {
        // If error response exists, log the details
        console.error('Signup Error Response:', error.response.data);
        Alert.alert('Signup Failed', `Error: ${error.response.data.title || 'Unknown error'}`);
      } else {
        // If no response, log general error
        console.error('Signup Error:', error.message);
        Alert.alert('Signup Failed', 'Something went wrong. Please try again later.');
      }
    }
};


  return (
    <Background>
      <View style={{ alignItems: 'center', width: 400 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field placeholder="First Name" onChangeText={setFirstName} />
          <Field placeholder="Email / Username" keyboardType={'email-address'} onChangeText={setEmail} />
          <Field placeholder="Contact Number" keyboardType={'number-pad'} onChangeText={setContactNumber} />
          <Field placeholder="Password" secureTextEntry={true} onChangeText={setPassword} />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16,
            }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>
              By signing up, you agree to our{' '}
            </Text>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '78%',
              paddingRight: 16,
              marginBottom: 10,
            }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>
              and {' '}
            </Text>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Privacy Policy
            </Text>
          </View>

          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={handleSignup}
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
