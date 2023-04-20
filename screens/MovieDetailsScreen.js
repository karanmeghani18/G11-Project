import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase-config';
import { useFocusEffect } from '@react-navigation/native';


const MovieDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { title, releaseYear, poster, overview, rating} = route.params;
  const userFromAuth = auth.currentUser

  const [loggedIn, setLoggedIn] = useState(true);


  useFocusEffect(
    React.useCallback(() => {
      if(auth.currentUser === null){
        setLoggedIn(false)
      }else{
        console.log('My Purchases screen is focused');
        setLoggedIn(true)


      }

      return () => {
        console.log('My Purchases screen is unfocused');
      };
    }, [])
  );
  // useEffect(() => {
  //   if (userFromAuth != null){
  //     setLoggedIn(true)
  //   }
  // }, [userFromAuth]);

  const handleBuyTickets = () => {
    if (loggedIn) {
      navigation.navigate('BuyTickets', {
        title: title,
        releaseYear: releaseYear,
        poster: poster,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backdrop} source={{ uri: poster }} />
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingContainer}>
            <Image style={styles.ratingIcon} source={require('../assets/star.png')} />
            <Text style={styles.rating}>{rating}/10</Text>
          </View>
        </View>
        <Text style={styles.releaseYear}>{releaseYear}</Text>
        <Text style={styles.overview}>{overview}</Text>
        {loggedIn && (
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyTickets} >
          <Text style={styles.buyButtonText}>BUY TICKETS</Text>
        </TouchableOpacity>
        )}
        {!loggedIn && (
<TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login', {
  returnScreen: 'MovieDetails'
})}>
  <Text style={styles.loginButtonText}>LOGIN TO BUY TICKETS</Text>
</TouchableOpacity>

        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backdrop: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  rating: {
    fontSize: 16,
  },
  releaseYear: {
    fontSize: 16,
    marginBottom: 10,
  },
  overview: {
    fontSize: 18,
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#3f51b5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#000',
  }
})
export default MovieDetailsScreen;
