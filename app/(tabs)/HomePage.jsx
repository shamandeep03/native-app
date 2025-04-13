import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const HomePage = () => {
  const route = useRoute();
  const { categoryId, categoryName } = route.params || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductsByCategory = async () => {
    try {
      debugger
      const response = await fetch( `http://product.sash.co.in/api/Product/category/id/${categoryId}`);
      debugger
      const text = await response.text();
      debugger
      const data = JSON.parse(text);
      setProducts(data?.data || []);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debugger
    if (categoryId) {
      debugger
      getProductsByCategory();
    }
  }, [categoryId]);

  debugger
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item?.productFile?.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        Category: {categoryName || 'Unknown'}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : products.length === 0 ? (
        <Text style={styles.noDataText}>No products found in this category.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  loader: {
    marginTop: 50,
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default HomePage;
