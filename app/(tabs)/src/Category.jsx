import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions();
  const imageSize = width / 4.2;
  const navigation = useNavigation();

  const getCategory = async () => {
    try {
        debugger
      const response = await fetch('http://product.sash.co.in/api/ProductCategory/category-list');
      const text = await response.text();
      if (text) {
        debugger
        const data = JSON.parse(text);
        setCategory(data.data || []);
      } else {
        console.warn('Empty response from API');
      }
    } catch (error) {
      console.error('Error fetching category:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debugger
    getCategory();
  }, []);

  const handleCategoryPress = (categoryItem) => {
    debugger
    navigation.navigate('HomePage', {
      categoryId: categoryItem.id,
      categoryName: categoryItem.name,
      categoryImage: categoryItem?.productFile?.url,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)} activeOpacity={0.7}>
      <View style={[styles.card, { width: imageSize + 10 }]}>
        <Image
          source={{ uri: item?.productFile?.url }}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            marginBottom: 6,
          }}
          resizeMode="cover"
        />
        <Text style={[styles.text, { maxWidth: imageSize + 10 }]} numberOfLines={1}>
          {item.name || 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <FlatList
            data={category}
            horizontal
            scrollEnabled
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  card: {
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Category;
