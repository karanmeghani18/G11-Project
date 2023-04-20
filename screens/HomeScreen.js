import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { auth } from '../config/firebase-config';
import NowPlayingScreen from './NowPlayingScreen'
import MyPurchasesScreen from './MyPurchasesScreen';
import LogoutScreen from './LogoutScreen';
import { onAuthStateChanged } from 'firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeScreen = () => {
const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // check if user is authenticated here
        const listener = onAuthStateChanged(auth, (userFromAuth) => {
          if (userFromAuth != null){
            setIsAuthenticated(true)
          }else{
            setIsAuthenticated(false)
            console.log("Logged in user is null!")
          }
        });
        return listener; 
        // set isAuthenticated state accordingly
      }, []);

    return (
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
            },  activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          })}>
            <Tab.Screen name="Now Playing" component={NowPlayingScreen} />
            <Tab.Screen name="My Purchases"component ={MyPurchasesScreen} />
            {isAuthenticated && <Tab.Screen name="Logout" component={LogoutScreen} />} 
          </Tab.Navigator>
      );    
}
export default HomeScreen;