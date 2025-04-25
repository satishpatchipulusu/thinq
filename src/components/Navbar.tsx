
import { Link } from "react-router-dom";
import { Library, Archive, Home } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [focusMode, setFocusMode] = useState(false);
  
  return (
    <nav className="flex justify-between items-center py-6 px-8 w-full">
      <Link 
        to="/" 
        onClick={() => setFocusMode(!focusMode)} 
        className="font-lora text-xl font-semibold text-[#ea384c]"
      >
        thinq.blog
      </Link>
      <div className="flex gap-6">
        <Link to="/" className={`${focusMode ? "opacity-0" : ""} text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2`}>
          <Home className="w-4 h-4" />
          home
        </Link>
        <Link to="/library" className={`${focusMode ? "opacity-0" : ""} text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2`}>
          <Library className="w-4 h-4" />
          library
        </Link>
        <Link to="/archive" className={`${focusMode ? "opacity-0" : ""} text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2`}>
          <Archive className="w-4 h-4" />
          archive
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
