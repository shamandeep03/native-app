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
import HomePage from '../HomePage'; // Adjust the import path as necessary

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { width } = useWindowDimensions();
  const imageSize = width / 4.2;
  const navigation = useNavigation();

  const getCategories = async () => {
    try {
      debugger
      const response = await fetch('http://product.sash.co.in/api/ProductCategory/category-list');
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching category:', error.message);
      setError('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debugger
    getCategories();
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
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.7}
    >
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
        <Text style={styles.title}>Select a Category</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : categories.length === 0 ? (
          <Text style={styles.noDataText}>No categories available.</Text>
        ) : (
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
      <HomePage />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    alignItems: 'center',
    marginRight: 12,
    padding: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 10,
  },
});

export default Category;
