import { GroupedPopularMovies, PopularMovies } from "@/assets/types/appwrite";

export const groupMoviesByTitle = (
  data: PopularMovies[]
): GroupedPopularMovies[] => {
  const grouped = data.reduce(
    (acc, item) => {
      const key = item.movie_id.toString();

      if (!acc[key]) {
        acc[key] = {
          movie_id: item.movie_id,
          movie_title: item.movie_title,
          poster_url: item.poster_url,
          total_count: 0,
          search_terms: [],
        };
      }

      acc[key].total_count += item.count;
      if (
        item.search_term &&
        !acc[key].search_terms.includes(item.search_term)
      ) {
        acc[key].search_terms.push(item.search_term);
      }

      return acc;
    },
    {} as Record<string, GroupedPopularMovies>
  );

  return Object.values(grouped).sort((a, b) => b.total_count - a.total_count);
};
