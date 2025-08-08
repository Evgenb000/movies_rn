import {
  WatchProvider,
  WatchProvidersResponse,
} from "@/assets/types/watch-providers";
import { fetchWatchProviders } from "@/services/api-movies";
import { handleProviderPress } from "@/utils/providerUtils";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { EmptyState } from "./emptyState";
import { ErrorState } from "./errorState";
import { LoadingState } from "./loadingState";
import { ProviderSection } from "./providerSection";

interface MovieWatchProvidersProps {
  movieId: string;
  movieTitle: string;
  countryCode?: string;
}

const MovieWatchProviders: React.FC<MovieWatchProvidersProps> = ({
  movieId,
  movieTitle,
  countryCode = "US",
}) => {
  const [watchData, setWatchData] = useState<WatchProvidersResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWatchProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const loadWatchProviders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWatchProviders(movieId);
      setWatchData(data);
    } catch (err) {
      setError("Failed to load watch providers");
      console.error("Error fetching watch providers:", err);
    } finally {
      setLoading(false);
    }
  };

  const onProviderPress = (provider: WatchProvider, watchLink?: string) => {
    handleProviderPress(provider, watchLink);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !watchData) {
    return <ErrorState error={error} onRetry={loadWatchProviders} />;
  }

  const countryData = watchData.results[countryCode];

  if (!countryData) {
    return <EmptyState countryCode={countryCode} />;
  }

  const hasNoProviders =
    !countryData.flatrate && !countryData.rent && !countryData.buy;

  return (
    <View className="p-4 bg-dark">
      <Text className="text-xl font-bold mb-4 text-light">
        Where to Watch &quot;{movieTitle}&quot;
      </Text>

      <ProviderSection
        title="Stream"
        providers={countryData.flatrate}
        watchLink={countryData.link}
        onProviderPress={onProviderPress}
      />

      <ProviderSection
        title="Rent"
        providers={countryData.rent}
        watchLink={countryData.link}
        onProviderPress={onProviderPress}
      />

      <ProviderSection
        title="Buy"
        providers={countryData.buy}
        watchLink={countryData.link}
        onProviderPress={onProviderPress}
      />

      {hasNoProviders && (
        <View className="p-6 items-center justify-center">
          <Text className="text-gray text-center text-sm italic">
            No streaming options currently available
          </Text>
        </View>
      )}
    </View>
  );
};

export default MovieWatchProviders;
