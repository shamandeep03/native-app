import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const HomePage = ({ categoryId, categoryName, categoryImage }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstProduct, setFirstProduct] = useState(null); // First product state

  // This function will fetch products by category ID
  const getProductsByCategory = async () => {
    try {
      const response = await fetch(`http://product.sash.co.in/api/Product/category/${categoryId}`);
      const text = await response.text();
      const data = JSON.parse(text);

      if (data?.data?.length > 0) {
        setProducts(data.data);
        setFirstProduct(data.data[0]); // Set first product details
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setError('Products fetching error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when categoryId changes
  useEffect(() => {
    if (categoryId) {
      setLoading(true); // Reset loader before fetching new category data
      getProductsByCategory();
    }
  }, [categoryId]); // Dependency array will trigger re-fetch if categoryId changes

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
    <View style={styles.container}>
        <Text style={styles.heading}>{categoryName || 'Category'}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
        
          {products.length === 0 ? (
            <Text style={styles.noDataText}>No products found</Text>
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={renderItem}
              numColumns={2} // Display 2 items per row
              contentContainerStyle={styles.listContent}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    position: 'relative',
    bottom:20
  },
  categoryHeader: {
    alignItems: 'center',


  },
  categoryImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,

  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  
  },
  loader: {
 
  },
  image: {
    width: '100%', // Make image fill the container
    height: 150,
    borderRadius: 8,
  
    
  },
  name: {
    fontSize: 16,
    fontWeight: '500',

  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
 
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
    marginTop: 20,
    shadowColor: '#000',
  
   
  },
  listContent: {
   
    paddingBottom: 20,
  },
});


export default HomePage;
