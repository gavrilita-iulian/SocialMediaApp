import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import "../design/MyProfilePage.css";
import PostCard from "../components/PostCard";

interface Profile {
  id: number;
  description: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  user_id: string;
  createdAt: string;
}

const MyProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // luam profilul si postarile mele in paralel
        const [profileRes, postsRes] = await Promise.all([
          api.get<Profile>("/profile/me"),
          api.get<Post[]>("/post/myposts"),
        ]);

        setProfile(profileRes.data);
        setPosts(postsRes.data);
      } catch (err: any) {
        console.error("Error loading profile data", err);
        setError("Couldn't load your profile. Are you logged in?");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="myprofile-container">Profile loading...</div>;
  }

  if (error) {
    return <div className="myprofile-container error-message">{error}</div>;
  }

  return (
  <div className="myprofile-container">
    
    <div className="myprofile-layout">
      
      {/* COLONA STANGA – CARD PROFIL */}
      <div className="myprofile-left">
        <div className="myprofile-card small">
          <h2 className="myprofile-title">My profile</h2>

          <p className="myprofile-label">Description</p>

          <div className="myprofile-readonly-box">
            {profile && profile.description
              ? profile.description
              : "Nu ai setat nicio descriere inca."}
          </div>

          <button
            className="myprofile-button"
            onClick={() => navigate("/edit-profile")}
          >
            Editeaza profilul
          </button>
        </div>
      </div>

      {/* COLONA DREAPTA – LISTA POSTARI */}
      <div className="myprofile-right">
  <div className="myprofile-posts-wrapper">
    <h3 className="myprofile-posts-title">My posts</h3>

    {posts.length === 0 ? (
      <p className="myprofile-no-posts">You don't have any posts yet.</p>
    ) : (
      <div className="myprofile-posts-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            user_id={post.user_id}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    )}
  </div>
</div>


    </div>
  </div>
);
};

export default MyProfilePage;
