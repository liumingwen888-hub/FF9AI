import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface HeaderProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export default function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const onHero = !scrolled && !menuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
      });
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className="header fixed top-0 left-0 right-0 z-[200] flex items-center justify-between transition-all duration-300 opacity-0 -translate-y-4"
      style={{
        height: '72px',
        padding: '0 3vw',
        background: scrolled && !menuOpen ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled && !menuOpen ? 'blur(10px)' : 'none',
      }}
    >
      <a
        href="#"
        className="flex items-center gap-2 tracking-tight transition-colors duration-300"
        style={{ color: menuOpen || onHero ? '#fff' : '#000' }}
      >
        <img
          src={menuOpen || onHero ? '/logo-white.png' : '/logo.png'}
          alt="FF9 AI"
          className="h-8 w-auto"
        />
        <span className="text-lg font-medium">FF9 AI</span>
      </a>

      <button
        onClick={onMenuToggle}
        className="relative flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105"
        style={{
          width: '40px',
          height: '40px',
          background: menuOpen ? '#fff' : '#000',
          color: menuOpen ? '#000' : '#fff',
        }}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ) : (
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M0 1H16M0 5H16M0 9H16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </button>
    </header>
  );
}
