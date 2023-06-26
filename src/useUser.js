export const useUser = () => {
  const isLoggedIn = localStorage.getItem("auth_token") !== null;
  const userType = localStorage.getItem("user_type");
  const userId = localStorage.getItem("user_id");

  const logoutUser = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_id");
  };

  return { isLoggedIn, userType, userId, logoutUser };
};
