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
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const wrapper = wrapperRef.current;
    if (!menu || !wrapper) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(menu, {
      scaleX: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      transformOrigin: 'left',
    });

    tl.to(
      wrapper,
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.6,
        ease: 'power2.inOut',
        transformOrigin: 'left',
      },
      0.3
    );

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      tl.fromTo(
        item,
        {
          y: 36,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
        0.3 + index * 0.05
      );
    });

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    const wrapper = wrapperRef.current;
    if (!menu || !wrapper || !tlRef.current) return;

    if (open) {
      menu.classList.add('open');
      wrapper.classList.add('open');
      document.body.classList.add('menu-open');
      tlRef.current.play();
    } else {
      document.body.classList.remove('menu-open');
      tlRef.current.reverse().then(() => {
        menu.classList.remove('open');
        wrapper.classList.remove('open');
      });
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
