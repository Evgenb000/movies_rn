import { colors } from "@/assets/const/colors";
import { clsx } from "clsx";
import { Link } from "expo-router";
import { Star } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  index: number;
  title: string;
  imageUrl: string;
  rating?: number;
  votes?: number;
  releaseDate?: string;
  popularity?: number;
}

export default function CardMovie({
  index,
  title,
  rating,
  votes,
  releaseDate,
  imageUrl,
  popularity,
}: Props) {
  return (
    <Link href={`/movie/${index}`} asChild>
      <TouchableOpacity>
        <View
          className={clsx("flex gap-1 w-32", rating ? "min-h-72" : "min-h-64")}
        >
          <View>
            <Image
              source={{
                uri: imageUrl
                  ? `https://image.tmdb.org/t/p/w500${imageUrl}`
                  : `https://via.placeholder.com/600x400/1a1a1a/ffffff.png`,
              }}
              className="w-full h-48 rounded-md"
              resizeMode="cover"
            />
            <Text className="absolute bottom-0 -left-3 text-5xl text-blue">
              {popularity && popularity}
            </Text>
          </View>
          <Text className="text-light" numberOfLines={2}>
            {title}
          </Text>
          {rating && (
            <View className="flex flex-row gap-1 items-center">
              <Star size={16} color={colors.yellow} fill={colors.yellow} />
              <Text className="text-light text-sm">
                {rating.toFixed(1)} {votes && `(${votes.toLocaleString()})`}
              </Text>
            </View>
          )}
          {releaseDate && (
            <Text className="text-blue text-right text-sm">{releaseDate}</Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}
