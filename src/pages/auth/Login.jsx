import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AouthContext from "../../context/AuthContext";
import { login } from "../../api/AuthApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const { updateUser } = useContext(AouthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      await updateUser();
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukan Email"
      />
      <br />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassord(e.target.value)}
        placeholder="Masukan Password"
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
