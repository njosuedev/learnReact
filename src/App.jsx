import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Schools from "./pages/Schools"
import UserProfile from "./components/UserProfile";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/:username" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


