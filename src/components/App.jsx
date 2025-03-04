import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { ThemeProvider } from 'styled-components';
import {
  ThemeSwitcher,
  light,
  dark,
  StyledLightIcon,
  StyledDarkIcon,
  CheckedHand,
  UncheckedHandle,
} from 'styles/Theme.styled';

import PrivateRoutes from './Routes/PrivateRoutes';
import PublicRoutes from './Routes/PublicRoutes';
import Loader from 'components/Loader/Loader';

const LoginPage = lazy(() => import('pages/AuthPage/LoginPage/LoginPage'));
const RegistrationPage = lazy(() =>
  import('pages/AuthPage/RegistrationPage/RegistrationPage'),
);
const HomePage = lazy(() => import('pages/DashboardPage/HomePage/HomePage'));
const StatisticsPage = lazy(() =>
  import('pages/DashboardPage/StatisticsPage/StatisticsPage'),
);
const CurrencyPage = lazy(() =>
  import('pages/DashboardPage/CurrencyPage/CurrencyPage'),
);
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

export const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [isChecked, setIsChecked] = useLocalStorage('themeBtn', true);

  const isDarkTheme = theme === 'dark';

  const handleThemeChange = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
    setIsChecked(!isChecked);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? dark : light}>
      <ThemeSwitcher
        onChange={handleThemeChange}
        checked={!isChecked}
        offColor={'#ffffff'}
        onColor={'#ffffff'}
        handleDiameter={44}
        activeBoxShadow={'null'}
        height={40}
        width={80}
        borderRadius={30}
        checkedHandleIcon={
          <CheckedHand>
            <StyledLightIcon />
          </CheckedHand>
        }
        uncheckedHandleIcon={
          <UncheckedHandle>
            <StyledDarkIcon />
          </UncheckedHandle>
        }
        checkedIcon={false}
        uncheckedIcon={false}
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/currency" element={<CurrencyPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};
