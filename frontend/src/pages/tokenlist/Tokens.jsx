import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AxiosInstance from '../../components/axios';

const Tokens = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const fetchTokens = (date) => {
    setLoading(true);
    AxiosInstance.get(`/api/tokens/?token_date=${date}`)
      .then(response => {
        setTokens(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        toast.error('Error fetching tokens. Please try again later.');
      });
  };

  useEffect(() => {
    fetchTokens(selectedDate);
  }, [selectedDate]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Tokens</h1>
        <div className="flex space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={() => navigate('/tokens/new')}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Generate Token
          </button>
        </div>
      </div>

      {/* DataGrid */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : tokens.length === 0 ? (
          <div className="text-center p-4 text-gray-500">No tokens found for the selected date.</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Token Number</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Patient Name</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-700">{token.token_number}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{token.patient?.name || '-'}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{formatDate(token.token_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default Tokens;
