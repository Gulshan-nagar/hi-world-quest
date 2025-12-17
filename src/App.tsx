import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>App is loading...</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
