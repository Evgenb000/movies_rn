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
    <View className="flex justify-between border border-blue w-32 min-h-72 p-2">
      <Image
        source={{
          uri: imageUrl
            ? `https://image.tmdb.org/t/p/w500${imageUrl}`
            : `https://via.placeholder.com/600x400/1a1a1a/fffffff.png`,
        }}
        className="w-full h-32"
        resizeMode="cover"
      />
      <Text>{title}</Text>
      <Text>
        Rating {rating} ({votes})
      </Text>
      <Text>Release Date {releaseDate} </Text>
    </View>
  );
}
