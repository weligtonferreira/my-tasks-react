import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
