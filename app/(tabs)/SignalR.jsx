import React, { useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';

const SignalR = () => {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    const retryFetch = async (retries) => {
      try {
        const response = await fetch('http://product.sash.co.in/api/Message/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('Response Body:', responseText);

        if (responseText.trim() === '') {
          throw new Error('Received empty response from the server');
        }

        const data = JSON.parse(responseText);

        if (data && data.status) {
          setMessage(data.status);
          Alert.alert('Success', data.status);
        } else {
          Alert.alert('Error', 'Status not found in the response.');
        }
      } catch (error) {
        if (retries > 0) {
          console.log(`Retrying... Attempts left: ${retries}`);
          setTimeout(() => retryFetch(retries - 1), 2000);  // Retry after 2 seconds
        } else {
          console.error('Fetch Error:', error);
          Alert.alert('Error', `There was an error fetching the message: ${error.message}`);
        }
      }
    };

    retryFetch(3); // Retry 3 times
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Fetch Message" onPress={fetchMessage} />
      <Text style={{ marginTop: 20, fontSize: 18 }}>{message}</Text>
      <Button title="Clear" onPress={() => setMessage('')} /> 
    </View>
  );
};

export default SignalR;
