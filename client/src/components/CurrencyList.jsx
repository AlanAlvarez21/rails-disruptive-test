import { useState, useEffect } from "react";
import Table from "./Table";
import { API_URL } from "../constants";

function CurrencyList() {
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const response = await fetch(`${API_URL}/api/v1/currencies`);
        const json = await response.json();
        setCoins(json);
      } catch (error) {
        setError("An error ocurred fetching the coinapi data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadCurrencies();
  }, []);

  return (
    <div>
      <Table coins={coins} />
    </div>
  );
}

export default CurrencyList;
