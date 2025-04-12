import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Add_To_Card = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const item = route.params?.item || {
    title: 'https://wallpaperaccess.com/full/1306125.jpg',
    Name: 'SPAICY BURGER',
    Price: 'PRICE : $150',
    Offer: '80% off',
    Free: 'Free Delivery',
    TreadingNow: 'Trending Now',
  };

  return (
    <View style={{ backgroundColor: '#f8f9fa', flex: 1 }}>
      <MaterialCommunityIcons
        name="arrow-left-thick"
        size={25}
        style={styles.icon}
        onPress={() => navigation.goBack()}
      />

      <Image style={styles.image} source={{ uri: item.title }} />
      <Text style={styles.FoodName}>{item.Name}</Text>
      <Text style={styles.FoodPrice}>{item.Price}</Text>
      <Text style={styles.FoodOffer}>{item.Offer}</Text>
      <Text style={styles.FoodFree}>{item.Free}</Text>
      <Text style={styles.FoodNow}>{item.TreadingNow}</Text>

      <View style={styles.divider} />

      <View style={styles.SecondContainer}>
        <Text style={styles.text}>
          Apply cashback coupon for instant{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Card')}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.text2}>savings</Text>
      </View>

      <View style={styles.infoCircle}>
        <Text style={styles.exclamation}>!</Text>
      </View>

      <Text style={styles.text3}>
        Note: For multicolor products, please check the image for color details before purchasing.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttontext}>Add To Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttontext2}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Add_To_Card;

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    marginTop: 10,
    marginLeft: 20,
    color: 'black',
  },
  image: {
    alignSelf: 'center',
    width: 340,
    height: 340,
    borderRadius: 20,
    marginBottom: 10,
  },
  FoodName: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 4,
  },
  FoodPrice: {
    fontSize: 23,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  FoodOffer: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
    color: '#7DEA10',
  },
  FoodFree: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
    color: '#413BD9',
  },
  FoodNow: {
    fontSize: 18,
    fontWeight: '300',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: -10,
    color: '#E316C1',
  },
  divider: {
    width: '100%',
    backgroundColor: '#EFEFEF',
    height: 10,
    marginVertical: 10,
  },
  SecondContainer: {
    backgroundColor: '#b1FFBF',
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#413BD9',
    marginLeft: 10,
  },
  text2: {
    marginTop: 4,
    marginLeft: 10,
    fontWeight: '500',
  },
  infoCircle: {
    backgroundColor: '#FFCB49',
    height: 20,
    width: 20,
    borderRadius: 100,
    marginLeft: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exclamation: {
    fontSize: 15,
    fontWeight: '800',
  },
  text3: {
    fontSize: 11,
    alignSelf: 'center',
    fontWeight: '500',
    lineHeight: 15,
    width: 300,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 30,
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
  },
  buttontext: {
    fontSize: 20,
    color: '#413BD9',
    fontWeight: '700',
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
  },
  buttontext2: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
});
