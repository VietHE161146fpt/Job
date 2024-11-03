import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManagerProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "manager") {
      navigate("/");
    }
  }, [user, navigate]);

  return user && user.role === "manager" ? <>{children}</> : null;
};

export default ManagerProtectedRoute;
