import { useState, useCallback } from 'react';
import Header from '../Header';
import FullscreenMenu from '../FullscreenMenu';
import Hero from '../../sections/Hero';
import ProcessGrid from '../../sections/ProcessGrid';
import SystemMetrics from '../../sections/SystemMetrics';
import ClientCases from '../../sections/ClientCases';
import FAQ from '../../sections/FAQ';
import Footer from '../../sections/Footer';
import useLenis from '../../hooks/useLenis';

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useLenis();

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <Header onMenuToggle={toggleMenu} menuOpen={menuOpen} />
      <FullscreenMenu open={menuOpen} onClose={closeMenu} />

      <div className="page-container">
        <Hero />
        <ProcessGrid />
        <SystemMetrics />
        <ClientCases />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
