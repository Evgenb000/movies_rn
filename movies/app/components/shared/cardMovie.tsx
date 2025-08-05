import { colors } from "@/assets/const/colors";
import { Star } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";

interface Props {
  title: string;
  rating: number;
  votes: number;
  releaseDate: string;
  imageUrl: string;
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
            : `https://via.placeholder.com/600x400/1a1a1a/fffffff.png`,
        }}
        className="w-full h-48 rounded-md"
        resizeMode="contain"
      />
      <Text className="text-light">{title}</Text>
      <View className="flex flex-row gap-1 items-center">
        <Star size={12} color={colors.yellow}></Star>
        <Text className="text-light text-sm ">
          {rating} ({votes} votes)
        </Text>
      </View>
      <Text className="text-blue text-right text-sm">{releaseDate} </Text>
    </View>
  );
}
