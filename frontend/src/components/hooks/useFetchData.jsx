import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка загрузки данных");
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error, setData };
};

export default useFetchData;
