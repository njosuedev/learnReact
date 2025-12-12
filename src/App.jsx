import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductProfile from "./components/ProductProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:title" element={<ProductProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
