import React from "react";
import { Text, View } from "react-native";

interface ErrorScreenProps {
  title: string;
  error: string;
}

export default function ErrorScreen({ title, error }: ErrorScreenProps) {
  return (
    <View className="flex-1 bg-dark pt-12">
      <Text className="text-2xl text-center text-light mb-4">{title}</Text>
      <Text className="text-error text-center font-bold text-xl mx-4">
        Error: {error}
      </Text>
    </View>
  );
}
