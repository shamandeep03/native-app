import React from 'react';
import { View, ScrollView,Image, StyleSheet,Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const VegFood = () => {
    const food = [
        { id: 1, title: 'https://tse2.mm.bing.net/th?id=OIP.lEa60MoPEz7kNWZQBc_a3wHaEo&pid=Api&P=0&h=180',heading:"84% off150" },
        { id: 2, title: 'https://img.jakpost.net/c/2016/09/29/2016_09_29_12990_1475116504._large.jpg' ,heading:"84% off150"},
        { id: 3, title: 'https://images.pexels.com/photos/793759/pexels-photo-793759.jpeg?cs=srgb&dl=bowl-cherries-chopping-board-793759.jpg&fm=jpg' ,heading:"84% off150" },
        { id: 4, title: 'https://cdn.quotesgram.com/img/80/57/148586100-Delicious-foods-groceries-wide-HD-wallpaper.jpg'  ,heading:"84% off150"},
        { id: 5, title: 'https://images.pexels.com/photos/1026679/pexels-photo-1026679.jpeg?cs=srgb&dl=curry-delicious-food-delicious-indian-food-indian-cuisine-1026679.jpg&fm=jpg' ,heading:"84% off150" },
        { id: 6, title: 'https://images.unsplash.com/photo-1504185945330-7a3ca1380535?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=e83aaf0f5cc31174b7832d75126f1520'  ,heading:"84% off150"},
        { id: 7, title: 'https://wallpaperaccess.com/full/1306125.jpg' ,heading:"84% off150" },
        { id: 8, title: 'http://cdn.wallpapersafari.com/69/95/GsNcVt.jpg'  ,heading:"84% off150"},
        { id: 9, title: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Free-Food-Images-Download.jpg' ,heading:"84% off150" },
        { id: 10, title: 'https://tse2.mm.bing.net/th?id=OIP.41AA68Z2szUwM4fg-IqzTwHaE7&pid=Api&P=0&h=180' ,heading:"84% off150" },
        
      
      ];
      const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
         <View style={{ backgroundColor: '#f8f9fa' }}>
         <MaterialCommunityIcons name="arrow-left-thick" size={25}  style={styles.icon} 
          onPress={() => navigation.navigate('HomePage')}/>
      <Text style={styles.Heading2}>𝐕𝐄𝐆 𝐅𝐨𝐨𝐝</Text>
    </View>
      <ScrollView 
        contentContainerStyle={styles.scrollView1}
        scrollEventThrottle={10}
        decelerationRate={'fast'}
      >
        {food.map((item) => (
          <View key={item.id}>
            <Image style={styles.images} source={{ uri: item.title }} />
            <Text style={styles.heading}>{item.heading}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f8f9fa',
        paddingVertical: 10,
        
      },
      scrollView1: {
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
    
      },
      images: {
        height: 160,
        width: 160, 
        borderRadius: 10,
        margin:10,
        shadowColor:"black",
         shadowRadius:8,
         elevation:10,
         shadowOffset:{
           height:2,
           width:2,
         }
      },
      heading:{
    fontSize:18,
    alignSelf:'center',
    marginBottom:20,
    fontWeight:'700'
      },
      Heading2:{
        textAlign:'center',
        fontSize:30,
        marginTop:20
      },
      icon:{
        fontSize:30,
        marginLeft:20,
        color:'black'
      }
});

export default VegFood;
