import React, { useState } from "react";
import { api } from "../api"; // acelasi api folosit si la register/login
import "../design/CreatePostPage.css";// <-- 1. IMPORTĂ FIȘIERUL CSS

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // <-- Statut nou pentru erori

  

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/post/create", { title, body });
      setMessage("Post adaugat cu succes!");
      setTitle("");
      setBody("");
    } catch (err: any) {
      console.error("Eroare la adaugare post:", err);
      const errorMessage = err.response?.data
        ? JSON.stringify(err.response.data)
        : "Eroare la adaugarea postului";
      setError(errorMessage); // Setează mesajul de eroare
    
    }
  };

  return (
    // 2. APLICĂ CLASELE CSS
    <div className="create-post-container">
      <form onSubmit={handleAddPost} className="create-post-form">
        <h2 >Adauga un post nou</h2>

        <input
          type="text"
          placeholder="Titlu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Continutul postarii..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          required
        ></textarea>

        <button type="submit">Publica postarea</button>

        {/* Afișează mesajul de succes sau de eroare */}
        {message && (
          <p className="form-message success">{message}</p>
        )}
        {error && (
          <p className="form-message error">{error}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePostPage;
