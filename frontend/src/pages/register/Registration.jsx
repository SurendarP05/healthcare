import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AxiosInstance from "../../components/axios";

const Registration = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AxiosInstance.get("api/patients/")
      .then((response) => setPatients(response.data))
      .catch((error) => {
        console.error("Error fetching patients:", error);
        toast.error("Error fetching patients!");
      });
  }, []);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Patient Registration</h1>
        <button
          onClick={() => navigate("/registration/new")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Register Patient
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Gender
              </th>
             
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Date Of Birth
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Age
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.patient_id} className="border-t">
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {patient.patient_id}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {patient.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {patient.gender
                      ? patient.gender.charAt(0).toUpperCase() +
                        patient.gender.slice(1)
                      : ""}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {patient.dob ? formatDate(patient.dob) : ""}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {patient.age}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {patient.phone_number}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-3 text-center text-sm text-gray-500"
                >
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Registration;
