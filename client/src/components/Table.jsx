import {
    ArrowDownTrayIcon,
  } from "@heroicons/react/24/outline";
  import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Avatar,
    // Input,
  } from "@material-tailwind/react";
  import PropTypes from 'prop-types';
  import { ada, btc, eth }  from '../assets';
  import { useState } from 'react'
  import DataTable1 from './DataTable1';


  const Table = ({ coins }) => {

    const [investments, setInvestments] = useState([]);
    const [error, setError] = useState(null);

    const getImage = (asset_id) => {
        const imageMap = {
            'ADA': ada,
            'BTC': btc,
            'ETH': eth,
        };
    
        return imageMap[asset_id] || null;
    };
  
    const calculateInvestments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/calculate_investment', {
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
  
    return (
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Tabla de Cryptomonedas Disponibles
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              {/* <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div> */}
              <Button className="flex items-center gap-3" size="sm">
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Descargar .cvs & JSON
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Precio USD
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {coins.map(({ asset_id, name, price_usd }) => (
                <tr key={asset_id} className="hover:bg-blue-200">
                  <td className="p-4 border-b border-blue-gray-50">
                    <Avatar
                      src={getImage(asset_id)}
                      alt={name}
                      size="md"
                      className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
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
                </tr>
              ))}
            </tbody>
          </table>
            <Button color="blue" className="flex mt-5  ml-8 gap-3" size="sm" onClick={calculateInvestments}>
                    <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Calcular ROI
            </Button>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            <DataTable1 investments={investments} />
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
  