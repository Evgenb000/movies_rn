import useFetchMovies from "@/hooks/useFetchMovies";
import { fetchMovies } from "@/services/api-movies";
import { updateSearchCount } from "@/services/appwrite";
import React from "react";
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

  React.useEffect(() => {
    const fTimeOut = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetchMovies();

        if (movies?.results?.length > 0 && movies?.results?.[0]) {
          await updateSearchCount(searchQuery, movies?.results?.[0]);
        }
      } else {
        resetMovies();
      }
    }, 500);

    return () => clearTimeout(fTimeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

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
