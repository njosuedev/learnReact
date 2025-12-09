import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UsersContext = createContext();

// Provider component
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state
  const [error, setError] = useState(null); // optional error state

  useEffect(() => {
    // Fetch users from JSON Server
    fetch("http://localhost:5000/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers, loading, error }}>
      {children}
    </UsersContext.Provider>
  );
};
