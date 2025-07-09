// ✅ My_Cart.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

const My_Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [address, setAddress] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      fetchCart();
      getAddress();
    }, [])
  );

  const getAddress = async () => {
    const addressId = await AsyncStorage.getItem("userAddressId");
    const cityName = await AsyncStorage.getItem("userCityName");
    if (!addressId || !cityName) return;
    const token = await AsyncStorage.getItem("userToken");
    try {
      const res = await axios.get(
        `http://product.sash.co.in:81/api/Address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            CityName: cityName,
          },
        }
      );
      setAddress(res.data);
    } catch (e) {
      console.warn("Address fetch failed", e);
    }
  };

  const fetchCart = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const cityName = await AsyncStorage.getItem("userCityName");
      if (!token || !cityName) {
        console.warn("Token or CityName not found");
        return;
      }

      const response = await axios.get(
        "http://product.sash.co.in:81/api/Cart/my-cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            CityName: cityName,
          },
        }
      );

      const data = response.data;

      if (Array.isArray(data)) {
        const itemsWithQty = data.map((item) => ({
          ...item,
          qty: item.count || 1,
        }));
        setCartItems(itemsWithQty);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const incrementQty = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].qty += 1;
    setCartItems(updatedItems);
  };

  const decrementQty = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].qty > 1) {
      updatedItems[index].qty -= 1;
      setCartItems(updatedItems);
    }
  };

  const removeFromCart = (index) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        onPress: async () => {
          const itemToRemove = cartItems[index];
          const updatedItems = cartItems.filter((_, i) => i !== index);
          setCartItems(updatedItems);

          try {
            const token = await AsyncStorage.getItem("userToken");
            const cityName = await AsyncStorage.getItem("userCityName");
            if (!token || !cityName) {
              console.warn("Token or CityName not found");
              return;
            }

            await axios.delete(
              `http://product.sash.co.in:81/api/Cart/${itemToRemove.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  CityName: cityName,
                },
              }
            );
          } catch (error) {
            console.error("Error removing from backend:", error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => {
        const price = parseFloat(item.product?.price || "0");
        return sum + price * item.qty;
      }, 0)
      .toFixed(2);
  };

  const handleContinue = async () => {
    await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
    await AsyncStorage.setItem("totalAmount", calculateTotal());
    router.push("../src/Order");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.topBar}>
            {address ? (
              <>
                <Text style={styles.delivery}>Deliver to: {address.location}, {address.pincode}</Text>
                <Text style={styles.address}>{address.floor}</Text>
              </>
            ) : (
              <Text style={styles.delivery}>No address selected.</Text>
            )}
            <TouchableOpacity onPress={() => Alert.alert("Change address")}>
              <Text style={styles.change}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.couponSection}>
            <Text style={styles.couponText}>
              Flat ₹52 Off - Apply cashback coupon for instant savings
            </Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Loading cart...
            </Text>
          ) : cartItems.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Your cart is empty.
            </Text>
          ) : (
            cartItems.map((item, index) => (
              <View style={styles.product} key={index}>
                <Image
                  source={{
                    uri:
                      item.product?.image?.url ||
                      "https://via.placeholder.com/80",
                  }}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <Text style={styles.productTitle}>
                    {item.product?.name || "Unnamed Product"}
                  </Text>

                  <View style={styles.id}>
                    <Text style={styles.oldPrice}>₹{item.product?.price}</Text>
                    <Text style={styles.newPrice}>₹{item.product?.price}</Text>
                  </View>

                  <View style={styles.qty}>
                    <Text>Qty:</Text>
                    <View style={styles.qtyButtons}>
                      <TouchableOpacity onPress={() => decrementQty(index)}>
                        <Text style={styles.qtyButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyCount}>{item.qty}</Text>
                      <TouchableOpacity onPress={() => incrementQty(index)}>
                        <Text style={styles.qtyButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.actions}>
                    <TouchableOpacity>
                      <Text style={styles.actionText}>Move to Saved Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeFromCart(index)}>
                      <Text style={styles.actionText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {cartItems.length > 0 && (
          <View style={styles.bottomBar}>
            <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default My_Cart;

const styles = StyleSheet.create({
  container: { backgroundColor: "#f5f5f5" },
  product: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  details: { flex: 1, marginLeft: 12 },
  productTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  id: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 10 },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 14,
  },
  newPrice: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
    marginLeft: 8,
  },
  qty: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    gap: 10,
  },
  qtyButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3f51b5",
    paddingHorizontal: 10,
  },
  qtyCount: { fontSize: 16, fontWeight: "500" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionText: {
    color: "#3f51b5",
    fontWeight: "bold",
    fontSize: 13,
  },
  topBar: { backgroundColor: "white", padding: 16, marginBottom: 10, elevation: 2 },
  delivery: { fontWeight: "bold", fontSize: 16 },
  address: { marginTop: 4, color: "#666" },
  change: { marginTop: 6, color: "#3f51b5", fontWeight: "bold" },
  couponSection: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  couponText: { flex: 1, fontSize: 14, color: "#333" },
  applyButton: {
    backgroundColor: "#ff9800",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  applyText: { color: "white", fontWeight: "bold" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    elevation: 10,
  },
  totalText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  continueBtn: {
    backgroundColor: "#6A5ACD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  continueText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
