import { followUser } from "../api";

type Props = {
  username: string;
  onSuccess?: () => void; // optional, daca vrei refresh dupa
};

export default function FollowButton({ username, onSuccess }: Props) {
  const handleFollow = async () => {
    try {
      await followUser(username);
      console.log("Follow OK");
      onSuccess?.();
    } catch (err) {
      console.error("Follow failed", err);
    }
  };

  return (
    <button className="nav-button" onClick={handleFollow}>
      Follow
    </button>
  );
}
