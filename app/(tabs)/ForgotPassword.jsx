import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert("Please enter your email");
            return;
        }
        try {
            const response = await axios.post('http://192.168.1.100:7002/api/AuthApi/ForgotPassword', { email });
            Alert.alert("Success", "A password reset link has been sent to your email.");
            setEmail(''); 
        } catch (error) {
            console.error("Error sending reset link:", error);
            Alert.alert("Error", "Failed to send reset link. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.label}>Enter your email to receive a password reset link:</Text>
            <TextInput
                style={styles.input}
                placeholder="example@mail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
            />
            <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        height: 50,
        borderRadius: 10,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
    },
});
