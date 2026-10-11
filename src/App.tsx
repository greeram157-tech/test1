import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import { FavoritesProvider } from './context/FavoritesContext';
import { images } from './data/images';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

/** Immersive backdrop + centred floating website panel. */
function Layout() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <img
          src={images.backdrop}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/65 to-navy/85" />
      </div>

      <div className="mx-auto w-full max-w-panel md:px-6 md:py-8">
        <div className="bg-ivory shadow-panel md:rounded-[28px]">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}
