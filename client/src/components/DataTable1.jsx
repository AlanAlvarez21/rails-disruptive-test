import PropTypes from 'prop-types';

const DataTable1 = ({ investments }) => {
    return (
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Currency</th>
            <th className="px-4 py-2">Final Balance</th>
            <th className="px-4 py-2">Profit</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{investment.currency}</td>
              <td className="border px-4 py-2">{investment.final_balance.toFixed(2)}</td>
              <td className="border px-4 py-2">{investment.profit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

DataTable1.propTypes = {
    investments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

  
export default DataTable1;