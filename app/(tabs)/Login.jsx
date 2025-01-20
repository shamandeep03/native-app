// // import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, ScrollView,Image } from 'react-native';
// // import React, { useState } from 'react';
// // import { useNavigation } from '@react-navigation/native';
// // import { MaterialCommunityIcons } from '@expo/vector-icons';
// // import axios from 'axios';

// // const Login = () => {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const navigation = useNavigation();

// //     const handleLogin =()=>{
// //         const data = JSON.stringify({
// //             username: email,
// //             password: password,
// //         });
// //         debugger
        
// //         axios.post('http://192.168.1.100:7002/api/AuthApi/Login', data, {
// //             timeout: 10000,},
// //             {
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //             })
// //         .then((res)=>{
// //           localStorage.setItem("access_token",JSON.stringify(res.data.result.token));
// //           debugger
// //           console.log("Login Success..", res)
// //           navigate("/HomePage")
// //         }).catch((err)=>{
// //           alert("Login Failed")
// //           console.log("Login Failed..",err)
// //         })
// //       }
      

// //     return (
// //         <ScrollView contentContainerStyle={styles.container}>
// //            <Image style={styles.image} source={{ uri: "https://img.freepik.com/premium-photo/white-background-with-s-it_862462-12815.jpg?w=740"}} />
// //             <StatusBar hidden={true} />
// //             <View style={styles.titleContainer}>
// //                 <Text style={styles.title}>You must sign in to join</Text>
// //                 <Text Text style={styles.title2}>We're a Team That Guides Each Other</Text>
// //             </View>
// //             <View style={styles.inputContainer}>
// //            <View style={styles.inputWrapperContainer}>
// //            <Text style={styles.label}>Email or Username</Text>
// //                <View style={styles.inputWrapper}>
// //                     <MaterialCommunityIcons name="magnify" size={25} color="black" style={styles.icon} />
// //                     <TextInput
// //                         style={styles.EmailinputContainer}
// //                         onChange={(e)=> setEmail(e.target.value)}
// //                         placeholder="User name"
// //                         keyboardType="email-address"
// //                         autoCapitalize="none"
// //                     />
// //                 </View>
// //                 <Text style={styles.label2}>Password</Text>
// //                 <View style={styles.inputWrapper}>
// //                     <MaterialCommunityIcons name="lock" size={25} fontWeight="bold" color="black" style={styles.icon} />
// //                     <TextInput
// //                         style={styles.passwordinputContainer}
// //                         onChange={(e)=> setPassword(e.target.value)}
// //                         placeholder="Password"
// //                         secureTextEntry
                        
// //                     />
// //                 </View>
// //            </View>
// //                 <TouchableOpacity activeOpacity={0.7}  onPress={() => navigation.navigate("ForgotPassword")}>
// //                     <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity style={styles.button} onPress={handleLogin}>
// //                     <Text style={styles.buttonText}>Sign in</Text>
// //                 </TouchableOpacity>
// //                 <Text style={styles.signupText}>
// //                     Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
// //                 </Text>
// //             </View>
// //         </ScrollView>
// //     );
// // };

// // export default Login;

// // const styles = StyleSheet.create({
// //     container: {
// //         flexGrow: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         padding: 20,
// //     },
// //     title: {
// //         fontSize: 24,
// //         fontWeight: '600',
// //         marginBottom: 30,
// //     },
// //     title2: {
// //         fontSize: 15,
// //         fontWeight: '300',
// //         marginBottom: 20,
        
// //     },
// //     titleContainer: {
// //         marginBottom: 190,
// //     },
// //     inputContainer: {
// //         width: '100%',
// //     },
// //     label: {
// //         marginLeft: 10,
// //         fontWeight: '400',
// //         marginBottom: 9,
// //     },
// //     label2: {
// //         marginLeft: 10,
// //         fontWeight: '400',
// //         marginBottom: 9,
// //     },
// //     inputWrapper: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         borderColor: 'gray',
// //         borderWidth: 1,
// //         borderRadius: 10,
// //         marginBottom: 20,
// //     },
// //     inputWrapperContainer:{
// //    position:'relative',
// //    bottom:140,
// //     },
// //     icon: {
// //         paddingHorizontal: 10,
       
// //     },
// //     EmailinputContainer: {
// //         flex: 1,
// //         fontSize: 16,
// //         height: 50,
// //         paddingHorizontal: 10,
// //         fontWeight:'500'
// //     },
// //     passwordinputContainer: {
// //         flex: 1,
// //         fontSize: 16,
// //         height: 50,
// //         paddingHorizontal: 10,
// //           fontWeight:'500'
// //     },
// //     button: {
// //         height: 50,
// //         borderRadius: 10,
// //         backgroundColor: '#007BFF',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         marginBottom: 20,
// //         width: '100%',
// //         position:'relative',
// //         top:-80
// //     },
// //     buttonText: {
// //         color: 'white',
// //         fontWeight: '700',
// //     },
// //     forgotPasswordText: {
// //         alignSelf: 'flex-end',
// //         color: '#009BFF',
// //         position:'relative',
// //         top:-120
// //     },
// //     signupText: {
// //         textAlign: 'center',
// //         color: 'gray',
// //         position:'relative',
// //         top:-50
// //     },
// //     signupLink: {
// //         color: 'black',
// //         fontWeight: '900',
// //     },
// //     image:{
// //         width:100,
// //         height:100,
// //         borderRadius:20,
// //         marginBottom:20
// //     },
// // });



