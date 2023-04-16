import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const MovieDetailsScreen = ({ route }) => {
  const { title, releaseYear, poster, overview } = {title: "23",releaseYear : 2323,poster: "23",overview: "232"}
  return (
    <View style={styles.container}>
      <Image style={styles.poster} source={{ uri: poster }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.releaseYear}>{releaseYear}</Text>
        <Text style={styles.overview}>{overview}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  detailsContainer: {
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  releaseYear: {
    fontSize: 16,
    marginBottom: 10,
  },
  overview: {
    fontSize: 18,
  },
});

export default MovieDetailsScreen;
