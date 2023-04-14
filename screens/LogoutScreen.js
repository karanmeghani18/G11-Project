import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { auth } from '../config/firebase-config';
import { signOut } from 'firebase/auth';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = async() => {
    // Perform logout actions (e.g. clear user session)
    // ...
    try{
      await signOut(auth);
      Alert.alert("Log Out succesfull")
      
    }catch(err){
      Alert.alert(`Error logging out ${err}`)
    }
    // Navigate back to login screen
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Are you sure you want to logout?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutScreen;
