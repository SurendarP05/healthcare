
import React from 'react';
import HealthCareImage from '../../assets/healthcare-bg.jpg';

const Home = () => {
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-100 to-white" 
      style={{
        backgroundImage: `url(${HealthCareImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center center'
      }}
    >
      {/* Welcome Text Section */}
      <div className="flex items-center justify-center h-[80vh] bg-opacity-50 bg-black transition-opacity duration-1000 ease-in-out opacity-0 hover:opacity-100">
        <h1 className="text-3xl font-semibold text-white text-center transition-transform duration-500 ease-in-out transform hover:scale-110">
          Welcome to the Healthcare Token System
        </h1>
      </div>

      {/* Additional Content Section */}
      <div className="p-8 bg-white transition-all duration-1000 ease-in-out opacity-0 hover:opacity-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-800 transition-transform duration-500 ease-in-out transform hover:scale-110">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 transition-opacity duration-1000 ease-in-out opacity-0 hover:opacity-100">
            We provide an efficient healthcare token system that helps in managing patient queues and ensuring smooth service at healthcare centers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Token Management */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-700">Token Management</h3>
            <p className="mt-2 text-gray-600">
              Our system generates and manages tokens efficiently for each patient, reducing waiting times and improving service delivery.
            </p>
          </div>

          {/* Real-Time Updates */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-700">Real-Time Updates</h3>
            <p className="mt-2 text-gray-600">
              Receive real-time updates on your token status and queue position directly on your mobile or computer.
            </p>
          </div>

          {/* Patient-Friendly */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-700">Patient-Friendly</h3>
            <p className="mt-2 text-gray-600">
              Our platform is designed with a user-friendly interface to ensure patients have an easy experience with the token system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
