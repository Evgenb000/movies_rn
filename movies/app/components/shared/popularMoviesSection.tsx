import React from "react";
import { FlatList, Text, View } from "react-native";
import CardMovie from "./cardMovie";

interface PopularMoviesSectionProps {
  groupedMovies: any[];
  loading: boolean;
  error: Error | null;
}

export default function PopularMoviesSection({
  groupedMovies,
  loading,
  error,
}: PopularMoviesSectionProps) {
  if (groupedMovies?.length === 0) return null;

  return (
    <View className="mb-6">
      <Text className="text-2xl text-light font-bold mx-4 mb-4">
        Popular Movies:
      </Text>
      <FlatList
        data={groupedMovies}
        renderItem={({ item: movie, index }) => (
          <View className="ml-4 first:ml-4">
            <CardMovie
              index={movie.movie_id}
              popularity={index + 1}
              title={movie.movie_title}
              imageUrl={movie.poster_url}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(movie) => movie.movie_id.toString()}
        contentContainerStyle={{ paddingRight: 16 }}
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mx-4">
              <Text className="text-light text-center">
                No popular movies found
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