// import { StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';  // AsyncStorage for saving token

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigation = useNavigation();

//     const handleSubmit = async () => {
//         const payload = {
//             email: email,
//             password: password
//         };

//         try {
//             const res = await axios.post('https://api.escuelajs.co/api/v1/auth/login', payload);  // Ensure correct API endpoint

//             // Save token in AsyncStorage
//             await AsyncStorage.setItem("token", res.data.access_token);

//             alert("Login Success");
//             console.log("Login Successful", res);
//             navigation.navigate('HomePage');  // Navigate to the home page or another screen
//         } catch (err) {
//             alert("Login Failed");
//             console.log("Login Failed", err);
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Image style={styles.image} source={{ uri: "https://img.freepik.com/premium-photo/white-background-with-s-it_862462-12815.jpg?w=740" }} />
//             <StatusBar hidden={true} />
//             <View style={styles.titleContainer}>
//                 <Text style={styles.title}>You must sign in to join</Text>
//                 <Text style={styles.title2}>We're a Team That Guides Each Other</Text>
//             </View>
//             <View style={styles.inputContainer}>
//                 <View style={styles.inputWrapperContainer}>
//                     <Text style={styles.label}>Email or Username</Text>
//                     <View style={styles.inputWrapper}>
//                         <MaterialCommunityIcons name="magnify" size={25} color="black" style={styles.icon} />
//                         <TextInput
//                             style={styles.EmailinputContainer}
//                             onChangeText={setEmail}  // Correct way to update state in React Native
//                             placeholder="User name"
//                             keyboardType="email-address"
//                             autoCapitalize="none"
//                         />
//                     </View>

//                     <Text style={styles.label2}>Password</Text>
//                     <View style={styles.inputWrapper}>
//                         <MaterialCommunityIcons name="lock" size={25} fontWeight="bold" color="black" style={styles.icon} />
//                         <TextInput
//                             style={styles.passwordinputContainer}
//                             onChangeText={setPassword}  // Correct way to update state in React Native
//                             placeholder="Password"
//                             secureTextEntry
//                         />
//                     </View>
//                 </View>

//                 <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("ForgotPassword")}>
//                     <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                     <Text style={styles.buttonText}>Sign in</Text>
//                 </TouchableOpacity>

//                 <Text style={styles.signupText}>
//                     Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
//                 </Text>
//             </View>
//         </ScrollView>
//     );
// };

// export default Login;

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: '600',
//         marginBottom: 30,
//     },
//     title2: {
//         fontSize: 15,
//         fontWeight: '300',
//         marginBottom: 20,
//     },
//     titleContainer: {
//         marginBottom: 190,
//     },
//     inputContainer: {
//         width: '100%',
//     },
//     label: {
//         marginLeft: 10,
//         fontWeight: '400',
//         marginBottom: 9,
//     },
//     label2: {
//         marginLeft: 10,
//         fontWeight: '400',
//         marginBottom: 9,
//     },
//     inputWrapper: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 10,
//         marginBottom: 20,
//     },
//     inputWrapperContainer: {
//         position: 'relative',
//         bottom: 140,
//     },
//     icon: {
//         paddingHorizontal: 10,
//     },
//     EmailinputContainer: {
//         flex: 1,
//         fontSize: 16,
//         height: 50,
//         paddingHorizontal: 10,
//         fontWeight: '500',
//     },
//     passwordinputContainer: {
//         flex: 1,
//         fontSize: 16,
//         height: 50,
//         paddingHorizontal: 10,
//         fontWeight: '500',
//     },
//     button: {
//         height: 50,
//         borderRadius: 10,
//         backgroundColor: '#007BFF',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,
//         width: '100%',
//         position: 'relative',
//         top: -80,
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: '700',
//     },
//     forgotPasswordText: {
//         alignSelf: 'flex-end',
//         color: '#009BFF',
//         position: 'relative',
//         top: -120,
//     },
//     signupText: {
//         justifyContent: 'center',
//         color: 'gray',
//         position: 'relative',
//         alignSelf: 'center',
//         top: -50,
//     },
//     signupLink: {
//         color: 'black',
//         fontWeight: '900',
//     },
//     image: {
//         width: 100,
//         height: 100,
//         borderRadius: 20,
//         marginBottom: 20,
//     },
// });
