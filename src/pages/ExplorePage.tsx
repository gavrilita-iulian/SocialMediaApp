import React, { useEffect, useState } from "react";
import { api } from "../api"; // acelasi api folosit si la register/login
import "../design/ExplorePage.css";// <-- 1. IMPORTĂ FIȘIERUL CSS
import PostCard from "../components/PostCard";


interface Post {
  id: number;
  title: string;
  body: string;
  user_id: string;
  createdAt: string; // JSON va trimite data ca un string
}

const ExplorePage: React.FC = () => {
  // Un state pentru a ține lista de postări
  const [posts, setPosts] = useState<Post[]>([]);
  // Un state pentru a ști când se încarcă datele
  const [loading, setLoading] = useState(true);
  // Un state pentru a afișa erori
  const [error, setError] = useState<string | null>(null);

  /**
   * Folosim useEffect pentru a rula o funcție o singură dată,
   * când componenta este "montată" (afișată prima dată).
   */
  useEffect(() => {
    // Definim o funcție asincronă pentru a lua datele
    const fetchPosts = async () => {
      setLoading(true); // Începem încărcarea
      setError(null);

      try {
        // Apelăm endpoint-ul GET /api/post/all
        const response = await api.get<Post[]>("/post/all");
        // Salvăm datele primite în state
        setPosts(response.data);
      } catch (err: any) {
        console.error("Eroare la preluarea postărilor:", err);
        setError("Nu s-au putut încărca postările.");
      } finally {
        // Oprim starea de încărcare, indiferent dacă a fost succes sau eroare
        setLoading(false);
      }
    };

    fetchPosts(); // Apelăm funcția
  }, []); // [] = array-ul de dependențe gol, înseamnă "rulează doar o dată"

  // --- Logica de afișare ---

  // Afișăm un mesaj cât timp se încarcă datele
  if (loading) {
    return <div style={{ padding: "20px" }}>Se încarcă postările...</div>;
  }

  // Afișăm o eroare dacă fetch-ul a eșuat
  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  }

  // Afișăm postările
  return (
  <div className="explore-container">
    <div className="explore-header">
      <h2>Explore</h2>
      
    </div>

    {/* Aici afisam postarile */}
    {posts.length === 0 ? (
      <p className="status-message">There are no posts live at the moment.</p>
    ) : (
      <section className="posts-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            user_id={post.user_id}
            createdAt={post.createdAt}
            />
        ))}
      </section>
    )}
  </div>
);

};

export default ExplorePage;