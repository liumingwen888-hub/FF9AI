import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: '适合先试点的流程', value: '1', suffix: '条起' },
  { label: '不替换现有系统', value: '0', suffix: '改造压力' },
  { label: '支持私有化部署', value: '100', suffix: '%' },
];

const deploymentSteps = [
  {
    title: '你描述现在怎么做',
    desc: '告诉我们人工步骤、判断规则、输入数据和想要的结果。',
    step: '01',
  },
  {
    title: '先看脱敏样本',
    desc: '不用给后台权限，也不用给真实客户数据，先用样本判断是否适合。',
    step: '02',
  },
  {
    title: '整理规则和输出标准',
    desc: '把人工经验、制度、话术和判断标准变成 AI 可以执行的流程。',
    step: '03',
  },
  {
    title: 'AI 自动处理重复部分',
    desc: '自动识别问题、生成建议、整理清单或输出报告。',
    step: '04',
  },
  {
    title: '人工复核关键结果',
    desc: '重要判断仍由负责人确认，AI 不直接替你做最终决策。',
    step: '05',
  },
  {
    title: '确认有效后再接入系统',
    desc: '试点跑通后，再决定是否接入 API、数据库、内网或现有业务系统。',
    step: '06',
  },
];

export default function SystemMetrics() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const valueRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (metricsRef.current) {
      const st = ScrollTrigger.create({
        trigger: metricsRef.current,
        start: 'top 75%',
        onEnter: () => {
          valueRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.fromTo(el, { opacity: 0.45, y: 16 }, { opacity: 1, y: 0, duration: 0.55, delay: i * 0.1 });
          });
        },
        once: true,
      });
      triggers.push(st);
    }

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
      style={{ padding: '20vh 0', background: '#f8f8f8' }}
    >
      <div ref={metricsRef} className="section-padding mb-24">
        <div className="text-label mb-12">[ 为什么适合企业使用 / 03 ]</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e5]">
          {metrics.map((metric, i) => (
            <div key={metric.label} className="bg-[#f8f8f8] p-8 md:p-12">
              <div className="mono text-label mb-4">{metric.label}</div>
              <div className="flex items-baseline gap-2">
                <span
                  ref={(el) => {
                    if (el) valueRefs.current[i] = el;
                  }}
                  style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, lineHeight: 1 }}
                >
                  {metric.value}
                </span>
                {metric.suffix && (
                  <span style={{ fontSize: '24px', color: '#666' }}>{metric.suffix}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={flowRef} className="section-padding">
        <div className="text-label mb-4">[ 怎么接入，不影响现有系统 / 04 ]</div>
        <h2 className="mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)', maxWidth: '760px' }}>
          不用推翻现有系统，先把一件重复工作跑通
        </h2>
        <p className="mb-16" style={{ color: '#666', maxWidth: '660px' }}>
          我们不是让你重新上一套大系统，而是先把某个岗位每天重复处理的工作自动化。验证有效后，再逐步接入真实数据和内部系统。
        </p>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#e5e5e5] hidden md:block" />

          <div className="space-y-0">
            {deploymentSteps.map((step, i) => (
              <div
                key={step.step}
                ref={(el) => {
                  if (el) stepRefs.current[i] = el;
                }}
                className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 border-b border-[#e5e5e5] group cursor-default"
              >
                <div className="flex items-center gap-4 md:w-48 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border border-[#e5e5e5] flex items-center justify-center bg-white transition-all duration-300 group-hover:bg-black group-hover:border-black">
                    <span className="mono text-sm group-hover:text-white transition-colors">{step.step}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl mb-2" style={{ fontWeight: 500 }}>{step.title}</h3>
                  <p style={{ color: '#666', fontSize: '16px' }}>{step.desc}</p>
                </div>

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
