import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../useUser";

export const Authorized = () => {
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
