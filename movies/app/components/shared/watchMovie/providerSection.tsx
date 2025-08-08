import { WatchProvider } from "@/assets/types/watch-providers";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface ProviderSectionProps {
  title: string;
  providers: WatchProvider[] | undefined;
  watchLink?: string;
  onProviderPress: (provider: WatchProvider, watchLink?: string) => void;
}

export const ProviderSection: React.FC<ProviderSectionProps> = ({
  title,
  providers,
  watchLink,
  onProviderPress,
}) => {
  if (!providers || providers.length === 0) return null;

  return (
    <View className="mb-2">
      <Text className="text-lg font-semibold mb-2 text-light">{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row space-x-3 gap-2">
          {providers.map((provider) => (
            <TouchableOpacity
              key={provider.provider_id}
              className="items-center w-20 p-2 rounded-lg bg-gray bg-opacity-10 border border-gray border-opacity-20"
              onPress={() => onProviderPress(provider, watchLink)}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w92${provider.logo_path}`,
                }}
                className="w-12 h-12 mb-1 rounded-lg"
                resizeMode="contain"
              />
              <Text
                className="text-xs text-center text-dark leading-3"
                numberOfLines={2}
              >
                {provider.provider_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
