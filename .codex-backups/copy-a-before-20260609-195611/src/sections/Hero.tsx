import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    if (labelRef.current) {
      tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }
    if (titleRef.current) {
      tl.fromTo(titleRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.35');
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
    }
    if (trustRef.current) {
      tl.fromTo(trustRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    }

    return () => { tl.kill(); };
  }, []);

  // Video hover handlers
  const handleVideoHover = (index: number) => {
    videoRefs.current.forEach((v, i) => {
      if (v) {
        if (i === index) {
          v.play().catch(() => {});
          gsap.to(v, { opacity: 1, duration: 0.6 });
        } else {
          v.pause();
          gsap.to(v, { opacity: 0, duration: 0.6 });
        }
      }
    });
  };

  const handleVideoLeave = () => {
    videoRefs.current.forEach((v, i) => {
      if (v) {
        if (i === 0) {
          v.play().catch(() => {});
          gsap.to(v, { opacity: 1, duration: 0.6 });
        } else {
          v.pause();
          gsap.to(v, { opacity: 0, duration: 0.6 });
        }
      }
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '700px' }}
    >
      {/* Video Backgrounds */}
      <div className="absolute inset-0 z-0">
        {['/video-intelligence-abstract.mp4', '/video-nebula-flow.mp4', '/video-data-stream.mp4'].map((src, i) => (
          <video
            key={src}
            ref={(el) => {
              if (el) videoRefs.current[i] = el;
            }}
            className="hero-video absolute inset-0 w-full h-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
            src={src}
            muted
            loop
            playsInline
            autoPlay={i === 0}
            preload={i === 0 ? 'auto' : 'none'}
            poster={i === 0 ? undefined : '/logo.png'}
          />
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="hero-video-grade absolute inset-0" />
        <div className="hero-video-grain absolute inset-0" />
      </div>

      {/* Content */}
      <div
        className="hero-content relative z-10 flex flex-col justify-end h-full section-padding"
      >
        <div ref={labelRef} className="text-label mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
          [ 系统架构 / 01 ]
        </div>

        <h1
          ref={titleRef}
          className="text-white mb-6"
          style={{ fontSize: 'clamp(40px, 6vw, 100px)', lineHeight: 1.05, fontWeight: 400 }}
        >
          将智能
          <br />
          注入
          <span
            className="hero-text-switch inline-block cursor-pointer border-b-2 border-white/40 transition-all duration-300 hover:border-white"
            onMouseEnter={() => handleVideoHover(1)}
            onMouseLeave={handleVideoLeave}
          >
            流程
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mb-8"
          style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '480px', lineHeight: 1.6 }}
        >
          无需重构现有系统，FF9 AI 从您业务的一个小流程开始，将其转化为完全自主运行的智能节点。支持
          <span
            className="hero-text-switch cursor-pointer border-b border-white/30 transition-all duration-300 hover:border-white"
            onMouseEnter={() => handleVideoHover(2)}
            onMouseLeave={handleVideoLeave}
          >
            私有化部署
          </span>
          ，先试点再扩展。
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4 mb-8">
          <a
            href="https://t.me/roy66888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium transition-all duration-200 hover:bg-black hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            TG 直接沟通
          </a>
          <a href="#process" className="btn-outline border-white text-white hover:bg-white hover:text-black">
            查看岗位流程
          </a>
          <a href="#contact" className="btn-outline border-white/50 text-white/80 hover:bg-white hover:text-black hover:border-white">
            发送脱敏样本评估
          </a>
        </div>

        <div
          ref={trustRef}
          className="flex items-center gap-2"
          style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          首次沟通不用给后台、域名或真实业务库，先用脱敏样本判断是否适合 AI 自动化
        </div>
      </div>
    </section>
  );
}
