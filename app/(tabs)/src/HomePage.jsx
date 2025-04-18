import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = ({ categoryId, categoryName, categoryImage }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const getProductsByCategory = async () => {
    try {
      const response = await fetch(`http://product.sash.co.in/api/Product/category/${categoryId}`);
      const text = await response.text();
      const data = JSON.parse(text);

      if (data?.data?.length > 0) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setError('Products fetching error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      getProductsByCategory();
    }
  }, [categoryId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Add_To_Cart', {
          item: {
            title: item?.productFiles?.url,
            Name: item.name,
            Price: `₹${item.id}`, // replace with correct price if available
            Offer: '80% off',
            Free: 'Free Delivery',
            TreadingNow: 'Trending Now',
          },
        })
      }
    >
      <Image
        source={{ uri: item?.productFiles?.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.categoryHeader}>
        {categoryImage && (
          <Image
            source={{ uri: categoryImage }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.heading}>{categoryName || 'Category'}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : products.length === 0 ? (
        <Text style={styles.noDataText}>No products found</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  categoryHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  loader: {
    marginTop: 40,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
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
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    elevation: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HomePage;
