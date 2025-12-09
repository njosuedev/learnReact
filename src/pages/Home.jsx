import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext.jsx";
import { SchoolsContext } from "../contexts/SchoolsContext.jsx";

export default function Home() {
  const { users, loading, error } = useContext(UsersContext);
  const { schools, loadingSchools, schoolsError } = useContext(SchoolsContext);

  const [searchUser, setSearchUser] = useState("");
  const [searchSchool, setSearchSchool] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchUser.toLowerCase())
  );
  const filteredSchools = schools.filter((school) =>
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
                      to={`/${user.username}`} // dynamic route to user profile
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
      <div>
        <h1>Schools List</h1>

        {loadingSchools && <p>Loading schools...</p>}
        {schoolsError && <p style={{ color: "red" }}>Error: {schoolsError}</p>}

        {!loading && !error && (
          <>
            {/* Search input */}
            <input
              type="text"
              placeholder="Search School..."
              value={searchSchool}
              onChange={(e) => setSearchSchool(e.target.value)}
              style={{ marginBottom: "1rem", padding: "0.5rem", width: "50%" }}
            />

            {filteredSchools.length > 0 ? (
              <ul>
                {filteredSchools.map((school) => (
                  <li key={school.id}>
                    {school.name} - {school.addess} - {school.phone} - {school.type} - {school.studentCount} -{""}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
