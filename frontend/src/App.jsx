import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  AccountsPage,
  AssignIssuesPage,
  CategoriesPage,
  HandlingIssuesPage,
  LoginPage,
  MyTicketsPage,
  ProfilePage,
  RegisterPage,
  UnauthorizedPage,
} from "./pages";
import { AuthGuard, GuestGuard } from "./providers";
import { ROLES } from "./constant/roles";
import useUserStore from "./store/userStore";
import { useEffect } from "react";

const RootRedirect = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  switch (user?.role) {
    case ROLES.ADMIN:
      return <Navigate to="/assign-issues" replace />;
    case ROLES.HANDLER:
      return <Navigate to="/handling-issues" replace />;
    case ROLES.STUDENT:
      return <Navigate to="/my-tickets" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard allowRoles={[ROLES.ADMIN, ROLES.HANDLER, ROLES.STUDENT]}>
        <RootRedirect />
      </AuthGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestGuard>
        <RegisterPage />
      </GuestGuard>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/categories",
    element: (
      <AuthGuard allowRoles={[ROLES.ADMIN]}>
        <CategoriesPage />
      </AuthGuard>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthGuard allowRoles={[ROLES.ADMIN, ROLES.HANDLER, ROLES.STUDENT]}>
        <ProfilePage />
      </AuthGuard>
    ),
  },
  {
    path: "/assign-issues",
    element: (
      <AuthGuard allowRoles={[ROLES.ADMIN]}>
        <AssignIssuesPage />
      </AuthGuard>
    ),
  },
  {
    path: "/handling-issues",
    element: (
      <AuthGuard allowRoles={[ROLES.HANDLER]}>
        <HandlingIssuesPage />
      </AuthGuard>
    ),
  },
  {
    path: "/my-tickets",
    element: (
      <AuthGuard allowRoles={[ROLES.STUDENT]}>
        <MyTicketsPage />
      </AuthGuard>
    ),
  },
  {
    path: "/accounts",
    element: (
      <AuthGuard allowRoles={[ROLES.ADMIN]}>
        <AccountsPage />
      </AuthGuard>
    ),
  },
]);

function App() {
  const fetchProfile = useUserStore((state) => state.fetchProfile);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  return <RouterProvider router={router} />;
}

export default App;
