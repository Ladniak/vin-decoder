import { Routes, Route } from "react-router";

import Header from "./components/Header/Header";
import Home from "./pages/HomePage/HomePage";
import VariablesPage from "./pages/VariablesPage/VariablesPage";
import VariableDetailsPage from "./pages/VariableDetailsPage/VariableDetailsPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/variables" element={<VariablesPage />} />
          <Route
            path="/variables/:variableId"
            element={<VariableDetailsPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
