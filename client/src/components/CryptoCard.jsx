import PropTypes from 'prop-types'; // Importa PropTypes desde la biblioteca prop-types

const CryptoCard = ({ data }) => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <p className="text-gray-600">{data.asset_id}</p>
      <p className="text-gray-700">Precio USD: ${data.price_usd.toFixed(2)}</p>
    </div>
  );
};

CryptoCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    asset_id: PropTypes.string.isRequired,
    price_usd: PropTypes.number.isRequired,
  }).isRequired,
};

export default CryptoCard;