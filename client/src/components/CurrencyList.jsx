import { useState, useEffect } from 'react'
import Table from './Table';
// import { API_URL } from '../constants'

function CurrencyList() {
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [coins, setCoins] = useState([]);


  useEffect(() => {
    async function loadCurrencies() {
      try {
        // const response = await fetch('https://railsdisruptivestudiotest.fly.dev/api/v1/currencies')
        // const response = await fetch('http://localhost:3000/api/v1/currencies')

        const response = [
          {
              "asset_id": "BTC",
              "name": "Bitcoin",
              "type_is_crypto": 1,
              "data_quote_start": "2014-02-24T00:00:00.0000000Z",
              "data_quote_end": "2024-01-29T00:00:00.0000000Z",
              "data_orderbook_start": "2014-02-24T17:43:05.0000000Z",
              "data_orderbook_end": "2023-07-07T00:00:00.0000000Z",
              "data_trade_start": "2010-07-17T00:00:00.0000000Z",
              "data_trade_end": "2024-01-30T00:00:00.0000000Z",
              "data_symbols_count": 202052,
              "volume_1hrs_usd": 521495467779352.9,
              "volume_1day_usd": 4939861104542236,
              "volume_1mth_usd": 2388558364594846000,
              "price_usd": 42817.40234470545,
              "id_icon": "4caf2b16-a017-4e26-a348-2cea69c34cba",
              "data_start": "2010-07-17",
              "data_end": "2024-01-30"
          },
          {
              "asset_id": "ETH",
              "name": "Ethereum",
              "type_is_crypto": 1,
              "data_quote_start": "2015-08-08T00:00:00.0000000Z",
              "data_quote_end": "2024-01-29T00:00:00.0000000Z",
              "data_orderbook_start": "2015-08-07T14:50:38.1774950Z",
              "data_orderbook_end": "2023-07-07T00:00:00.0000000Z",
              "data_trade_start": "2015-08-07T00:00:00.0000000Z",
              "data_trade_end": "2024-01-30T00:00:00.0000000Z",
              "data_symbols_count": 162650,
              "volume_1hrs_usd": 85897437731578.8,
              "volume_1day_usd": 7.633311416957049e+21,
              "volume_1mth_usd": 4.9957477399937655e+23,
              "price_usd": 2335.1233983390794,
              "id_icon": "604ae453-3d9f-4ad0-9a48-9905cce617c2",
              "data_start": "2015-08-07",
              "data_end": "2024-01-30"
          },
          {
              "asset_id": "ADA",
              "name": "Cardano",
              "type_is_crypto": 1,
              "data_quote_start": "2017-09-30T00:00:00.0000000Z",
              "data_quote_end": "2024-01-29T00:00:00.0000000Z",
              "data_orderbook_start": "2017-09-29T07:11:06.6463948Z",
              "data_orderbook_end": "2023-07-07T00:00:00.0000000Z",
              "data_trade_start": "2017-10-01T00:00:00.0000000Z",
              "data_trade_end": "2024-01-30T00:00:00.0000000Z",
              "data_symbols_count": 921,
              "volume_1hrs_usd": 33998275.23,
              "volume_1day_usd": 192405424.24,
              "volume_1mth_usd": 41195382450.42,
              "price_usd": 0.5098199990009429,
              "id_icon": "2701173b-1b77-40f2-8693-9659359e225c",
              "data_start": "2017-09-29",
              "data_end": "2024-01-30"
          }
      ]

      // setCurrency(response)
      setCoins(response)

      // if (response.ok) {
      //   const json = await response.json();
      //   setCurrency(json)
      // }
      } catch (error) {
        setError('An error ocurred fetching the coinapi data')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadCurrencies()
  }, [])


  return (
    <div>
        <Table coins={coins} />
    </div>

  );
  
}


export default CurrencyList