import React, { createContext, useState, useEffect } from "react";

export const SchoolsContext = createContext();

export const SchoolsProvider = ({ children }) => {
  const [schools, setSchools] = useState([]);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [schoolsError, setSchoolsError] = useState(null);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("http://localhost:5000/schools");

        if (!res.ok) throw new Error("Failed to fetch schools");

        const data = await res.json();

        setSchools(data);
        setLoadingSchools(false);
      } catch (err) {
        setSchoolsError(err.message);
        setLoadingSchools(false);
      }
    }

    fetchSchools();
  }, []);

  return (
    <SchoolsContext.Provider
      value={{
        schools,
        setSchools,
        loadingSchools,
        schoolsError,
      }}
    >
      {children}
    </SchoolsContext.Provider>
  );
};
