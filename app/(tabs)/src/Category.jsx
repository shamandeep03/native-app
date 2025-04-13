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

import HomePage from "../src/HomePage"; // Make sure path is correct

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { width } = useWindowDimensions();
  const imageSize = width / 4.2;

  const getCategory = async () => {
    try {
      const response = await fetch('http://product.sash.co.in/api/ProductCategory/category-list');
      const text = await response.text();
      if (text) {
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
    getCategory();
  }, []);

  const handleCategoryPress = (categoryItem) => {
    setSelectedCategory(categoryItem);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)} activeOpacity={0.7}>
      <View style={[styles.card, { width: imageSize + 10 }]}>
        <Image
          source={{ uri: item?.productFile?.url }}
          style={{
            width: 100,
            height: 100,
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
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>

      {/* 👇👇 Show HomePage below selected category */}
      {selectedCategory && (
        <HomePage
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
        />
      )}
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
