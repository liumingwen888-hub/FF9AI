import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FullscreenMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: '首屏', href: '#hero' },
  { label: '流程节点', href: '#process' },
  { label: '系统指标', href: '#metrics' },
  { label: '部署案例', href: '#cases' },
  { label: '常见问题', href: '#faq' },
  { label: '联系方式', href: '#contact' },
];

export default function FullscreenMenu({ open, onClose }: FullscreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const mouseHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const wrapper = wrapperRef.current;
    if (!menu || !wrapper) return;

    const baseTiming = 0.4;
    const staggerOffset = 0.05;
    const elasticScaleEasing = 'elastic.out(1, 0.5)';
    const clipRevealEasing = 'power2.inOut';

    // Build timeline
    const tl = gsap.timeline({ paused: true });

    // Step 1: Scale the menu background
    tl.to(menu, {
      scaleX: 1,
      duration: 0.8,
      ease: elasticScaleEasing,
      transformOrigin: 'left',
    });

    // Step 2: Reveal the wrapper via clip-path
    tl.to(
      wrapper,
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.6,
        ease: clipRevealEasing,
        transformOrigin: 'left',
      },
      0.3
    );

    // Step 3: Animate each menu item
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      gsap.set(item, {
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 0%',
        perspective: 1000,
        force3D: true,
      });

      tl.fromTo(
        item,
        {
          rotationX: -25,
          rotationY: 15,
          z: -500,
          opacity: 0,
        },
        {
          rotationX: 0,
          rotationY: 0,
          z: 0,
          opacity: 1,
          duration: baseTiming,
          ease: 'power2.out',
        },
        0.3 + index * staggerOffset
      );
    });

    tlRef.current = tl;

    // 3D mouse parallax
    const calculateTiltFromMousePosition = (
      element: HTMLElement,
      mouseX: number,
      mouseY: number,
      intensity = 30
    ) => {
      const box = element.getBoundingClientRect();
      const x = ((mouseY - box.y) - box.height / 2) / (box.height / 2) * intensity;
      const y = (((mouseX - box.x) - box.width / 2) / (box.width / 2)) * intensity * -1;
      return { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!open) return;
      itemsRef.current.forEach((item) => {
        if (!item) return;
        const tilt = calculateTiltFromMousePosition(item, e.clientX, e.clientY, 15);
        item.style.transform = `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(100px)`;
      });
    };

    mouseHandlerRef.current = handleMouseMove;
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
            key={item.href}
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
