import { Route, Routes } from "react-router-dom"
import {CurrencyList, CurrencyDetails} from './';

function AppRoutes() {
  return(
    <Routes>
        <Route path="/" element={<CurrencyList/>}></Route>
        <Route path="/new" element={<h1>Nueva moneda!</h1>}></Route>
        <Route path="currency/:id" element={<CurrencyDetails />}></Route>
    </Routes>
  );
}

export default AppRoutes