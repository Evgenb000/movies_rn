import { colors } from "@/assets/const/colors";
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
        style={{ backgroundColor: colors.light }}
        inputStyle={{ color: colors.dark }}
      />
    </View>
  );
}
