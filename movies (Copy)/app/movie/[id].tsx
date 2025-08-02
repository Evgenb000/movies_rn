import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Movie() {
  const { id } = useLocalSearchParams();

  return (
    <View className="mt-12">
      <Text>Movie: {id}</Text>
    </View>
  );
}
