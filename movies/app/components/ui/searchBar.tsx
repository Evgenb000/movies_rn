import React from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View className="mx-5 mt-4">
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ backgroundColor: "#cdbea7" }}
        inputStyle={{ color: "#323030" }}
      />
    </View>
  );
}
