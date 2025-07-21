import { useEffect, useState } from "react";

export default function useInitialData(fetchFn) {
  const [initializing, setInitializing] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const { error, data, errorMessage } = await fetchFn();
      if (!mounted) return;
      if (!error) {
        setData(data);
      } else {
        setError(errorMessage || "Something went wrong");
      }
      setInitializing(false);
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { initializing, data, error };
}
