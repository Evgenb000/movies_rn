export interface PopularMovies {
  count: number;
  movie_id: number;
  movie_title: string;
  poster_url: string;
  search_term: string;
}

export interface GroupedPopularMovies {
  movie_id: number;
  movie_title: string;
  poster_url: string;
  total_count: number;
  search_terms: string[];
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
