import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc, updateDoc, deleteDoc, getDoc, doc } from "firebase/firestore";
import { db } from '../config/firebase-config'
import { auth } from '../config/firebase-config';
import { useNavigation } from '@react-navigation/native';


const TAX_RATE = 0.13;
const TICKET_PRICE = 12;

const BuyTicketsScreen = ({  route  }) => {

  const navigation = useNavigation();
  const { title, releaseYear, poster} = route.params;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(auth.currentUser);
  const [email,setEmail] = useState(loggedInUser.email)
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [purchaseId, setPurchaseId] = useState();

  const handlePurchase = async () => {

    const purchaseData = {
      userId: auth.currentUser.uid,
      movieName: title,
      name: `${firstName} ${lastName}`,
      tickets: ticketQuantity,
      totalPaid: (ticketQuantity * TICKET_PRICE * (1 + TAX_RATE)).toFixed(2),
      
    };
try {
  const subCollectionRef = collection(db, "Users",auth.currentUser.uid, "Purchases");
  await addDoc(subCollectionRef,purchaseData)
  alert('Purchase successful!');
  navigation.navigate('Now Playing');
}
catch(error){
  console.error(error)
  alert(error)
}

  };

  const handleChangeTicketQuantity = (delta) => {
    const newQuantity = ticketQuantity + delta;
    if (newQuantity >= 0) {
      setTicketQuantity(newQuantity);
    }
  };

  const renderOrderSummary = () => {
    if (ticketQuantity === 0) return null;

    const subtotal = ticketQuantity * TICKET_PRICE;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return (
      <View style={styles.orderSummary}>
        <Text>Movie: {title}</Text>
        <Text>Tickets: {ticketQuantity}</Text>
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>Tax: ${tax.toFixed(2)}</Text>
        <Text>Total: ${total.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Buy Tickets</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Tickets</Text>
        <View style={styles.ticketQuantityContainer}>
          <TouchableOpacity onPress={() => handleChangeTicketQuantity(-1)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.ticketQuantity}>{ticketQuantity}</Text>
          <TouchableOpacity onPress={() => handleChangeTicketQuantity(1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderOrderSummary()}
      {ticketQuantity > 0 && (
        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
          <Text style={styles.purchaseText}>CONFIRM PURCHASE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  ticketQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#3f51b5',
    borderWidth: 1,
    padding: 12,
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 8,
    backgroundColor:'#3f51b5',
    borderWidth: 1,
    borderWidth: 1,
    color: '#fff'
  },
  ticketQuantity: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
  orderSummary: {
    marginBottom: 16,
    
  },
  purchaseButton: {
    backgroundColor: '#3f51b5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  purchaseText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
})
export default BuyTicketsScreen;