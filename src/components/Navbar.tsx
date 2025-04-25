
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6 px-8 w-full">
      <Link to="/" className="font-lora text-xl font-semibold text-gray-900">
        <span className="text-[#ea384c]">thinq</span>.blog
      </Link>
      <div className="flex gap-6">
        <Link to="/blogs" className="text-gray-600 hover:text-gray-900 transition-colors">
          blogs
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
