import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getCurrentUser, logout } from "../api/AuthApi";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logOutUser = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const updateUser = async () => {
    try {
      await getUser();
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logOutUser, updateUser }}>
      {!loading ? children : <h2>Loading...</h2>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
