import { Routes, Route } from "react-router";

import Header from "./components/Header/Header";
import Home from "./pages/HomePage/HomePage";
import VariablesPage from "./pages/VariablesPage/VariablesPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/variables" element={<VariablesPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
