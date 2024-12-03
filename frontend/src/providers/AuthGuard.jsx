import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const AuthGuard = ({ children, allowRoles }) => {
  const token = localStorage.getItem("token");
  const user = useUserStore((state) => state.user);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
  allowRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AuthGuard;
