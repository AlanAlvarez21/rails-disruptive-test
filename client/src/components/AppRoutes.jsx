import { Route, Routes } from "react-router-dom"
import { CurrencyList } from './';

function AppRoutes() {
  return(
    <Routes>
        <Route path="/" element={<CurrencyList/>}></Route>
        <Route path="/new" element={<h1>Nueva moneda!</h1>}></Route>
    </Routes>
  );
}

export default AppRoutes