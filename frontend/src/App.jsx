import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AccountsPage,
  AssignIssuesPage,
  CategoriesPage,
  HandlingIssuesPage,
  LoginPage,
  MyTicketsPage,
  ProfilePage,
  RegisterPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/assign-issues",
    element: <AssignIssuesPage />,
  },
  {
    path: "/handling-issues",
    element: <HandlingIssuesPage />,
  },
  {
    path: "/my-tickets",
    element: <MyTicketsPage />,
  },
  {
    path: "/accounts",
    element: <AccountsPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
