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
    title: '客服质检流程',
    desc: '接入聊天记录，自动识别违规话术、高风险对话和服务问题，生成质检结果与复核清单。',
    code: 'QC-001',
  },
  {
    title: '财务对账流程',
    desc: '接入订单、流水和报表，自动核对差异，标记异常记录，输出每日对账报告。',
    code: 'FA-002',
  },
  {
    title: '财务报表流程',
    desc: '读取日报、月报和关键指标，自动整理波动原因，生成管理层可读报告。',
    code: 'FR-003',
  },
  {
    title: '内部知识库流程',
    desc: '接入制度、文档、代码说明和历史案例，让员工可以直接问问题、查答案、生成初稿。',
    code: 'KB-004',
  },
  {
    title: '运营审核流程',
    desc: '接入工单、资料、活动规则和异常行为，自动判断是否需要人工复核，并生成处理建议。',
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
    if (!section || !grid) return;

    const triggers: ScrollTrigger[] = [];

    // 3D grid tilt effect on scroll
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

        // Subtle fade on cells
        gridItems.forEach((cell, i) => {
          const row = Math.floor(i / 5);
          const threshold = progress * 8;
          const opacity = row < threshold ? 0.6 : 0.15;
          gsap.set(cell, { opacity });
        });
      },
    });
    triggers.push(st);

    // Title entrance
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0.55, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Scenario cards entrance
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
        if (t.trigger === section || t.trigger === titleRef.current) {
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
      {/* 3D Grid Background */}
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

      {/* Section Title */}
      <div ref={titleRef} className="section-padding mb-20 relative z-10">
        <div className="text-label mb-4">[ 流程节点 / 02 ]</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', maxWidth: '800px' }}>
          先挑一条高频、重复、规则清楚、结果可复核的岗位流程
        </h2>
        <p className="mt-4" style={{ color: '#666', maxWidth: '600px' }}>
          客服质检只是第一条容易验证的流程，不是产品边界。跑通后可以扩展到财务、风控、运营、知识库和管理后台。
        </p>
      </div>

      {/* Scenarios Grid */}
      <div ref={scenariosRef} className="section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e5e5e5]">
          {scenarios.map((s, i) => (
            <div
              key={s.code}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="bg-white p-8 transition-all duration-300 hover:bg-[#f8f8f8] group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="mono text-label">{s.code}</span>
                <div className="w-6 h-6 rounded-full border border-[#e5e5e5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 5H9M5 1L9 5L5 9" stroke="#000" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl mb-3" style={{ fontWeight: 500 }}>{s.title}</h3>
              <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}

          {/* CTA Card */}
          <div
            ref={(el) => {
              if (el) itemRefs.current[scenarios.length] = el;
            }}
            className="bg-black p-8 flex flex-col justify-between text-white"
          >
            <div>
              <span className="mono text-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
                MORE
              </span>
            </div>
            <div>
              <p className="mb-4" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>
                以上只是示例。任何高频、重复、规则明确的流程都可以尝试 AI 自动化。
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium border-b border-white/40 pb-1 hover:border-white transition-colors"
              >
                告诉我们你的流程
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
