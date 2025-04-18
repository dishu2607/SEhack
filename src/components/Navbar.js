import { IconHome, IconUser, IconMessage, IconSettings, IconInfoCircle, IconPhoneCall } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const navItems = [
    { id: "home", name: "Home", icon: <IconHome className="h-6 w-6" />, href: "/" },
    { id: "profile", name: "Profile", icon: <IconUser className="h-6 w-6" />, href: "/profile" },
    { id: "messages", name: "Messages", icon: <IconMessage className="h-6 w-6" />, href: "/messages" },
    { id: "about", name: "About Us", icon: <IconInfoCircle className="h-6 w-6" />, href: "/aboutus" },
    { id: "contact", name: "Contact Us", icon: <IconPhoneCall className="h-6 w-6" />, href: "/connect-us" },
    { id: "settings", name: "Settings", icon: <IconSettings className="h-6 w-6" />, href: "/settings" }
  ];

  const handleNavClick = (tabId, href) => {
    setActiveTab(tabId);
    navigate(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-2">
          <div className="flex justify-between">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
                  activeTab === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`}
              >
                <div className="md:mb-1">{item.icon}</div>
                <span className="text-xs md:text-sm">{item.name}</span>
                {activeTab === item.id && (
                  <div className="absolute bottom-0 h-1 w-10 bg-blue-500 rounded-t-md"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
