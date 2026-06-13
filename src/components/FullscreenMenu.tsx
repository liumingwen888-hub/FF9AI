import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FullscreenMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: '首页', href: '#hero' },
  { label: '能自动化什么', href: '#process' },
  { label: '为什么适合企业', href: '#metrics' },
  { label: '怎么接入', href: '#metrics' },
  { label: '场景案例', href: '#cases' },
  { label: '常见问题', href: '#faq' },
  { label: '联系我们', href: '#contact' },
];

export default function FullscreenMenu({ open, onClose }: FullscreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const wrapper = wrapperRef.current;
    const items = [...itemsRef.current];
    if (!menu || !wrapper) return;

    gsap.set(menu, {
      scaleX: 0,
      pointerEvents: 'none',
      transformOrigin: 'left',
    });
    gsap.set(wrapper, {
      clipPath: 'inset(0% 100% 0% 0%)',
      transformOrigin: 'left',
    });
    gsap.set(items, {
      y: 36,
      opacity: 0,
    });

    return () => {
      animationRef.current?.kill();
      gsap.killTweensOf([menu, wrapper, ...items]);
      document.body.classList.remove('menu-open');
    };
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    const wrapper = wrapperRef.current;
    if (!menu || !wrapper) return;

    animationRef.current?.kill();
    gsap.killTweensOf([menu, wrapper, ...itemsRef.current]);

    if (open) {
      menu.classList.add('open');
      wrapper.classList.add('open');
      document.body.classList.add('menu-open');
      gsap.set(menu, {
        pointerEvents: 'auto',
        transformOrigin: 'left',
      });

      const tl = gsap.timeline();
      animationRef.current = tl;
      tl.to(menu, {
        scaleX: 1,
        duration: 0.75,
        ease: 'expo.out',
      });
      tl.to(
        wrapper,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.5,
          ease: 'power2.out',
        },
        0.18
      );
      tl.to(
        itemsRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.42,
          ease: 'power3.out',
          stagger: 0.045,
        },
        0.28
      );
    } else {
      document.body.classList.remove('menu-open');

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          if (animationRef.current !== tl) return;

          menu.classList.remove('open');
          wrapper.classList.remove('open');
          gsap.set(menu, {
            scaleX: 0,
            pointerEvents: 'none',
          });
          gsap.set(wrapper, {
            clipPath: 'inset(0% 100% 0% 0%)',
          });
          gsap.set(itemsRef.current, {
            y: 36,
            opacity: 0,
          });
          animationRef.current = null;
        },
      });
      animationRef.current = tl;

      tl.to(itemsRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.18,
        stagger: 0.015,
      });
      tl.to(
        wrapper,
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          duration: 0.22,
        },
        0
      );
      tl.to(
        menu,
        {
          scaleX: 0,
          duration: 0.32,
          ease: 'expo.inOut',
        },
        0.08
      );
    }
  }, [open]);

  const handleItemClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  return (
    <div ref={menuRef} className="fullscreen-menu">
      <div ref={wrapperRef} className="menu-items-wrapper flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <a
            key={`${item.href}-${item.label}`}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="menu-item"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item.href);
            }}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
