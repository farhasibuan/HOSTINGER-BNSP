import {  Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
      if (!loading && !user) {
        navigate("/login", { replace: true });
      }
    }, [user, loading, navigate]);

    if (loading) {
      return <h2>Loading...</h2>;
    }
    return user ? <Outlet /> : null;
}

export default ProtectedRoute;
