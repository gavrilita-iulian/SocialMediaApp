import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import "../design/MyProfilePage.css";

interface Profile {
  id: number;
  description: string;
}

const EditMyProfilePage: React.FC = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await api.get<Profile>("/profile/me");
        const data = response.data;
        setDescription(data.description || "");
      } catch (err: any) {
        console.error("Eroare la preluarea profilului:", err);
        setError("Nu s-a putut incarca profilul.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.put("/profile/edit", { description });
      setSuccess("Profil actualizat cu succes.");
      // optional: navighezi inapoi dupa edit
      // navigate("/my-profile");
    } catch (err: any) {
      console.error("Eroare la salvarea profilului:", err);
      setError("Nu s-a putut salva profilul.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="myprofile-container">Se incarca profilul...</div>;
  }

  return (
    <div className="myprofile-container">
      <div className="myprofile-card">
        <h2 className="myprofile-title">Edit profile</h2>

        {success && <p className="status-message success">{success}</p>}
        {error && <p className="status-message error">{error}</p>}

        <form className="myprofile-form" onSubmit={handleSave}>
          <label className="myprofile-label" htmlFor="description">
            About me:
          </label>
          <textarea
            id="description"
            className="myprofile-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Scrie ceva despre tine..."
          />

          <button
            type="submit"
            className="myprofile-button"
            disabled={saving}
          >
            {saving ? "Se salveaza..." : "Salveaza"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMyProfilePage;
