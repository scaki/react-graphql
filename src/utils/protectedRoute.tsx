import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
