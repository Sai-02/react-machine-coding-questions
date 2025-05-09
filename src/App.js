import { URL_PATHS } from "./constants";
import Home from "./pages/Home/Home";
import Problem1 from "./pages/Problem1/Problem1";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Problem2 from "./pages/Problem2/Problem2";
import Problem3 from "./pages/Problem3/Problem3";
import Problem4 from "./pages/Problem4/Problem4";
import Problem5 from "./pages/Problem5/Problem5";
function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen ">
        <Routes>
          <Route path={URL_PATHS.HOME} element={<Home />} />
          <Route path={URL_PATHS.PROBLEM1} element={<Problem1 />} />
          <Route path={URL_PATHS.PROBLEM2} element={<Problem2 />} />
          <Route path={URL_PATHS.PROBLEM3} element={<Problem3 />} />
          <Route path={URL_PATHS.PROBLEM4} element={<Problem4 />} />
          <Route path={URL_PATHS.PROBLEM5} element={<Problem5 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
