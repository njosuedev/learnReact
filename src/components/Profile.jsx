import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext.jsx";
import { SchoolsContext } from "../contexts/SchoolsContext.jsx";

export default function Profile() {
  const { username, name: schoolName } = useParams(); // schoolName from /schools/:name
  const { users, loading: loadingUsers, error: usersError } = useContext(UsersContext);
  const { schools, loading: loadingSchools, error: schoolsError } = useContext(SchoolsContext);

  const [user, setUser] = useState(null);
  const [school, setSchool] = useState(null);

  // Find user
  useEffect(() => {
    if (username && !loadingUsers && users.length > 0) {
      const foundUser = users.find(u => u.username === username);
      setUser(foundUser);
    }
  }, [username, users, loadingUsers]);

  // Find school by name
  useEffect(() => {
    if (schoolName && !loadingSchools && schools.length > 0) {
      const foundSchool = schools.find(
        s => s.name.trim().replace(/\s+/g, "-") === schoolName
      );
      setSchool(foundSchool);
    }
  }, [schoolName, schools, loadingSchools]);

  if ((username && loadingUsers) || (schoolName && loadingSchools)) return <p>Loading details...</p>;
  if (usersError) return <p style={{ color: "red" }}>User Error: {usersError}</p>;
  if (schoolsError) return <p style={{ color: "red" }}>School Error: {schoolsError}</p>;
  if (!user && !school) return <p>No user or school found.</p>;

  return (
    <div>
      {user && (
        <div>
          <h1>{user.username}'s Profile</h1>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}</p>
        </div>
      )}

      {school && (
        <div style={{ marginTop: "2rem" }}>
          <h1>{school.name} Profile</h1>
          <p><strong>Address:</strong> {school.address}</p>
          <p><strong>Phone:</strong> {school.phone}</p>
          <p><strong>Type:</strong> {school.type}</p>
          <p><strong>Students:</strong> {school.studentsCount}</p>
        </div>
      )}
    </div>
  );
}
