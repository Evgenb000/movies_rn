import { colors } from "@/assets/const/colors";
import { Star } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";

interface Props {
  title: string;
  imageUrl: string;
  rating?: number;
  votes?: number;
  releaseDate?: string;
}

export default function CardMovie({
  title,
  rating,
  votes,
  releaseDate,
  imageUrl,
}: Props) {
  return (
    <View className="flex gap-1 w-32 min-h-72">
      <Image
        source={{
          uri: imageUrl
            ? `https://image.tmdb.org/t/p/w500${imageUrl}`
            : `https://via.placeholder.com/600x400/1a1a1a/ffffff.png`,
        }}
        className="w-full h-48 rounded-md"
        resizeMode="cover"
      />
      <Text className="text-light" numberOfLines={2}>
        {title}
      </Text>
      <View className="flex flex-row gap-1 items-center">
        {rating && (
          <View className="flex flex-row gap-1 items-center">
            <Star size={16} color={colors.yellow} />
            <Text className="text-light text-sm">
              {rating.toFixed(1)} {votes && `(${votes.toLocaleString()})`}
            </Text>
          </View>
        )}
      </View>
      {releaseDate && (
        <Text className="text-blue text-right text-sm">{releaseDate}</Text>
      )}
    </View>
  );
}
