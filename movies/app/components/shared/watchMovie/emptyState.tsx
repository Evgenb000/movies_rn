import React from "react";
import { Text, View } from "react-native";

interface EmptyStateProps {
  countryCode: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ countryCode }) => {
  return (
    <View className="p-6 items-center justify-center">
      <Text className="text-gray text-center text-sm italic">
        No streaming options available in {countryCode}
      </Text>
    </View>
  );
};
