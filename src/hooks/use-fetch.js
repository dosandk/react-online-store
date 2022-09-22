import { useState, useEffect, useCallback } from "react";
import httpRequest from "../core/request";

function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  console.error('url', url);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const data = await httpRequest.get(url);
      await setList([...list, ...data]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [url]);

  useEffect(() => {
    sendQuery();
  }, [url, sendQuery]);

  return { loading, error, list };
}

export default useFetch;
