import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignUpScreen'
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import BuyTicketsScreen from './screens/BuyTicketsScreen';
import NowPlayingScreen from './screens/NowPlayingScreen';
import MyPurchasesScreen from './screens/MyPurchasesScreen';
import LogoutScreen from './screens/LogoutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null);

  function TabNavigator() {
    return(  
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarInactiveTintColor: 'gray',
      tabBarActiveTintColor: '#3f51b5',
      headerShown:false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Now Playing') {
          iconName = focused ? 'film' : 'film-outline';
        } else if (route.name === 'My Purchases') {
          iconName = focused ? 'wallet' : 'wallet-outline';
        } else if (route.name === 'Logout') {
          iconName = focused ? 'log-out' : 'log-out-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },

    })}>
      <Tab.Screen name="Now Playing" component={StackOne} />
      <Tab.Screen name="My Purchases"component ={StackTwo} />
      {isAuthenticated && <Tab.Screen name="Logout" component={StackThree} />} 
    </Tab.Navigator>)
  }


  function StackOne (){return(    
<Stack.Navigator>
      <Stack.Screen name='Now Playing' component={NowPlayingScreen}></Stack.Screen>
      <Stack.Screen name='Movie Details' component={MovieDetailsScreen}></Stack.Screen>
      <Stack.Screen name='Buy Tickets' component={BuyTicketsScreen}></Stack.Screen>
      <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
      <Stack.Screen name='Sign Up' component={SignupScreen}/>
    </Stack.Navigator>
)}
function StackTwo (){
  return(
    <Stack.Navigator>
      <Stack.Screen name='My Purchases' component={MyPurchasesScreen}/>
      <Stack.Screen name='Login'  component={LoginScreen}/>
      <Stack.Screen name='Sign Up' component={SignupScreen}/>
      <Stack.Screen name='Now Playing' component={NowPlayingScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}
function StackThree (){
  return(
    <Stack.Navigator>
    <Stack.Screen name='Log Out' component={LogoutScreen}/>
    <Stack.Screen name='Login' component={LoginScreen}/>
    <Stack.Screen name='Sign Up' component={SignupScreen}/>
    </Stack.Navigator>
  )
}
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
        <TabNavigator/>
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
