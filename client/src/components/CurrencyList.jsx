import React, { useState, useEffect } from 'react'
// import { API_URL } from '../constants'

function CurrencyList() {
  const [currencies, setCurrency] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/currencies')
        if (response.ok) {
          const json = await response.json();
          setCurrency(json)
        }
      } catch (error) {
        setError('An error ocurred fetching the coinapi data')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadCurrencies()
  }, [])

  return(
  <div>
   {currencies.map((currency) => (
        <div key={currency.asset_id} className='currency-container'>
            <h2>{currency.name}</h2>
            <p>{currency.price_usd}</p>
        </div>
   ))}
  </div>
  );
}


export default CurrencyList