import PropTypes from 'prop-types';
import { ada, btc, eth }  from '../assets'

const CoinRow = ({ coin }) => {

const getImage = (asset_id) => {
    const imageMap = {
        'ADA': ada,
        'BTC': btc,
        'ETH': eth,
    };

    return imageMap[asset_id] || null;
};

return (
    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
    <td className="whitespace-nowrap px-6 py-4">
       <img
       src={getImage(coin.asset_id)}
       style={{ width: "3%", marginRight: "3%" }}
       />
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-medium">{coin.asset_id}</td>
      
      <td className="whitespace-nowrap px-6 py-4"> <span>{coin.name}</span> </td>
      <td className="whitespace-nowrap px-6 py-4">${coin.price_usd.toLocaleString()}</td>
    </tr>
  );
};

CoinRow.propTypes = {
    coin: PropTypes.shape({
      asset_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price_usd: PropTypes.number.isRequired,
    }).isRequired,
};

export default CoinRow;


