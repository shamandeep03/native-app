
// import { View, Text, TouchableOpacity, AppState, Image } from 'react-native';
// import React, { useEffect, useRef, useState } from 'react';
// import ViewShot from 'react-native-view-shot';

// const BackgroundServices = () => {
//   const [appState, setAppState] = useState(AppState.currentState);
//   const ref = useRef();
//   const [imageUris, setImageUris] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (ref.current) {
//         ref.current.capture().then(uri => {
//           console.log("Captured image URI: ", uri);
//           setImageUris(prevUris => [...prevUris, uri]); 
        
//           postImageToAPI(uri);
//         }).catch(err => {
//           console.log('Error capturing screenshot:', err);
//         });
//       }
//     }, 10000); 

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', handleAppStateChange);
//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   const handleAppStateChange = (nextAppState) => {
//     setAppState(nextAppState);
//     if (nextAppState === 'background') {
//       console.log('App is in the background');
//     } else if (nextAppState === 'active') {
//       console.log('App is active');
//     }
//   };

//   const startBackgroundService = () => {
//     console.log('Starting background service...');
//   };

//   const stopBackgroundService = () => {
//     console.log('Stopping background service...');
//   };

//   const postImageToAPI = (imageUri) => {
//     const formData = new FormData();
//     formData.append('image', {
//       Image: imageUri,
//       Body: 'image/jpeg', 
//       Subject: 'screenshot.jpg',
//     });


//     const apiEndpoint = 'https://192.168.1.10:7263/api/Email/send'; 

//     fetch(apiEndpoint, {
//       method: 'POST',
//       body: formData,
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to upload image');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Image uploaded successfully:', data);
//       })
//       .catch(error => {
//         console.error('Error uploading image:', error);
//       });
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ViewShot 
//         ref={ref} 
//         options={{ fileName: 'screenshot', format: 'jpg', quality: 0.9 }}
//         style={{ width: 300, height: 300 }} 
//       >
//         <Text style={{ textAlign: 'center', fontSize: 25, top: 70 }}>
//           This is the content to capture.
//         </Text>
//       </ViewShot>
  
//       <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 30, marginTop: 90 }}>
//         Background Services: {appState}
//       </Text>

//       <View style={{ marginTop: 50 }}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: 'lightblue',
//             borderRadius: 10,
//             alignItems: 'center',
//             justifyContent: 'center',
//             alignSelf: 'center',
//             width: 200,
//             height: 40,
//             margin: 10,
//           }}
//           onPress={startBackgroundService}
//         >
//           <Text>Start Background Service</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{
//             backgroundColor: 'gray',
//             borderRadius: 10,
//             alignItems: 'center',
//             justifyContent: 'center',
//             alignSelf: 'center',
//             width: 200,
//             height: 40,
//             margin: 10,
//           }}
//           onPress={stopBackgroundService}
//         >
//           <Text style={{ color: 'white' }}>Stop Background Service</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default BackgroundServices;
