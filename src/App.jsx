import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// pages

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
