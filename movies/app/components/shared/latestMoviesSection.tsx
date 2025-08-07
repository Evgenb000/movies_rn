import React from "react";
import { FlatList, Text, View } from "react-native";
import { Movie } from "@/assets/types/appwrite";
import CardMovie from "./cardMovie";

interface LatestMoviesSectionProps {
  movies: Movie[];
}

export default function LatestMoviesSection({
  movies,
}: LatestMoviesSectionProps) {
  const renderLatestMovie = ({ item }: { item: Movie }) => (
    <View
      style={{
        flex: 1,
        marginHorizontal: 8,
        marginBottom: 16,
        maxWidth: "30%",
      }}
    >
      <CardMovie
        index={item.id}
        title={item.title}
        rating={item.vote_average}
        votes={item.vote_count}
        releaseDate={item.release_date}
        imageUrl={item.poster_path}
      />
    </View>
  );

  return (
    <View>
      <Text className="text-2xl text-light font-bold mx-4 mb-4">
        Latest Movies:
      </Text>
      <FlatList
        data={movies}
        renderItem={renderLatestMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginHorizontal: 8,
        }}
      />
    </View>
  );
}
