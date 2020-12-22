import { Plant } from "../api/types";
import { loadPlants, subscribeUpdateOnce } from "../api/database";
import { useState, useEffect } from "react";

export const useData = () => {
  const [data, setData] = useState<Plant[]>([]);

  useEffect(() => {
    loadPlants().then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    const handleUpdate = (newData: Plant[]) => {
      setData(newData);
    };
    subscribeUpdateOnce(handleUpdate);
  });

  return data;
};
