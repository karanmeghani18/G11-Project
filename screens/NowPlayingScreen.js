import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const NowPlayingScreen = () => {
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing',
          {
            params: {
              api_key: 'your_api_key',
            },
          },
        );
        setMovies(response.data.results);
      };
      fetchData();
    }, []);
  
    const renderItem = ({ item }) => (
      <View style={styles.movieContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.poster}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.releaseDate}>{item.release_date}</Text>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieItemContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieTime: {
    fontSize: 16,
    color: '#888',
  },
});
