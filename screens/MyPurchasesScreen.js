import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const MyPurchasesScreen = () => {

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // fetch user's purchases from backend
    const fetchPurchases = async () => {
      const response = await fetch('https://example.com/api/purchases');
      const data = await response.json();
      setPurchases(data);
    }
    fetchPurchases();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.purchaseItem}>
      <Text style={styles.movieTitle}>{item.movieTitle}</Text>
      <Text style={styles.purchaseDate}>Purchased on: {item.purchaseDate}</Text>
      <Text style={styles.purchaseQuantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.purchasePrice}>Total price: ${item.totalPrice}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {purchases.length > 0 ? (
        <FlatList
          data={purchases}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>No purchases found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  purchaseItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  purchaseDate: {
    fontStyle: 'italic',
    fontSize: 12,
    marginBottom: 5,
  },
  purchaseQuantity: {
    fontSize: 14,
    marginBottom: 5,
  },
  purchasePrice: {
    fontSize: 14,
  },
});

export default MyPurchasesScreen;
