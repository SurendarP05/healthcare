
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">HealthCare+</h1>
        <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/registration" className="hover:text-gray-300">Registration</Link>
          <Link to="/tokens" className="hover:text-gray-300">Tokens</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
