import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';


import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignUpScreen'
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import BuyTicketsScreen from './screens/BuyTicketsScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    
    const listener = onAuthStateChanged(auth, (userFromAuth) => {
      if (userFromAuth != null){
        setIsAuthenticated(true)
        setLoggedInUser(userFromAuth)
      }else{
        setIsAuthenticated(false)
        setLoggedInUser()
      }
    });
    return listener; 
  }, []);

  
    return (
      <NavigationContainer>
    <Stack.Navigator
    initialRouteName='HomeScreen'>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name='MovieDetails' component={MovieDetailsScreen}/>
      <Stack.Screen name='BuyTickets' component={BuyTicketsScreen}/>
    </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
