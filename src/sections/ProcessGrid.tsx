import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processNodes = [
  'INPUT', 'SCAN', 'MATCH', 'CATCH', 'SYNC',
  'LOG', 'CHECK', 'SCORE', 'GEN', 'LOOP',
];

const scenarios = [
  {
    title: '客服质检',
    desc: '自动检查聊天记录、通话文本和服务流程，标记违规话术、高风险对话和需要复核的问题。',
    code: 'QC-001',
  },
  {
    title: '财务对账',
    desc: '自动核对订单、流水、发票和报表，找出差异并生成每日对账清单。',
    code: 'FA-002',
  },
  {
    title: '报表整理',
    desc: '把日报、月报和关键指标整理成管理层能看懂的说明，减少人工复制和汇总。',
    code: 'FR-003',
  },
  {
    title: '内部知识库',
    desc: '把制度、文档、历史案例和常见问题接入 AI，让员工可以直接问、直接查。',
    code: 'KB-004',
  },
  {
    title: '运营审核',
    desc: '自动检查工单、资料、活动规则和异常行为，判断是否需要人工复核。',
    code: 'OP-005',
  },
];

export default function ProcessGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scenariosRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const title = titleRef.current;
    const animatedItems = [...itemRefs.current];
    if (!section || !grid) return;

    const triggers: ScrollTrigger[] = [];
    const gridItems = grid.querySelectorAll('.grid-cell');
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const rotateX = (progress - 0.5) * 15;
        const rotateY = (progress - 0.5) * 8;
        const translateZ = (progress - 0.5) * -100;

        gsap.set(grid, {
          rotateX: `${rotateX}deg`,
          rotateY: `${rotateY}deg`,
          z: translateZ,
          transformPerspective: 1200,
        });

        gridItems.forEach((cell, i) => {
          const row = Math.floor(i / 5);
          const threshold = progress * 8;
          const opacity = row < threshold ? 0.6 : 0.15;
          gsap.set(cell, { opacity });
        });
      },
    });
    triggers.push(st);

    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0.55, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0.35, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          delay: i * 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.trigger === section ||
          t.trigger === title ||
          animatedItems.includes(t.trigger as HTMLDivElement)
        ) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-white"
      style={{ padding: '20vh 0' }}
    >
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          opacity: 0.035,
        }}
      >
        <div
          className="grid h-full"
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => {
            const node = processNodes[i % processNodes.length];
            return (
              <div
                key={i}
                className="grid-cell flex items-center justify-center mono"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.08em',
                  borderRight: '1px solid #f0f0f0',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#ccc',
                }}
              >
                {node}
              </div>
            );
          })}
        </div>
      </div>

      <div ref={titleRef} className="section-padding mb-20 relative z-10">
        <div className="text-label mb-4">[ 哪些工作适合 AI 自动化 / 02 ]</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', maxWidth: '820px' }}>
          先从高频、重复、有规则、能复核的工作开始
        </h2>
        <p className="mt-4" style={{ color: '#666', maxWidth: '660px' }}>
          不需要一上来改造整个公司系统。先挑一条每天都有人重复做的流程，用脱敏样本验证效果，再决定是否接入真实业务系统。
        </p>
      </div>

      <div ref={scenariosRef} className="section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e5e5e5]">
          {scenarios.map((scenario, index) => (
            <div
              key={scenario.code}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              className="bg-white p-8 transition-all duration-300 hover:bg-[#f8f8f8] group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="mono text-label">{scenario.code}</span>
                <div className="w-6 h-6 rounded-full border border-[#e5e5e5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 5H9M5 1L9 5L5 9" stroke="#000" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl mb-3" style={{ fontWeight: 500 }}>{scenario.title}</h3>
              <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.6 }}>{scenario.desc}</p>
            </div>
          ))}

          <div
            ref={(el) => {
              if (el) itemRefs.current[scenarios.length] = el;
            }}
            className="bg-black p-8 flex flex-col justify-between text-white"
          >
            <div>
              <span className="mono text-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
                START HERE
              </span>
            </div>
            <div>
              <p className="mb-4" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>
                如果你不确定哪条流程适合，直接把现在最耗人工的一件事发来，我们先帮你判断能不能自动化。
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium border-b border-white/40 pb-1 hover:border-white transition-colors"
              >
                发一个流程让我们评估
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6H11M6 1L11 6L6 11" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
