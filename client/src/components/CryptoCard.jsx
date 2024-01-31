import PropTypes from 'prop-types'; // Importa PropTypes desde la biblioteca prop-types

const CryptoCard = ({ data }) => {
  return (
    <div className="w-1/3 mx-2 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <p className="text-gray-600">{data.asset_id}</p>
      <p className="text-gray-700">Precio USD: ${data.price_usd.toFixed(2)}</p>
      <p className="text-gray-700">Volumen últimas 24 horas: ${data.volume_1day_usd.toFixed(2)}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

// Define las validaciones de tipo para las props
CryptoCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    asset_id: PropTypes.string.isRequired,
    price_usd: PropTypes.number.isRequired,
    volume_1day_usd: PropTypes.number.isRequired,
    // Agrega más validaciones de tipo según sea necesario para otros campos
  }).isRequired,
};

export default CryptoCard;