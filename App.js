import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { auth } from './config/firebase-config';

import NowPlayingScreen from './screens/NowPlayingScreen'
import MyPurchasesScreen from './screens/MyPurchasesScreen';
import LogoutScreen from './screens/LogoutScreen';
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignUpScreen'
import { onAuthStateChanged } from 'firebase/auth';
import MovieDetailsScreen from './screens/MovieDetailsScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name='NowPlayingScreen' component={NowPlayingScreen}/>
      <Stack.Screen name='MovieDetails' component={MovieDetailsScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // check if user is authenticated here
    const listener = onAuthStateChanged(auth, (userFromAuth) => {
      if (userFromAuth != null){
        setIsAuthenticated(true)
      }else{
        setIsAuthenticated(false)
      }
    });
    return listener; 
    // set isAuthenticated state accordingly
  }, []);

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
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
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name="Now Playing" component={NowPlayingScreen} />
        <Tab.Screen name="My Purchases" component={MyPurchasesScreen} />
        {isAuthenticated && <Tab.Screen name="Logout" component={LogoutScreen} />} 
      </Tab.Navigator>
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
