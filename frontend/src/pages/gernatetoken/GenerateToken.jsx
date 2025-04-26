import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../components/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const GenerateToken = () => {
  const [patientId, setPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [token, setToken] = useState(null);
  const navigatepage = useNavigate()

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await AxiosInstance.get('/api/patients/');
        setPatients(response.data);
      } catch (err) {
        toast.error('Error fetching patients');
      }
    };
    loadPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId) {
      toast.error('Please select a patient.');
      return; 
    }
    try {
      const response = await AxiosInstance.post('/api/tokens/generate_token/', {
        patient_id: patientId,
      });
      setToken(response.data);
      toast.success('Token generated successfully!');
      navigatepage('/tokens')
    } catch (err) {
      toast.error('Error generating token.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Generate Token</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patient" className="block text-sm font-medium text-gray-700">
            Select Patient
          </label>
          <select
            id="patient"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">-- Select --</option>
            {patients.map((patient) => (
              <option key={patient.patient_id} value={patient.patient_id}>
                {patient.name} ({patient.patient_id})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Generate Token
        </button>
      </form>

      {token && (
        <div className="mt-6 p-4 border border-gray-200 rounded bg-gray-50">
          <h3 className="text-lg font-medium mb-2">Generated Token:</h3>
          <p><strong>Patient ID:</strong> {token.patient_id}</p>
          <p><strong>Patient Name:</strong> {token.patient_name}</p>
          <p><strong>Token Date:</strong> {token.token_date}</p>
          <p><strong>Token Number:</strong> {token.token_number}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateToken;
