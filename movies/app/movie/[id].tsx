import { colors } from "@/assets/const/colors";
import { useFetchMovieById } from "@/hooks/useFetchMovies";
import { fetchMovieById } from "@/services/api-movies";
import { useLocalSearchParams } from "expo-router";
import { Calendar, Clock, DollarSign, Globe, Star } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export default function Movie() {
  const { id }: { id: string } = useLocalSearchParams();

  const { data: movie } = useFetchMovieById(() => fetchMovieById(id));

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-dark">
      <View className="relative">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `https://via.placeholder.com/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-64"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-dark opacity-10" />
      </View>

      <View className="px-4 pb-6">
        <View className="flex-row -mt-20 mb-6">
          <View className="mr-4">
            <Image
              source={{
                uri: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `https://via.placeholder.com/600x400/1a1a1a/ffffff.png`,
              }}
              className="w-32 h-48 rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex-1 mt-16">
            <Text className="text-2xl font-bold mb-2 text-light">
              {movie.title}
            </Text>

            <Text className="text-sm mb-2 italic text-light opacity-90">
              {movie.original_title}
            </Text>

            <Text className="text-lg mb-3 text-blue">
              &quot;{movie.tagline}&quot;
            </Text>

            <View className="flex-row items-center mb-2">
              <Star size={20} color={colors.yellow} fill={colors.yellow} />
              <Text className="text-lg font-semibold ml-1 text-light">
                {movie.vote_average.toFixed(1)}
              </Text>
              <Text className="text-sm ml-1 text-gray">
                ({movie.vote_count} votes)
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row flex-wrap mb-4">
          {movie.genres.map((genre) => (
            <View
              key={genre.id}
              className="rounded-full px-3 py-1 mr-2 mb-2 bg-blue"
            >
              <Text className="text-sm font-medium text-light">
                {genre.name}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row justify-between mb-6 px-2">
          <View className="items-center">
            <Clock size={20} color={colors.blue} />
            <Text className="text-sm mt-1 text-light">
              {formatRuntime(movie.runtime)}
            </Text>
          </View>

          <View className="items-center">
            <Calendar size={20} color={colors.blue} />
            <Text className="text-sm mt-1 text-light">
              {new Date(movie.release_date).getFullYear()}
            </Text>
          </View>

          <View className="items-center">
            <Globe size={20} color={colors.blue} />
            <Text className="text-sm mt-1 text-light">
              {movie.origin_country[0]}
            </Text>
          </View>

          <View className="items-center">
            <DollarSign size={20} color={colors.blue} />
            <Text className="text-sm mt-1 text-light">
              {formatCurrency(movie.revenue)}
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-light">
            Overview
          </Text>
          <Text className="text-base leading-6 text-light">
            {movie.overview}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-light">
            Production Companies
          </Text>
          <View className="flex-row flex-wrap">
            {movie.production_companies.map((company) => (
              <View
                key={company.id}
                className="p-3 mr-2 mb-2 bg-light rounded-lg"
              >
                <Image
                  source={{
                    uri: company.logo_path
                      ? `https://image.tmdb.org/t/p/w500${company.logo_path}`
                      : `https://via.placeholder.com/600x400/1a1a1a/ffffff.png`,
                  }}
                  className="w-16 h-16"
                  resizeMode="contain"
                />
                <Text className="text-sm font-medium text-dark">
                  {company.name}
                </Text>
                <Text className="text-xs text-gray">
                  {company.origin_country}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {movie.belongs_to_collection && (
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-3 text-light">
              Part of Collection
            </Text>
            <View className="rounded-lg p-4 bg-blue">
              <Text className="text-lg font-semibold text-light">
                {movie.belongs_to_collection.name}
              </Text>
            </View>
          </View>
        )}

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-light">Details</Text>

          <View className="space-y-2">
            <View className="flex-row justify-between py-1">
              <Text className="text-gray">Status</Text>
              <Text className="text-light">{movie.status}</Text>
            </View>

            <View className="flex-row justify-between py-1">
              <Text className="text-gray">Original Language</Text>
              <Text className="text-light">
                {movie.spoken_languages
                  .map((language) => language.english_name)
                  .join(", ") || "Unknown"}
              </Text>
            </View>

            <View className="flex-row justify-between py-1">
              <Text className="text-gray">Release Date</Text>
              <Text className="text-light">
                {new Date(movie.release_date).toLocaleDateString()}
              </Text>
            </View>

            <View className="flex-row justify-between py-1">
              <Text className="text-gray">IMDB ID</Text>
              <Text className="text-light">{movie.imdb_id}</Text>
            </View>
          </View>
        </View>

        {movie.homepage && (
          <TouchableOpacity className="rounded-lg py-3 px-6 items-center bg-blue">
            <Text className="text-lg font-semibold text-light">
              Visit Official Website
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
