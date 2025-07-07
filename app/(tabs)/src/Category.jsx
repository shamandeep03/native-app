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
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const { width } = useWindowDimensions();
  const imageSize = width / 4.2;

  useEffect(() => {
    getCategory();
    getCities();
  }, []);

  const getCategory = async () => {
    try {
      const response = await fetch('http://product.sash.co.in:81/api/ProductCategory/category-list');
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        const categoryData = data?.data ?? [];
        setCategory(Array.isArray(categoryData) ? categoryData : []);
      }
    } catch (error) {
      console.error('Error fetching category:', error.message);
      Alert.alert('Error', 'Could not load categories.');
    } finally {
      setLoading(false);
    }
  };

  const getCities = async () => {
    try {
      const res = await axios.get('http://product.sash.co.in:81/api/City/city-list');
      const cityArray = Array.isArray(res.data?.data) ? res.data.data : [];

      const formatted = cityArray
        .filter((c) => c?.name)
        .map((c) => ({
          label: c.name,
          value: c.name,
        }));

      setCities(formatted);
    } catch (err) {
      console.error('City fetch error:', err.message);
      Alert.alert('Error', 'Could not load cities.');
      setCities([]);
    }
  };

  const handleCategoryPress = (categoryItem) => {
    if (!selectedCity) {
      Alert.alert('Select City', 'Please select a city before choosing a category.');
      return;
    }

    navigation.navigate('Vendor', {
      categoryId: categoryItem.id,
      categoryName: categoryItem.name,
      cityName: selectedCity,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)} activeOpacity={0.7}>
      <View style={[styles.card, { width: imageSize + 10 }]}>
        <Image
          source={{ uri: item?.productFile?.imageUrl || 'https://via.placeholder.com/100' }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={[styles.text, { maxWidth: imageSize + 10 }]} numberOfLines={1}>
          {item.name || 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.dropdownWrapper}>
          <Text style={styles.heading}>Select City</Text>

          {cities.length > 0 ? (
            <DropDownPicker
              open={open}
              value={selectedCity}
              items={cities}
              setOpen={setOpen}
              setValue={setSelectedCity}
              setItems={setCities}
              placeholder="Select a city"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listMode="MODAL" // ✅ Mobile-friendly modal dropdown
              modalProps={{
                animationType: 'slide',
              }}
              modalContentContainerStyle={{ backgroundColor: 'white' }}
            />
          ) : (
            <ActivityIndicator size="small" color="#007bff" />
          )}
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View style={styles.container}>
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              <FlatList
                data={category}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id?.toString()}
                renderItem={renderItem}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  dropdownWrapper: {
    paddingHorizontal: 12,
    marginTop: 16,
  },
  dropdown: {
    borderColor: '#ccc',
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 6,
    backgroundColor: '#eee',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Category;
