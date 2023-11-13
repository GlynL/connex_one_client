import { useRef, useEffect, useState } from "react";

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const useFetch = (route: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<null | any>(null);

  async function fetchData() {
    try {
      setError(null);
      setIsLoading(true);

      const res = await fetch(`${process.env.REACT_APP_API_URL}${route}`, {
        headers: {
          Authorization: process.env.REACT_APP_TOKEN || "",
        },
      });
      if (!res.ok) {
        throw new Error();
      }
      const contentType = res.headers.get("content-type");
      let resData;
      if (contentType?.includes("text/plain")) {
        resData = await res.text();
      } else {
        resData = await res.json();
      }

      setData(resData);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching data");
    }
  }

  useInterval(fetchData, 30 * 1000);

  useEffect(() => {
    fetchData();
  }, [route]);

  return { isLoading, error, data };
};
