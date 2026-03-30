import { Routes, Route } from "react-router";

import Home from "./pages/HomePage/HomePage";
import VariablesPage from "./pages/VariablesPage/VariablesPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/variables" element={<VariablesPage />} />
      </Routes>
    </>
  );
}

export default App;
