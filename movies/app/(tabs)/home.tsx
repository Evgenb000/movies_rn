import { useFetchMovies } from "@/hooks/useFetchMovies";
import { useGroupedMovies } from "@/hooks/useGroupPopularMovies";
import { fetchMovies } from "@/services/api-movies";
import { getPopularMovies } from "@/services/appwrite";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import EmptyMoviesScreen from "../components/shared/emptyMoviesScreen";
import ErrorScreen from "../components/shared/errorScreen";
import LatestMoviesSection from "../components/shared/latestMoviesSection";
import LoadingScreen from "../components/shared/loadingScreen";
import PopularMoviesSection from "../components/shared/popularMoviesSection";

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

  const groupedMovies = useGroupedMovies(popularMovies);

  if (moviesLoading) {
    return <LoadingScreen title="Movies" />;
  }

  if (moviesError) {
    return <ErrorScreen title="Movies" error={moviesError.message} />;
  }

  if (!movies?.results) {
    return <EmptyMoviesScreen title="Movies" message="No movies found" />;
  }

  return (
    <View className="flex-1 bg-dark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="pt-12 pb-6">
          <Text className="text-2xl text-center text-light">Movies</Text>
        </View>

        <PopularMoviesSection
          groupedMovies={groupedMovies}
          loading={popularMoviesLoading}
          error={popularMoviesError}
        />

        <LatestMoviesSection movies={movies.results} />
      </ScrollView>
    </View>
  );
}
