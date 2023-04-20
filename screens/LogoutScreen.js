import React from 'react';
import { View, Text, Button, Alert, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { auth } from '../config/firebase-config';
import { signOut } from 'firebase/auth';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = async() => {
    // Perform logout actions (e.g. clear user session)
    // ...
    try{
      await signOut(auth);
      
      
    }catch(err){
      Alert.alert(`Error logging out ${err}`)
    }
    // Navigate back to login screen
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.nameGreeting}>Hey! {auth.currentUser.email}</Text>
      <Text style={styles.confirmMessge}>Are you ready to logout?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout} >
         <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create ({
  nameGreeting: {
    fontSize: 20,
     margin: 8,
     fontWeight:'bold',

  },
  confirmMessge:{
    margin: 20,
    fontSize: 19
  },
  button: {
    backgroundColor: '#3f51b5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
export default LogoutScreen;
