import useFetchMovies from "@/hooks/useFetchMovies";
import { groupMoviesByTitle } from "@/hooks/useGroupPopularMovies";
import { fetchMovies } from "@/services/api-movies";
import { getPopularMovies } from "@/services/appwrite";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import CardMovie from "../components/shared/cardMovie";

export default function Home() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetchMovies(() => fetchMovies({ query: "" }));

  const {
    data: popularMovies,
    loading: popularMoviesLoading,
    error: popularMoviesError,
  } = useFetchMovies(getPopularMovies);

  const groupedMovies = useMemo(() => {
    if (!popularMovies) return [];
    return groupMoviesByTitle(popularMovies);
  }, [popularMovies]);

  return (
    <View className="flex-1 bg-dark pt-12">
      <Text className="text-2xl text-center text-light">Movies</Text>
      {moviesLoading ? (
        <ActivityIndicator size="large" color={"#fff"} />
      ) : moviesError ? (
        <Text className="text-error text-center font-bold text-xl">
          Error: {moviesError.message}
        </Text>
      ) : movies && movies.results ? (
        <View>
          {groupedMovies && (
            <>
              <View>
                <Text className="text-2xl text-light font-bold mt-4 ml-4">
                  Popular Movies:
                </Text>
              </View>

              <FlatList
                data={groupedMovies}
                renderItem={({ item }) => (
                  <View className="mt-4 ml-5">
                    <CardMovie
                      title={item.movie_title}
                      imageUrl={item.poster_url}
                    />
                  </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.movie_id.toString()}
                contentContainerStyle={{ paddingBottom: 40 }}
                ListEmptyComponent={
                  !popularMoviesLoading && !popularMoviesError ? (
                    <Text className="text-light text-center">
                      No popular movies found
                    </Text>
                  ) : null
                }
              />
            </>
          )}
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
            contentContainerStyle={{ paddingBottom: 240 }}
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
