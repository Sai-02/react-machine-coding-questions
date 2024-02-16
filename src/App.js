import { URL_PATHS } from "./constants";
import Home from "./pages/Home/Home";
import Problem1 from "./pages/Problem1/Problem1";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen ">
        <Routes>
          <Route path={URL_PATHS.HOME} element={<Home />} />
          <Route path={URL_PATHS.PROBLEM1} element={<Problem1 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
