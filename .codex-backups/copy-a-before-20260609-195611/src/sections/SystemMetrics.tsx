import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: '自动化流程', value: '1,240+', suffix: '' },
  { label: '节点处理速度', value: '< 12', suffix: 'ms' },
  { label: '私有化部署', value: '100', suffix: '%' },
];

const deploymentSteps = [
  {
    title: '现有业务系统',
    desc: '客服、财务、风控、运营等',
    step: '01',
  },
  {
    title: '数据接入层',
    desc: '接口、表格、文档、日志',
    step: '02',
  },
  {
    title: '业务规则与知识库',
    desc: '流程、话术、制度、判断标准',
    step: '03',
  },
  {
    title: 'AI 判断与生成',
    desc: '识别问题、生成建议、输出报告',
    step: '04',
  },
  {
    title: '人工复核后台',
    desc: '关键结果由负责人确认',
    step: '05',
  },
  {
    title: '结果回写与留痕',
    desc: '回写系统、生成记录、保留审计',
    step: '06',
  },
];

export default function SystemMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const valueRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Metrics entrance with counter animation
    if (metricsRef.current) {
      const st = ScrollTrigger.create({
        trigger: metricsRef.current,
        start: 'top 75%',
        onEnter: () => {
          valueRefs.current.forEach((el, i) => {
            if (!el) return;
            const target = metrics[i].value;
            const isNumeric = !isNaN(parseFloat(target.replace(/[^0-9.]/g, '')));

            if (isNumeric && target.includes(',')) {
              const num = 1240;
              gsap.fromTo(
                { val: 0 },
                { val: 0 },
                {
                  val: num,
                  duration: 1.5,
                  ease: 'power2.out',
                  onUpdate: function () {
                    const v = Math.round(this.targets()[0].val);
                    el.textContent = v.toLocaleString() + '+';
                  },
                }
              );
            } else {
              gsap.fromTo(el, { opacity: 0.45, y: 16 }, { opacity: 1, y: 0, duration: 0.55, delay: i * 0.1 });
            }
          });
        },
        once: true,
      });
      triggers.push(st);
    }

    // Flow steps entrance
    stepRefs.current.forEach((step, i) => {
      if (!step) return;
      gsap.fromTo(
        step,
        { opacity: 0.45, x: -18 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          delay: i * 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      style={{ padding: '20vh 0', background: '#f8f8f8' }}
    >
      {/* Metrics Row */}
      <div ref={metricsRef} className="section-padding mb-24">
        <div className="text-label mb-12">[ 系统指标 / 03 ]</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e5]">
          {metrics.map((m, i) => (
            <div key={m.label} className="bg-[#f8f8f8] p-8 md:p-12">
              <div className="mono text-label mb-4">{m.label}</div>
              <div className="flex items-baseline gap-1">
                <span
                  ref={(el) => {
                    if (el) valueRefs.current[i] = el;
                  }}
                  style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, lineHeight: 1 }}
                >
                  {m.value}
                </span>
                {m.suffix && (
                  <span style={{ fontSize: '24px', color: '#666' }}>{m.suffix}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Flow */}
      <div ref={flowRef} className="section-padding">
        <div className="text-label mb-4">[ 部署方式 / 04 ]</div>
        <h2 className="mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)', maxWidth: '700px' }}>
          不是推翻现有系统，而是改造一条岗位流程
        </h2>
        <p className="mb-16" style={{ color: '#666', maxWidth: '600px' }}>
          不强制换系统，不强制上云，可以先用脱敏样本验证，再决定是否接入服务器、内部系统和业务数据。
        </p>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-[#e5e5e5] hidden md:block"
          />

          <div className="space-y-0">
            {deploymentSteps.map((step, i) => (
              <div
                key={step.step}
                ref={(el) => {
                  if (el) stepRefs.current[i] = el;
                }}
                className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 border-b border-[#e5e5e5] group cursor-default"
              >
                {/* Step number */}
                <div className="flex items-center gap-4 md:w-48 flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full border border-[#e5e5e5] flex items-center justify-center bg-white transition-all duration-300 group-hover:bg-black group-hover:border-black"
                  >
                    <span className="mono text-sm group-hover:text-white transition-colors">{step.step}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl mb-2" style={{ fontWeight: 500 }}>{step.title}</h3>
                  <p style={{ color: '#666', fontSize: '16px' }}>{step.desc}</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M10 4L16 10L10 16" stroke="#000" strokeWidth="1.2" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
