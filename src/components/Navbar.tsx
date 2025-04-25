
import { Link } from "react-router-dom";
import { Library, Archive, Home } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [brandText, setBrandText] = useState("thinq");
  
  useEffect(() => {
    const timeout1 = setTimeout(() => {
      let text = "thinq";
      const deleteInterval = setInterval(() => {
        if (text.length > 0) {
          text = text.slice(0, -1);
          setBrandText(text);
        } else {
          clearInterval(deleteInterval);
          let newText = "";
          const typeInterval = setInterval(() => {
            if (newText.length < 4) {
              newText += "blog"[newText.length];
              setBrandText(newText);
            } else {
              clearInterval(typeInterval);
            }
          }, 150);
        }
      }, 2000);

    return () => clearTimeout(timeout1);
  }, []);

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  return (
    <nav className="flex justify-between items-center py-6 px-8 w-full">
      <Link 
        to="/" 
        className="font-lora text-xl font-semibold text-gray-900 cursor-pointer"
        onClick={toggleFocusMode}
      >
        <span className={`${brandText === "blog" ? "text-gray-600" : "text-[#ea384c]"}`}>{brandText}</span>.blog
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
