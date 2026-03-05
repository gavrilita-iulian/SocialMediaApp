import { unfollowUser } from "../api";

type Props = {
  username: string;
  onSuccess?: () => void;
};

export default function UnfollowButton({ username, onSuccess }: Props) {
  const handleUnfollow = async () => {
    try {
      await unfollowUser(username);
      console.log("Unfollow OK");
      onSuccess?.();
    } catch (err) {
      console.error("Unfollow failed", err);
    }
  };

  return (
    <button className="nav-button" onClick={handleUnfollow}>
      Unfollow
    </button>
  );
}
