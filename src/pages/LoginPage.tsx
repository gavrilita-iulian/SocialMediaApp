import React, { useState } from "react";
import { api } from "../api";
import "../design/LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      // salvam tokenul pentru requesturile viitoare
      sessionStorage.setItem("token", token);

      setMessage("Autentificare reusita!");
      setIsError(false);
    } catch (err: any) {
      console.error("Eroare login:", err);
      setIsError(true);
      setMessage(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Eroare la autentificare"
      );
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Autentificare</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {message && (
          <p className={`form-message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
