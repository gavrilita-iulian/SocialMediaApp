import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  className?: string; // <-- acceptă clasa trimisă
}
const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (<button className={className} onClick={handleLogout}>Logout</button>);
};

export default LogoutButton;
