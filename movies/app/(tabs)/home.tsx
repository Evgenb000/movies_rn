import React from "react";
import { ScrollView, Text, View } from "react-native";
import SearchBar from "../components/ui/searchBar";

export default function Home() {
  return (
    <View className="flex-1 bg-dark pt-20">
      <Text className="text-2xl text-center text-light">Movies</Text>
      <SearchBar />
      <ScrollView></ScrollView>
    </View>
  );
}
