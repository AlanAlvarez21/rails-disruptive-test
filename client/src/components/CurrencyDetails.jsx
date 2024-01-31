import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

function CurrencyDetails() {
  const [currency, setCurrency] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchCurrentCurrency = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/v1/currencies/${id}`);
            if (response.ok) {
              const json = await response.json();
              setCurrency(json)
            } else {
              throw response
            }
          } catch (error) {
            console.error(error);
          }
    }
    fetchCurrentCurrency();
  }, [id])

  return(
    <div>
      <h2>{currency.title}</h2>
      <h2>{currency.name}</h2>
      <Link to="/"> Regresar a tabla </Link>
    </div>
  );
}


export default CurrencyDetails