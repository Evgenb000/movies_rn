import React from "react";

const useFetchMovies = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch = true
) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchMoviesData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  React.useEffect(() => {
    if (autoFetch) {
      fetchMoviesData();
    }
  }, []);

  return { data, loading, error, refresh: fetchMoviesData, reset };
};

export default useFetchMovies;
