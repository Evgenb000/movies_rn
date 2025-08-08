import { WatchProvider } from "@/assets/types/watch-providers";
import { Alert, Linking } from "react-native";

export const getProviderWebsite = (providerName: string): string => {
  const providerUrls: { [key: string]: string } = {
    Netflix: "https://www.netflix.com",
    "Amazon Prime Video": "https://www.primevideo.com",
    "Amazon Prime Video with Ads": "https://www.primevideo.com",
    "Disney Plus": "https://www.disneyplus.com",
    Hulu: "https://www.hulu.com",
    "HBO Max": "https://www.max.com",
    "Apple TV": "https://tv.apple.com",
    "Paramount Plus": "https://www.paramountplus.com",
    Peacock: "https://www.peacocktv.com",
    YouTube: "https://www.youtube.com/movies",
    "Google Play Movies": "https://play.google.com/store/movies",
    Vudu: "https://www.vudu.com",
  };

  return providerUrls[providerName] || "https://www.themoviedb.org";
};

export const handleProviderPress = async (
  provider: WatchProvider,
  watchLink?: string
) => {
  try {
    const url = watchLink || getProviderWebsite(provider.provider_name);

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "Cannot Open Link",
        `Unable to open ${provider.provider_name}. Please check if the app is installed.`
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    Alert.alert("Error", `Failed to open ${provider.provider_name}`);
  }
};
