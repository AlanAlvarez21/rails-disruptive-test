import { Route, Routes } from "react-router-dom";
import { CurrencyList } from "./";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CurrencyList />}></Route>
    </Routes>
  );
}

export default AppRoutes;
