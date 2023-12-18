// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import useFetchBlogs from "./hooks/useFetch";
import { Article } from "./types";
import { width } from "./helpers";

export default function App() {
  const { data, loading, error } = useFetchBlogs(
    "https://newsapi.org/v2/everything?q=bitcoin&apiKey={API_KEY}"
  );

  const handlePress = () => {
    // Implement the speech functionality here
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data?.articles.map((article: Article, index: number) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>{article.title}</Text>
            <Text style={styles.cardDescription}>{article.description}</Text>
          </View>
        ))}
        <Button onPress={handlePress} title="Speak" />
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    paddingTop: 50,
  },
  card: {
    marginVertical: 8,
    width: width - 32,
    padding: 4,
  },
  cardText: {
    fontSize: 17,
  },
  cardDescription: {
    paddingVertical: 10,
  },
  cardImage: {
    width: "100%",
    height: 100,
  },
});
