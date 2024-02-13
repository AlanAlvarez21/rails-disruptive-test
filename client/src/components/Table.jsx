import { ArrowDownTrayIcon, CalculatorIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  Input,
  Alert,
  Spinner
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { ada, btc, eth } from "../assets";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { API_URL } from "../constants";

const Table = ({ coins, fetchInvestments }) => {
  const [investments, setInvestments] = useState([]);
  const [error, setError] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [open, setOpen] = useState(true);

  const handleInputChange = (event, name) => {
    const { value } = event.target;
    if (!isNaN(value) && parseFloat(value) >= 0) {
      setInputValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const getImage = (asset_id) => {
    const imageMap = {
      ADA: ada,
      BTC: btc,
      ETH: eth,
    };

    return imageMap[asset_id] || null;
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/recaulculate_roi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputValues }),
      });
      const data = await response.json();
      setInvestments(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit data");
    }
  };

  const downloadData = async () => {
    try {
      const csvData = generateCSV();
      const jsonData = JSON.stringify(investments);
      const zip = new JSZip();
      zip.file("data.csv", csvData);
      zip.file("data.json", jsonData);
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "investment_data.zip");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to download data");
    }
  };

  const generateCSV = () => {
    const csv = Papa.unparse(investments);
    return csv;
  };

  const calculateInvestments = async () => {
    try {
      const response = await fetch(`${API_URL}/calculate_investment`, {
        method: "POST",
      });
      const data = await response.json();
      setInvestments(data);
      setError(null);
      setHasFetchedData(true);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to calculate investments");
    }
  };

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        try {
          const response = await calculateInvestments();
          if (response) {
            const data = await response.json();
            setInvestments(data);
            setHasFetchedData(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [fetchInvestments, hasFetchedData]);

  const mergedCoins = coins.map((coin) => {
    const investment = investments.find((inv) => inv.currency === coin.name);
    if (investment) {
      return {
        ...coin,
        final_balance: investment.final_balance?.toFixed(2),
        profit: investment.profit?.toFixed(2),
        initial_balance: investment.initial_balance,
        crypto_total: investment.crypto_total?.toFixed(4),
      };
    } else {
      return coin;
    }
  });

  return (
    <Card className="w-full h-full">
      <Typography variant="h5" className="mb-2" color="blue-gray">
        Tabla de Criptomonedas Disponibles
      </Typography>

      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
          <div>
            <Alert color="yellow" open={open} onClose={() => setOpen(false)}>
              Montos de inverción iniciales vienen de ORIGEN.CVS (BTC: 5%) (ETH:
              4.2%) (ADA: 1%) % = ROI ANUAL
            </Alert>
          </div>
          <div className="flex w-full gap-2 shrink-0 md:w-max">
            <Button
              color="blue"
              className="flex items-center gap-3"
              size="sm"
              onClick={handleSubmit}
            >
              <CalculatorIcon strokeWidth={2} className="w-4 h-4" /> Calcular
              nuevo ROI
            </Button>
            {error && <div className="mt-4 text-red-500">{error}</div>}

            <Button
              color="green"
              className="flex items-center gap-3"
              size="sm"
              onClick={downloadData}
            >
              <ArrowDownTrayIcon strokeWidth={2} className="w-4 h-4" />{" "}
              Descargar .cvs & JSON
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 overflow-scroll">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Logo
                </Typography>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Abreviatura
                </Typography>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Nombre
                </Typography>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Precio USD
                </Typography>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Inversion Inicial $USD
                </Typography>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Acumulado Anual $USD
                </Typography>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Ganancia $USD
                </Typography>
              </th>
              <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Acumulado Anual Crypto
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
          {
             mergedCoins > 0 && (
              <Spinner className="w-12 h-12 mt-6 ml-auto" />
            )
          } 
            {mergedCoins.map(
              ({
                asset_id,
                name,
                price_usd,
                final_balance,
                profit,
                initial_balance,
                crypto_total,
              }) => (
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
                          value={inputValues[name] || ""}
                          onChange={(event) => handleInputChange(event, name)}
                          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent 
                                    placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
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
                      {final_balance ? final_balance : "-"}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {profit ? profit : "-"}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {crypto_total + " " + asset_id}
                    </Typography>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

Table.propTypes = {
  fetchInvestments: PropTypes.string,
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      asset_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price_usd: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Table;
