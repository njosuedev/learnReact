import React, { useContext, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext.jsx";
import { SchoolsContext } from "../contexts/SchoolsContext.jsx";

export default function Home() {
  const { users, loading, error } = useContext(UsersContext);
  const { schools, loadingSchools, schoolsError } = useContext(SchoolsContext);

  // Get active filter from Layout context
  const { activeFilter } = useOutletContext();

  const [searchUser, setSearchUser] = useState("");
  const [searchSchool, setSearchSchool] = useState("");

  // Filter users by search + active/inactive
  const filteredUsers = users
    .filter(user =>
      user.username.toLowerCase().includes(searchUser.toLowerCase())
    )
    .filter(user => {
      if (activeFilter === "all") return true;
      if (activeFilter === "active") return user.isActive;
      if (activeFilter === "inactive") return !user.isActive;
      return true;
    });

  // Filter schools by search
  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchSchool.toLowerCase())
  );

  return (
    <>
      {/* USERS SECTION */}
      <div>
        <h1>Users List</h1>

        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading && !error && (
          <>
            {/* Search input */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              style={{ marginBottom: "1rem", padding: "0.5rem", width: "50%" }}
            />

            {filteredUsers.length > 0 ? (
              <ul>
                {filteredUsers.map((user) => (
                  <li key={user.id}>
                    <Link
                      to={`/${user.username}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {user.username} - {user.email} - {user.phone} - {user.role} -{" "}
                      {user.isActive ? "Active" : "Inactive"}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </>
        )}
      </div>

      {/* SCHOOLS SECTION */}
      <div style={{ marginTop: "2rem" }}>
        <h1>Schools List</h1>

        {loadingSchools && <p>Loading schools...</p>}
        {schoolsError && <p style={{ color: "red" }}>Error: {schoolsError}</p>}

        {!loadingSchools && !schoolsError && (
          <>
            {/* Search input */}
            <input
              type="text"
              placeholder="Search schools..."
              value={searchSchool}
              onChange={(e) => setSearchSchool(e.target.value)}
              style={{ marginBottom: "1rem", padding: "0.5rem", width: "50%" }}
            />

            {filteredSchools.length > 0 ? (
              <ul>
                {filteredSchools.map((school) => (
                  <li key={school.id}>
                    <Link
                      to={`/schools/${school.name.trim().replace(/\s+/g, "-")}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {school.name} - {school.address} - {school.phone} - {school.type} - {school.studentsCount}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No schools found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
