import { MovieDetail } from "@/assets/types/appwrite";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
} as const;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  return handleResponse(response);
};

export const fetchMovieById = async (movieId: string): Promise<MovieDetail> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?language=en-US`,
    {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    }
  );

  return handleResponse(response);
};
