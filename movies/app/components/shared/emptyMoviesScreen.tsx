import React from "react";
import { Text, View } from "react-native";

interface EmptyMoviesScreenProps {
  title: string;
  message: string;
}

export default function EmptyMoviesScreen({
  title,
  message,
}: EmptyMoviesScreenProps) {
  return (
    <View className="flex-1 bg-dark pt-12">
      <Text className="text-2xl text-center text-light mb-4">{title}</Text>
      <Text className="text-light text-center">{message}</Text>
    </View>
  );
}
