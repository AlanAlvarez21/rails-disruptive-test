import CoinRow from "./CoinRow";
import PropTypes from 'prop-types';


const titles = ["Logo", "Abreviatura", "Nombre", "Precio USD"];

const DataTable = ({ coins }) => {
 
  if (!coins) return <div>no coins</div>

  return (
    <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-black bg-neutral-600 font-large text-black">
                <tr>
                    {titles.map((title, i) => (
                        <td scope="col" className="px-6 py-4" key={i} >{title}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {coins.map((coin) => (
                    <CoinRow key={coin.asset_id} coin={coin} />
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
  );
};


DataTable.propTypes = {
    coins: PropTypes.arrayOf(PropTypes.object).isRequired,
};

  
export default DataTable;