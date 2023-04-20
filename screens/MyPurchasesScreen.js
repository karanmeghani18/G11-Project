import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { db } from '../config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

import { auth } from '../config/firebase-config';

const MyPurchasesScreen = ({  navigation }) => {

  const [purchases, setPurchases] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isUnaunthenticated, setisUnaunthenticated] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      if(auth.currentUser === null){
        setisUnaunthenticated(true)
      }else{
        fetchData();
        console.log('My Purchases screen is focused');
        setisUnaunthenticated(false)

      }

      return () => {
        setPurchases([])
        console.log('My Purchases screen is unfocused');
      };
    }, [])
  );

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users", auth.currentUser.uid, "Purchases"));
      let purchases = [];
      querySnapshot.forEach((doc) => {
        const purchaseData = doc.data();
        purchases.push(purchaseData);
      });
      setPurchases(purchases);
      if (purchases.length === 0) {
        setIsEmpty(true);
      }

    } catch (error) {
      console.error(error);
    }

  };

  const renderItem = ({ item }) => (
    <View style={styles.purchaseItem}>
      <Text style={styles.movieTitle}>{item.movieName}</Text>
      <Text style={styles.purchaseQuantity}>Num Ticketsd: {item.tickets}</Text>
      <Text style={styles.purchasePrice}>Total Paid: ${item.totalPaid}</Text>
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
        
      )
      }

{isUnaunthenticated && (
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
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
