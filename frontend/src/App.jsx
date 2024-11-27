import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, RegisterPage } from "./pages/index";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
