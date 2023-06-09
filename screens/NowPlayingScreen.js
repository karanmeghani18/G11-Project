import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetailsScreen from './MovieDetailsScreen'

const NowPlayingScreen = ({ route}) => {
    const [movies, setMovies] = useState([]);
    const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
    useEffect(() => {
      const fetchData = async () => {
        const apiURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=1114f529253eb1e5f738a2cca3fb1c14&language=en-US&page=1&region=CA`;
        try {
          const response = await fetch(apiURL);
          const jsonData = await response.json();
          setMovies(jsonData.results);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
    
    const renderItem = ({ item }) => (
      
      <View style={styles.movieContainer}>
        <TouchableOpacity
      style={styles.movieContainer}
      onPress={() =>
        navigation.navigate('Movie Details',{
          title: item.title,
          releaseYear: item.release_date.split('-')[0],
          poster: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          overview: item.overview,
          rating: item.vote_average
      })
      }>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.poster}
        />
        <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.releaseDate}>{item.release_date}</Text>
        </View>
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

      </View>
    );
  };
  export default NowPlayingScreen;

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    movieContainer: {
    flexDirection: 'row',
    // margin: 3,
    padding: 5,
    maxWidth: '100%',
    },
    poster: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      borderRadius: 10,
    },
    details:{
      flexShrink:1,
      maxWidth:'100%',
      margin: 2
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
     
    },
    releaseDate: {
      fontSize: 16,
      color: '#888',
    },
  });
  
