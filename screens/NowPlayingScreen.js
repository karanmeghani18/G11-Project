import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MovieDetailsScreen from './MovieDetailsScreen'

const NowPlayingScreen = ({navigation, route}) => {
    const [movies, setMovies] = useState([]);
    const Stack = createNativeStackNavigator();

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing',
          {
            params: {
              api_key: '1114f529253eb1e5f738a2cca3fb1c14',
            },
          },
        );
        setMovies(response.data.results);
      };
      fetchData();
    }, []);
  
    const renderItem = ({ item }) => (
      
      <View style={styles.movieContainer}>
        <TouchableOpacity
      style={styles.movieContainer}
      onPress={() =>
        navigation.navigate('MovieDetails',{params: {
          title: item.title,
          releaseYear: item.release_date.split('-')[0],
          poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          overview: item.overview,
      }})
      }>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.poster}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.releaseDate}>{item.release_date}</Text>
        </TouchableOpacity>
      </View>
    );
  
    return (

      <View style={styles.container}>
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
          {/* <Stack.Navigator>
          <Stack.Screen name='MovieDetails' component = {MovieDetailsScreen}></Stack.Screen>
          </Stack.Navigator> */}
      </View>
      
    );
  };
  export default NowPlayingScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    movieContainer: {
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    poster: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
      borderRadius: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    releaseDate: {
      fontSize: 16,
      color: '#888',
      marginBottom: 10,
    },
  });
  
