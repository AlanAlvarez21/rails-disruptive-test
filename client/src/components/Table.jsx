import {
    ArrowDownTrayIcon,
    CalculatorIcon,
  } from "@heroicons/react/24/outline";
  import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Avatar,
    Input
  } from "@material-tailwind/react";
  import PropTypes from 'prop-types';
  import { ada, btc, eth }  from '../assets';
  import { useEffect, useState } from 'react'

  const Table = ({ coins }) => {
    const [investments, setInvestments] = useState([]);
    const [error, setError] = useState(null);
    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (event, name) => {
      const { value } = event.target;
      setInputValues(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    const getImage = (asset_id) => {
        const imageMap = {
            'ADA': ada,
            'BTC': btc,
            'ETH': eth,
        };
    
        return imageMap[asset_id] || null;
    };

    const handleSubmit = async () => {
      try {
        const response = await fetch('http://localhost:3000/recaulculate_roi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...inputValues }),
        });
        const data = await response.json();
        setInvestments(data);
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
      
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to submit data');
      }
    };

    const downloadData = async () => {
      console.log('hola')
    }
  
  const calculateInvestments = async () => {
    try {
      const response = await fetch('http://localhost:3000/calculate_investment', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to calculate investments');
      }
      const data = await response.json();
      setInvestments(data);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to calculate investments');
    }
  };

  useEffect(() => {
    calculateInvestments();
  }, [])

   const mergedCoins = coins.map((coin) => {
    const investment = investments.find((inv) => inv.currency === coin.name);
    if (investment) {
      return {
        ...coin,
        final_balance: investment.final_balance.toFixed(2),
        profit: investment.profit.toFixed(2),
        initial_balance: investment.initial_balance, 
      };
    } else {
      return coin;
    }
  });
  
    return (
      <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Tabla de Criptomonedas Disponibles
              </Typography>
            </div>
            <div className="flex w-full gap-2 shrink-0 md:w-max">
              <Button color="blue" className="flex items-center gap-3" size="sm" onClick={handleSubmit}>
                    <CalculatorIcon strokeWidth={2} className="w-4 h-4" /> Calcular nuevo ROI
              </Button>
            {error && <div className="mt-4 text-red-500">{error}</div>}

              <Button color="green" className="flex items-center gap-3" size="sm" onClick={downloadData}>
                <ArrowDownTrayIcon strokeWidth={2} className="w-4 h-4" /> Descargar .cvs & JSON
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 overflow-scroll">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Logo
                  </Typography>
                </th>
                <th
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Abreviatura
                  </Typography>
                </th>
                <th
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Nombre
                  </Typography>
                </th>
                <th
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Precio USD
                  </Typography>
                </th>
                <th
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Inversion Inicial:
                  </Typography>
                </th>
                <th
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Monto Total Final:
                  </Typography>
                </th>
                <th
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Ganancia $USD
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {mergedCoins.map(({ asset_id, name, price_usd, final_balance, profit, initial_balance }) => (
                <tr key={asset_id} className="hover:bg-blue-200">
                  <td className="p-4 border-b border-blue-gray-50">
                    <Avatar
                      src={getImage(asset_id)}
                      alt={name}
                      size="md"
                      className="object-contain p-1 border border-blue-gray-50 bg-blue-gray-50/50"
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {asset_id}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {price_usd}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-full md:w-72">
                    <div className="w-72">
                              <Input
                              type="number"
                              placeholder={initial_balance}
                              value={inputValues[name] || ''}
                              onChange={(event) => handleInputChange(event, name)}
                              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                              labelProps={{ className: "hidden" }}
                              containerProps={{ className: "min-w-[100px]" }}
                            />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {final_balance ? final_balance : '-'}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {profit ? profit : '-'}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>          
        </CardBody>
      </Card>
    );
  }
  
  Table.propTypes = {
      coins: PropTypes.arrayOf(PropTypes.shape({
        asset_id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price_usd: PropTypes.number.isRequired,
      })).isRequired,
  };
  
  export default Table;


