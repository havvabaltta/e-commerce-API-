import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2>Kullanıcı Paneli</h2>
      <p>Hoşgeldin {user?.username}</p>
    </div>
  );
}

export default UserProfile;