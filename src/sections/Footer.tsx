import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="bg-black text-white"
      style={{ padding: '20vh 0 8vh' }}
    >
      <div ref={contentRef} className="section-padding">
        <div className="mb-24">
          <h2
            className="mb-8"
            style={{ fontSize: 'clamp(40px, 8vw, 100px)', fontWeight: 400, lineHeight: 1.05 }}
          >
            发一个流程，<br />我们先判断能不能自动化
          </h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', maxWidth: '560px' }}>
            不用先填长表，也不用开放后台权限。把你现在最耗人工的一条岗位流程发来，我们先判断是否适合 AI 自动化，再讨论方案、周期和部署方式。
          </p>

          <div className="flex flex-wrap gap-6 mb-12">
            <a
              href="https://t.me/roy66888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black text-sm font-medium transition-all duration-200 hover:bg-transparent hover:text-white"
              style={{ border: '1px solid #fff' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram: @roy66888
            </a>
            <a
              href="mailto:contact@ff9.com"
              className="inline-flex items-center gap-3 px-6 py-3 text-white text-sm font-medium transition-all duration-200 hover:bg-white hover:text-black"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
              contact@ff9.com
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div className="mono text-label mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              第一次沟通准备
            </div>
            <ul className="space-y-2" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />想自动化的岗位流程</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />现在人工怎么处理</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />判断规则和输出结果</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />是否已有脱敏样本</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />是否需要私有化部署</li>
            </ul>
          </div>

          <div>
            <div className="mono text-label mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              我们的原则
            </div>
            <ul className="space-y-2" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />不强制替换现有系统</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />不一上来索要后台权限</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />先跑通一条流程</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />关键结果保留人工复核</li>
            </ul>
          </div>

          <div>
            <div className="mono text-label mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              适合的场景
            </div>
            <ul className="space-y-2" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />客服质检和服务审核</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />财务对账和报表整理</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />内部知识库问答</li>
              <li className="flex items-start gap-2"><span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />运营审核和异常处理</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-8">
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
              &copy; {new Date().getFullYear()} FF9 AI
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
              企业 AI 自动化流程定制与私有化部署
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="mono text-label hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
              隐私政策
            </a>
            <a href="#" className="mono text-label hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
