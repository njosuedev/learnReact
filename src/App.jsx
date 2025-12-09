import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Schools from "./pages/Schools"
import Profile from "./components/Profile";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
         <Route path="/schools/:name" element={<Profile />} />
<Route path="/:username" element={<Profile />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}


