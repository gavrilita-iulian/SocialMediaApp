import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import "../design/MyProfilePage.css";
import PostCard from "../components/PostCard";
import FollowButton from "../components/FollowButton";
import UnfollowButton from "../components/UnfollowButton";


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

const OtherProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("========== OtherProfilePage fetchData() ==========");
      console.log("username param =", username);

      setLoading(true);
      setError(null);

      if (!username) {
        console.warn("Invalid username param (empty/undefined).");
        setError("Invalid username.");
        setLoading(false);
        console.log("FINALLY-ish: setLoading(false) because username missing");
        return;
      }

      const profileUrl = `/profile/user/${username}`;
      const postsUrl = `/post/user/${username}`;

      console.log("profileUrl =", profileUrl);
      console.log("postsUrl   =", postsUrl);

      try {
        console.log("-> Requesting profile...");
        const profileRes = await api.get<Profile>(profileUrl);
        console.log("<- Profile OK:", profileRes.status, profileRes.data);
        setProfile(profileRes.data);

        console.log("-> Requesting posts...");
        try {
          const postsRes = await api.get<Post[]>(postsUrl);
          console.log("<- Posts OK:", postsRes.status, "count =", postsRes.data?.length);
          setPosts(postsRes.data);
        } catch (e: any) {
          // posts failure should not kill the page
          const status = e?.response?.status;
          const data = e?.response?.data;
          console.error("<- Posts FAILED:", status, data || e?.message || e);
          setPosts([]);
        }
      } catch (err: any) {
        const status = err?.response?.status;
        const data = err?.response?.data;
        console.error("<- Profile FAILED:", status, data || err?.message || err);
        setError("Couldn't load this profile.");
      } finally {
        setLoading(false);
        console.log("FINALLY: setLoading(false)");
        console.log("=================================================");
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return <div className="myprofile-container">Profile loading...</div>;
  }

  if (error) {
    return <div className="myprofile-container error-message">{error}</div>;
  }

  return (
    <div className="myprofile-container">
      <div className="myprofile-layout">
        <div className="myprofile-left">
          <div className="myprofile-card small">
            <h2 className="myprofile-title">@{username}</h2>

            <p className="myprofile-label">Description</p>

            <div className="myprofile-readonly-box">
              {profile && profile.description
                ? profile.description
                : "This user has no description yet."}
            </div>
            {username && (
              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <FollowButton username={username} />
                <UnfollowButton username={username} />
              </div>
)}

          </div>
        </div>

        <div className="myprofile-right">
          <div className="myprofile-posts-wrapper">
            <h3 className="myprofile-posts-title">Posts</h3>

            {posts.length === 0 ? (
              <p className="myprofile-no-posts">This user has no posts yet.</p>
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

export default OtherProfilePage;
