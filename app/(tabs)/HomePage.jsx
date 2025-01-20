import { View, StyleSheet, TextInput, StatusBar, ScrollView, Image,Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Index = () => {
  
  const data = [
    { id: 1, title: 'https://i.pinimg.com/originals/1f/71/d4/1f71d4c56bdfbf016ab44fea253c2406.png' },
    { id: 2, title: 'https://i.pinimg.com/736x/1a/0c/92/1a0c9280182d49889ef2ce70e93d6580.jpg' },
    { id: 3, title: 'https://cdn.dribbble.com/users/1520130/screenshots/11008333/media/29cb675171cadd88e289ed9872e47b1c.jpg' },
    { id: 4, title: 'https://www.sliderrevolution.com/wp-content/uploads/2023/07/food-website-templates.jpg' },
    { id: 5, title: 'https://static.dribbble.com/users/3934953/screenshots/11066445/media/da02f83e459c4cda555bc2aacb06e09c.png' },
    { id: 6, title: 'https://s.tmimgcdn.com/scr/1200x627/255800/restfood-restaurant-one-page-html5-website-template_255812-original.png' },
    { id: 7, title: 'https://i.pinimg.com/originals/7c/9a/f7/7c9af7d4e1cfc27697b3a3e54a3007d4.png' },
    { id: 8, title: 'https://cdn.dribbble.com/users/1018201/screenshots/14700548/media/901107dd8f0f0dede1f8ead7df8b5d1e.png?compress=1&resize=1200x900' },
    { id: 9, title: 'https://cdn.dribbble.com/users/1728196/screenshots/4414691/untitled-1.jpg' },
    { id: 10, title: 'https://cdn.dribbble.com/users/418188/screenshots/6322456/food_order_website_design_tubik_4x.png' },
  ];

  const food = [
    { id: 1, title: 'https://tse2.mm.bing.net/th?id=OIP.lEa60MoPEz7kNWZQBc_a3wHaEo&pid=Api&P=0&h=180', Name: "Veggy Lover", link: { onPress: () => navigation.navigate('Add_To_Card') }},
    { id: 2, title: 'https://img.jakpost.net/c/2016/09/29/2016_09_29_12990_1475116504._large.jpg', Name: "MockRock Chiken", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 3, title: 'https://images.pexels.com/photos/793759/pexels-photo-793759.jpeg?cs=srgb&dl=bowl-cherries-chopping-board-793759.jpg&fm=jpg', Name: "Cheesy Delight", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 4, title: 'https://cdn.quotesgram.com/img/80/57/148586100-Delicious-foods-groceries-wide-HD-wallpaper.jpg', Name: "Mexican Grillend", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 5, title: 'https://images.pexels.com/photos/1026679/pexels-photo-1026679.jpeg?cs=srgb&dl=curry-delicious-food-delicious-indian-food-indian-cuisine-1026679.jpg&fm=jpg', Name: "Veggy Lover", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 6, title: 'https://images.unsplash.com/photo-1504185945330-7a3ca1380535?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=e83aaf0f5cc31174b7832d75126f1520', Name: "MockRock Chiken", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 7, title: 'https://wallpaperaccess.com/full/1306125.jpg', Name: "Cheesy Delight", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 8, title: 'http://cdn.wallpapersafari.com/69/95/GsNcVt.jpg', Name: "Mexican Grillend", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 9, title: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Free-Food-Images-Download.jpg', Name: "Veggy Lover", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 10, title: 'https://tse2.mm.bing.net/th?id=OIP.41AA68Z2szUwM4fg-IqzTwHaE7&pid=Api&P=0&h=180', Name: "MockRock Chiken", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 11, title: 'https://wallpapercave.com/wp/wp7029319.jpg', Name: "Cheesy Delight", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 12, title: 'https://wallpapercave.com/wp/wp7029319.jpg', Name: "Mexican Grillend", link: { onPress: () => navigation.navigate('NonVegFood') }},
    { id: 13, title: 'https://wallpapercave.com/wp/wp7029319.jpg', Name: "Veggy Lover", link: { onPress: () => navigation.navigate('NonVegFood') }},
  ];
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      
    <StatusBar hidden={true} />
    <View style={styles.searchContainer}>
      <MaterialCommunityIcons name="magnify" size={25} color="#888" style={styles.icon} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search here..."
        placeholderTextColor="#888"
      />
      <MaterialCommunityIcons name="heart" size={25} color="#888" style={styles.icon} />
    </View>
    <View style={styles.line} />
    <View style={styles.container1}>
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={true} 
        contentContainerStyle={styles.scrollView}
        scrollEventThrottle={10}
        decelerationRate={'fast'}
        
      >
        {data.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.title }} />
          </View>
        ))}
      </ScrollView>
    </View>
    <View style={{ backgroundColor: '#f8f9fa' }}>
      <Text style={styles.Heading}>𝐅𝐨𝐨𝐝</Text>
    </View>
    <View style={{ backgroundColor: '#f8f9fa' }}>
        <TouchableOpacity 
        style={styles.buttons}
         activeOpacity={0.7} 
         accessibilityLabel="View vegetarian options"
         onPress={() => navigation.navigate('NonVegFood')}
         >
          <Text style={{ fontSize: 20 }}>𝐕𝐄𝐆</Text>
        </TouchableOpacity>
      <TouchableOpacity 
        style={styles.components} 
        activeOpacity={0.7} 
        onPress={() => navigation.navigate('VegFood')}

      >
        <Text style={{ fontSize: 20 }}>𝐍𝐎𝐍 𝐕𝐄𝐆</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.container2}>
      <ScrollView 
        contentContainerStyle={styles.scrollView1}
        scrollEventThrottle={10}
        decelerationRate={'fast'}
      >
        {food.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
              <TouchableOpacity onPress={item.link.onPress}>
            <Image style={styles.images} source={{ uri: item.title }}
           
           />
            <Text style={styles.FoodName}>{item.Name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  </View>
);
};


