import { colors } from "@/assets/const/colors";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

export const LoadingState: React.FC = () => {
  return (
    <View className="p-8 items-center justify-center">
      <ActivityIndicator size="large" color={colors.blue} />
      <Text className="mt-3 text-gray text-sm">Loading watch options...</Text>
    </View>
  );
};
