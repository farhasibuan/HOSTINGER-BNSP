import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import AuthContext from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true }); // mencegah kembali ke dashboard dengan tombol back
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  };

  return (
    <div
      className="d-flex flex-column vh-100 p-4 bg-primary text-white shadow"
      style={{ width: "250px" }}
    >
      <div className="text-center mb-4">
        <h3 className="fw-bold mb-0">PSB Online</h3>
      </div>

      <ul className="nav flex-column mt-3">
        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center px-3 py-2 rounded ${
                isActive ? "bg-white text-primary fw-bold" : "text-white"
              }`
            }
          >
            <FaHome className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard/courses"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center px-3 py-2 rounded ${
                isActive ? "bg-white text-primary fw-bold" : "text-white"
              }`
            }
          >
            <FaCalendarAlt className="me-2" /> Pendaftaran
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center px-3 py-2 rounded ${
                isActive ? "bg-white text-primary fw-bold" : "text-white"
              }`
            }
          >
            <FaUser className="me-2" /> Profile
          </NavLink>
        </li>
      </ul>

      <Button
        onClick={handleLogout}
        variant="danger"
        className="mt-auto w-100 d-flex align-items-center justify-content-center gap-2"
      >
        <FaSignOutAlt /> Logout
      </Button>
    </div>
  );
};

export default Sidebar;
