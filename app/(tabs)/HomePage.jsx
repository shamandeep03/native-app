import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

const App = () => {
  const [category, setcategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { width } = useWindowDimensions();
  const imageSize = width / 4.2;

  const getCategory = async () => {
    try {
      const response = await fetch('http://product.sash.co.in/api/ProductCategory/category-list');
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        setcategory(data.data || []);
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

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item?.productFile?.url)}>
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
    <View style={styles.container}>
      <Text style={styles.headingText}>Select Category</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={category}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#000',
  },
  card: {
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    borderRadius: 12,
  },
});

export default App;
