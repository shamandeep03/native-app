import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 5, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontSize: 60,textAlign:'center',bottom:30 }}>Sash App!</Text>
      <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Home;