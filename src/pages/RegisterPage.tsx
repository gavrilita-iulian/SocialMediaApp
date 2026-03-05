import React, { useState } from "react";
import { api } from "../api";
import "../design/RegisterPage.css";// <-- 1. IMPORTĂ FIȘIERUL CSS

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      setMessage(response.data);
    } catch (err: any) {
      setMessage(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Eroare la inregistrare"
      );
    }
  };

  return (
    // 5. Aplică clasele CSS și elimină stilurile inline
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Inregistrare</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <button type="submit">Creeaza cont</button>

        {/* 6. Afișează mesajele stilizate */}
        {message && (
          <p className="form-message success">{message}</p>
        )}
        {message && (
          <p className="form-message error">{message}</p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
