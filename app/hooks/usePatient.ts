import { useState, useEffect } from "react";
import hmsService from "../services/HmsService";
import Patient from "../models/Patient";
const usePatient = (id: string): any => {
  const [data, setData] = useState<Patient>({});
  const [isLoading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    (async function() {
      let data = await hmsService.patient.get(id);
      setData(data);
      setLoading(false);
    })();
  }, [id]);
  return { isLoading, data };
};

export default usePatient;
