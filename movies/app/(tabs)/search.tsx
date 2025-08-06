import useFetchMovies from "@/hooks/useFetchMovies";
import { groupMoviesByTitle } from "@/hooks/useGroupPopularMovies";
import { fetchMovies } from "@/services/api-movies";
import { getPopularMovies, updateSearchCount } from "@/services/appwrite";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import CardMovie from "../components/shared/cardMovie";
import SearchBar from "../components/ui/searchBar";

export default function Search() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    reset: resetMovies,
  } = useFetchMovies(() => fetchMovies({ query: searchQuery }), false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    data: popularMovies,
    loading: popularMoviesLoading,
    error: popularMoviesError,
  } = useFetchMovies(getPopularMovies);

  React.useEffect(() => {
    const fTimeOut = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetchMovies();
      } else {
        resetMovies();
      }
    }, 500);

    return () => clearTimeout(fTimeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  React.useEffect(() => {
    if (
      movies?.results?.length > 0 &&
      movies?.results?.[0] &&
      searchQuery !== ""
    ) {
      updateSearchCount(searchQuery, movies?.results?.[0]);
    }
  }, [movies, searchQuery]);

  const groupedMovies = useMemo(() => {
    if (!popularMovies) return [];
    return groupMoviesByTitle(popularMovies);
  }, [popularMovies]);

  return (
    <View className="flex-1 bg-dark pt-12">
      <Text className="text-2xl text-center text-light">Movies</Text>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {moviesLoading ? (
        <ActivityIndicator size="large" color={"#fff"} />
      ) : moviesError ? (
        <Text className="text-error text-center font-bold text-xl">
          Error: {moviesError.message}
        </Text>
      ) : movies && movies.results ? (
        <View>
          {groupedMovies ? (
            <FlatList
              data={groupedMovies}
              renderItem={({ item }) => (
                <View>
                  <CardMovie
                    title={item.movie_title}
                    imageUrl={item.poster_url}
                  />
                </View>
              )}
              horizontal
              keyExtractor={(item) => item.movie_id.toString()}
              contentContainerStyle={{ paddingBottom: 240 }}
              ListEmptyComponent={
                !popularMoviesLoading && !popularMoviesError ? (
                  <Text className="text-light text-center">
                    {searchQuery.trim()
                      ? "No movies found"
                      : "Search for a movie"}
                  </Text>
                ) : null
              }
            />
          ) : (
            <Text className="text-light text-center">
              {searchQuery.trim() ? "No movies found" : "Search for a movie"}
            </Text>
          )}
          <Text className="text-2xl text-light font-bold mt-4 ml-4">
            Search Results:
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
            ListEmptyComponent={
              !moviesLoading && !moviesError ? (
                <Text className="text-light text-center">
                  {searchQuery.trim()
                    ? "No movies found"
                    : "Search for a movie"}
                </Text>
              ) : null
            }
          />
        </View>
      ) : (
        <Text className="text-center mt-8 text-gray">No movies found</Text>
      )}
    </View>
  );
}
