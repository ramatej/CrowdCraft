import { logoutUser } from "../../Api/logout";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
