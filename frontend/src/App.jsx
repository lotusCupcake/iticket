import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardPage, LoginPage, RegisterPage } from "./pages";

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
    path: "/",
    element: <DashboardPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
