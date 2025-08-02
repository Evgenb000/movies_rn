import { ScrollView, Text, TextInput, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-red-200 pt-20">
      <Text className="text-2xl text-center">Movies</Text>
      <TextInput placeholder="Search" className="mt-4" />
      <ScrollView></ScrollView>
    </View>
  );
}
