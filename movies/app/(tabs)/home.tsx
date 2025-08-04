import useFetchMovies from "@/hooks/useFetchMovies";
import { fetchMovies } from "@/services/api-movies";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import CardMovie from "../components/shared/cardMovie";
import SearchBar from "../components/ui/searchBar";

export default function Home() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetchMovies(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-dark pt-20">
      <Text className="text-2xl text-center text-light">Movies</Text>
      {moviesLoading ? (
        <ActivityIndicator size="large" color={"#fff"} />
      ) : moviesError ? (
        <Text className="text-error text-center font-bold text-xl">
          Error: {moviesError.message}
        </Text>
      ) : movies && movies.results ? (
        <View>
          <SearchBar />
          <Text className="text-2xl text-light font-bold mt-4 ml-4">
            Latest Movies:
          </Text>
          <FlatList
            data={movies.results}
            renderItem={({ item }) => (
              <View>
                <CardMovie
                  title={item.title}
                  rating={item.vote_average}
                  votes={item.vote_count}
                  releaseDate={item.release_date}
                  imageUrl={item.poster_path}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "space-between",
              gap: 20,
              marginTop: 20,
              marginHorizontal: 20,
            }}
          />
        </View>
      ) : (
        <Text className="text-light text-center">No movies found</Text>
      )}
    </View>
  );
}
