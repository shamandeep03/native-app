import { ImageBackground, View } from 'react-native';
import React from 'react';

const Background = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: "https://images.pexels.com/photos/2609107/pexels-photo-2609107.jpeg?auto=compress&cs=tinysrgb&w=600" }} // Corrected usage of URL
        style={{ height: '100%' }}
      >
        <View style={{position: 'absolute',}}>
          {children}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Background;
