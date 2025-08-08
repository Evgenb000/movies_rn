import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ErrorStateProps {
  error: string | null;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <View className="p-8 items-center justify-center">
      <Text className="text-red-500 text-center mb-4 text-sm">
        {error || "No watch providers available"}
      </Text>
      <TouchableOpacity
        onPress={onRetry}
        className="bg-blue px-5 py-2.5 rounded-lg"
      >
        <Text className="text-light font-semibold">Retry</Text>
      </TouchableOpacity>
    </View>
  );
};
