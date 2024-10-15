import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppProvider } from './contexts';
import { ProtectedRoute } from './components/protected-route';
import { ToggleColorThemeButton } from './components/toggle-color-theme-button';

import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { HomePage } from './pages/home';

export function App() {
  return (
    <>
      <AppProvider>
        <ToastContainer />
        <ToggleColorThemeButton />

        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}
