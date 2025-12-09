import React, { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext.jsx";
import { SchoolsContext } from "../contexts/SchoolsContext.jsx";

export default function Home() {
  const { schools, loading, error } = useContext(SchoolsContext);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {schools.map((school) => (
          <li key={school.id}>
            {school.name} - {school.address} - {school.phone} - {school.type}- {school.studentsCount} - {" "}
          </li>
        ))}
      </ul>
    </div>
  );
}