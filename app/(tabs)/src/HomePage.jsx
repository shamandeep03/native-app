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
      const response = await fetch(`http://product.sash.co.in/api/Product/category/${categoryId}`);
      const text = await response.text();
      const data = JSON.parse(text);

      setProducts(data?.data || []);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setError('Products feaching error ');
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (categoryId) {
      getProductsByCategory();
    }
  }, [categoryId]);


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item?.productFiles?.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.id}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        {categoryName || 'Category'}  Products
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : products.length === 0 ? (
        <Text style={styles.noDataText}> Product</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
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
    marginBottom: 12,
  },
  loader: {
    marginTop: 20,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HomePage;
