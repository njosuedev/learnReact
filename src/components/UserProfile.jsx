import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext.jsx";

export default function UserProfile() {
  const { username } = useParams(); // get username from URL
  const { users, loading, error } = useContext(UsersContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!loading && users.length > 0) {
      const foundUser = users.find((u) => u.username === username);
      setUser(foundUser);
    }
  }, [username, users, loading]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}</p>
    </div>
  );
}