export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  searchBar: {
    flex: 1,
    height: 45,
    paddingHorizontal: 15,
  },
  icon: {
    padding: 10,
  },
  line: {
    width: '100%',
    height: 1.5,
    marginTop: 18,
    backgroundColor: 'gray',
  },
  container1: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    marginTop:8
  },
  scrollView: {
    flexDirection: 'row',
    display:'flex', 
    justifyContent:"center",

  },
  imageContainer: {
    marginHorizontal: 5,
  },
  image: {
    height: 200,
    width: 400, 
    borderRadius: 10,
    margin:4
  },
  Heading:{
    textAlign:'center',
    fontSize:30,
  },
  buttons:{
   backgroundColor:"lightyellow",
   width:100,
   height:40,
   marginLeft:20,
   marginBottom:10,
   justifyContent:"center",
   alignItems:'center',
   borderRadius:7,
 shadowColor:"black",
  shadowRadius:8,
  elevation:10,
  shadowOffset:{
    height:2,
    width:2,
  }
  },
  components:{
    backgroundColor:"lightyellow",
    width:120,
    height:40,
    marginTop:-40,
    marginRight:20,
    display:"flex",
    alignSelf:"flex-end",
    justifyContent:"center",
    alignItems:'center',
    borderRadius:7,
  shadowColor:"black",
   shadowRadius:8,
   elevation:10,
   shadowOffset:{
     height:2,
     width:2,
   }
  },
  container2:{
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
    borderRadius: 100,
    margin:10,
    shadowColor:"black",
     shadowRadius:8,
     elevation:10,
     shadowOffset:{
       height:2,
       width:2,
     }
  },
  FoodName:{
    fontSize:16,
    fontWeight:"500",
    alignSelf:"center",
    marginBottom:10
  }
});
