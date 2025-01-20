import { StyleSheet, Image, View,TouchableOpacity,Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const food = [
  { id: 1, title: 'https://wallpaperaccess.com/full/1306125.jpg', Name: "SPAICY BURGER",Price:"PRICE : $150",Offer:"80% off",Free:"Free Delivery", TreadingNow:"Trending Now" } 
  ];

const Add_To_Card = () => {
    const navigation = useNavigation(); 
  return (
    <>
    <View>
          <View style={{ backgroundColor: '#f8f9fa' }}>
         <MaterialCommunityIcons name="arrow-left-thick" size={25}  style={styles.icon} 
          onPress={() => navigation.navigate('HomePage')}/>
        {food.map((item) => (
          <View key={item.id}>
              <TouchableOpacity>
            <Image style={styles.image} source={{ uri: item.title }}/>
            <Text style={styles.FoodName}>{item.Name}</Text>
            <Text style={styles.FoodPrice}>{item.Price}</Text>
            <Text style={styles.FoodOffer}>{item.Offer}</Text>
            <Text style={styles.FoodFree}>{item.Free}</Text>
            <Text style={styles.FoodNow} >{item.TreadingNow}</Text>
            </TouchableOpacity>
          </View>
        ))}
      <View style={{width:'100%',backgroundColor:'#EFEFEF',height:10}}>
      </View>
    <View style={styles.SecondContainer}>
     <Text style={styles.text}>Apply cashback coupon for instant
     <TouchableOpacity  onPress={() => navigation.navigate('Card')}>
        <Text style={{fontSize:20,fontWeight:'600',left:30,top:10,color:'#413BD9'}}>Apply</Text>
     </TouchableOpacity>
     </Text>
     <Text style={styles.text2}>
     savings
     </Text>
     <View>
     </View>
     </View>
     <View style={{backgroundColor:'#FFCB49', height:20,width:20,  left:40, borderRadius:100,top:20}}>
    <Text style={{ fontSize:15,textAlign:'center',fontWeight:'800'}}>!</Text>
     </View>
     <Text style={styles.text3}>
        Note For Multicolor product, please check the 
     image for colour details before purchasing.</Text>
     <TouchableOpacity style={styles.button} >
        <Text style={styles.buttontext}>Add To Card</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.button2} >
        <Text style={styles.buttontext2}>Buy Now</Text>
     </TouchableOpacity>
     </View>
     </View>
    </>
    
    
  )
}

export default Add_To_Card

const styles = StyleSheet.create({
    icon:{
        fontSize:30,
        marginTop:10,
        marginLeft:20,
        color:'black'
      },
      image: {
        alignSelf:'center',
        width: 340,
        height: 340,
        borderRadius: 20,
        marginBottom: 20,
    },
    FoodName:{
        alignSelf:'center',
        fontSize:28,
        fontWeight:'600',
        bottom:10,
    },
    FoodPrice:{
        alignSelf:'flex-start',
        fontSize:23,
        fontWeight:'600',
        top:5,
        left:20,
    },
    FoodOffer:{
        alignSelf:'flex-start',
        fontSize:20,
        fontWeight:'600',
        top:10,
        left:20,
        color:'#7DEA10'
    },
    FoodFree:{
        alignSelf:'flex-start',
        fontSize:20,
        fontWeight:'600',
        top:15,
        left:20,
        color:'#413BD9'
    },
    FoodNow:{
        alignSelf:'flex-start',
        fontSize:18,
        fontWeight:'300',
        left:200,
        bottom:5,
        color:'#E316C1',
    },
    SecondContainer:{
        backgroundColor:"#b1FFBF",
        width:385,
        height:70,
        margin:15,
        borderRadius:10

    },
    text:{
        margin:10,
        fontWeight:'500',
        left:15,
    },
    text2:{
        bottom:8,
        left:25,
        fontWeight:'500'
    },
    text3:{
        fontSize:11,
       alignSelf:'center',
        fontWeight:'500',
        lineHeight:15,
        width:300,
        left:25,
       bottom:5
    },
    button: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',  
        borderWidth: 1,  
        borderColor: 'black', 
        borderRadius: 10, 
        left:30,
        top:30
      },
      buttontext: {
        fontSize: 20,
        color: '#413BD9',
        fontWeight:'700' 
      },
    button2: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#413BD9',  
        borderWidth: 1,  
        borderColor: 'black', 
        borderRadius: 10, 
        alignSelf:'flex-end',
        bottom:20,
        right:25
      },
      buttontext2: {
        fontSize: 20,
        color: 'white',
        fontWeight:'700' 
      },
})


