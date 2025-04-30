import { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

export const useSpeciesData = (query) => {
  const [info, setInfo] = useState([]); 
  const [points, setPoints] = useState([]);
  const [charts, setCharts] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [loadingCharts, setLoadingCharts] = useState(false);
  const [error, setError] = useState(null);

  const isInitialMount = useRef(true);

  const fetchSpeciesInfo = async (q) => {
    setLoadingInfo(true);
    setError(null);

    if (q.species_id === 0) {
      console.log("Fetching all species info...");
      try {
        const speciesArr = [1, 2, 3, 4];
        const responses = await Promise.all(
          speciesArr.map((id) => {
            const url = `http://127.0.0.1:5000/api/species-filtered-locations?postcode=${encodeURIComponent(q.postcode)}&species_id=${id}`;
            return fetch(url).then((res) => res.json());
          })
        );

        let aggregatedPoints = [];
        let allSpeciesInfo = [];

        responses.forEach((resp) => {
          if (resp.result) {
            aggregatedPoints = aggregatedPoints.concat(resp.result);
          }
          if (resp.species_info) {
            allSpeciesInfo.push(resp.species_info);
          }
        });

        setPoints(aggregatedPoints);
        setInfo(allSpeciesInfo);
      } catch (err) {
        setError("Failed to fetch all species info");
        console.error(err);
      } finally {
        setLoadingInfo(false);
      }
      return;
    } else {
      const str = `?postcode=${encodeURIComponent(q.postcode)}&species_id=${q.species_id}`;
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/species-filtered-locations${str}`);
        const data = await res.json();
        setInfo(data.species_info ? [data.species_info] : []);
        setPoints(data.result || []);
      } catch (err) {
        setError("Failed to fetch species info");
        console.error(err);
      } finally {
        setLoadingInfo(false);
      }
    }
  };

  const fetchChartData = async (species_id) => {
    setLoadingCharts(true);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/species-locations/timeseries?species_id=${species_id}`);
      const data = await res.json();
      setCharts(data);
    } catch (err) {
      setError("Failed to fetch chart data");
      console.error(err);
    } finally {
      setLoadingCharts(false);
    }
  };

  useEffect(() => {
    const { postcode, species_id } = query;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!postcode.trim()) return;
    }

    const debouncedHandler = debounce(() => {
      fetchSpeciesInfo({ postcode, species_id });
    }, 300);

    debouncedHandler();

    return () => {
      debouncedHandler.cancel();
    };
  }, [query.postcode, query.species_id]);

  useEffect(() => {
    fetchChartData(query.species_id);
  }, [query.species_id, query.postcode]);

  return { info, points, charts, loadingInfo, loadingCharts, error };
};
