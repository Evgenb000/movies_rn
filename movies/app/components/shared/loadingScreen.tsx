import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingScreenProps {
  title: string;
}

export default function LoadingScreen({ title }: LoadingScreenProps) {
  return (
    <View className="flex-1 bg-dark pt-12 justify-center items-center">
      <Text className="text-2xl text-center text-light mb-4">{title}</Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
