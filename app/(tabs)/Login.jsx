import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    const data = JSON.stringify({
      username: email,
      password: password,
    });

    axios.post('http://192.168.1.100:7002/api/AuthApi/Login', data, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        AsyncStorage.setItem('access_token', JSON.stringify(res.data.result.token));
        console.log('Login Success..', res);
        navigation.navigate('HomePage');
      })
      .catch((err) => {
        alert('Login Failed');
        console.log('Login Failed..', err);
      });
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 400 }}>
        <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginVertical: 20 }}>
          Login
        </Text>
        <View style={{ backgroundColor: 'white', height: 700, width: 460, borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center' }}>
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
            Welcome Back
          </Text>
          <Text style={{ color: 'grey', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}>
            Login to your account
          </Text>
          <Field placeholder="Email / Username" keyboardType={'email-address'} onChange={(e) => setEmail(e.target.value)} />
          <Field placeholder="Password" secureTextEntry={true} onChange={(e) => setPassword(e.target.value)} />
          <View style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200 }}>
            <Text
              style={{ color: darkGreen, fontWeight: 600, fontSize: 16 }}
              onPress={() => props.navigation.navigate("ForgotPassword")}
            >
              Forgot Password ?
            </Text>
          </View>
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={handleLogin} />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
