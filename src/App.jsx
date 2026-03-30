import { Routes, Route } from "react-router";

import Home from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
