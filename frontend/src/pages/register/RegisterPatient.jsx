// import React, { useState } from 'react';
// import AxiosInstance from '../../components/axios';
// import { toast, ToastContainer } from 'react-toastify'; // Import toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
// import { useNavigate } from 'react-router-dom';

// const RegisterPatient = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     dob: '',
//     gender: '',
//     phone_number: ''
//   });
//   const [loading, setLoading] = useState(false); 
//   const navigatepage = useNavigate()

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading state to true
//     try {
//       const response = await AxiosInstance.post('/api/patients/', formData);
//       if(response.status===201){
//         toast.success(`Patient registered successfully!}`);
//       }
     
//       navigatepage('/registration')
//     } catch (error) {
//       toast.error('Error registering patient.');
//     } finally {
//       setLoading(false); // Set loading state to false after the request
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-center mb-6">Register Patient</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
//           <input
//             type="date"
//             id="dob"
//             name="dob"
//             value={formData.dob}
//             onChange={handleInputChange}
//             className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
//           <select
//             id="gender"
//             name="gender"
//             value={formData.gender}
//             onChange={handleInputChange}
//             className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
//           <input
//             type="text"
//             id="phone_number"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleInputChange}
//             className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
//             disabled={loading} // Disable button if loading
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </div>
//       </form>

//       <ToastContainer /> {/* Toast container to display the notifications */}
//     </div>
//   );
// };

// export default RegisterPatient;

import React, { useState } from 'react';
import AxiosInstance from '../../components/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone_number: ''
  });
  const [loading, setLoading] = useState(false);
  const navigatepage = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, dob, gender, phone_number } = formData;

    // Check if any field is empty
    if (!name || !dob || !gender || !phone_number) {
      toast.error('All fields are required.');
      return false;
    }

    // Name validation (only letters and spaces)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      toast.error('Name should only contain letters and spaces.');
      return false;
    }

    // DOB validation (cannot be a future date)
    const today = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate > today) {
      toast.error('Date of Birth cannot be a future date.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; 
    }
  
    setLoading(true);
    try {
      const response = await AxiosInstance.post('/api/patients/', formData);
      if (response.status === 201) {
        toast.success('Patient registered successfully!', {
          onClose: () => {
            navigatepage('/registration');
          },
          autoClose: 1000
        });
      }
    } catch (error) {
      toast.error('Error registering patient.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Register Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default RegisterPatient;
