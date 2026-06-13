import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    image: '/client-case-1.jpg',
    label: '?? / ??',
    title: '每天对账不再靠人一条条核',
    stat: '6 ?? ? 30 ??',
    desc: '把订单、流水和报表接入后，AI 先自动找差异、列清单、生成说明，财务只需要复核异常项。',
  },
  {
    image: '/client-case-2.jpg',
    label: '?? / ??',
    title: '重复质检先交给 AI 筛一遍',
    stat: '效率提升 300%',
    desc: '把人工抽检、图片识别和台账记录结合起来，先由 AI 标记疑似问题，再由负责人确认。',
  },
  {
    image: '/client-case-3.jpg',
    label: '运营 / 异常处理',
    title: '订单异常不用客服逐单查',
    stat: '2 ?? ? 5 ??',
    desc: '接入订单和物流数据后，AI 自动识别丢件、延迟、地址异常等问题，并生成处理建议。',
  },
];

export default function ClientCases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0.4, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="bg-white"
      style={{ padding: '20vh 0' }}
    >
      <div className="section-padding mb-12">
        <div className="text-label mb-4">[ 可以先从这些场景开始 / 05 ]</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          不是所有工作都适合 AI，先挑最重复的那一类
        </h2>
      </div>

      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: i === 0 ? '3/2' : i === 1 ? '4/3' : '3/4' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'grayscale(80%) contrast(1.1)' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="mono text-label mb-2" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>
                  {item.label}
                </div>
                <div className="text-white text-lg mb-2" style={{ fontWeight: 500 }}>
                  {item.title}
                </div>
                <div className="text-white/90 text-sm mb-2" style={{ fontWeight: 600 }}>
                  {item.stat}
                </div>
                <div className="text-white/70 text-sm" style={{ lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-padding mt-20">
        <div className="border-t border-[#e5e5e5] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl mb-4" style={{ fontWeight: 400 }}>
                AI 先处理重复部分，人负责最后确认
              </h3>
              <p style={{ color: '#666', lineHeight: 1.7 }}>
                我们不建议让 AI 直接替人做最终决策。更稳的方式是：AI 先识别、整理、生成建议，关键结果仍由负责人确认、修改、驳回和留痕。
              </p>
            </div>
            <div>
              <h3 className="text-2xl mb-4" style={{ fontWeight: 400 }}>
                第一次沟通不用开放系统权限
              </h3>
              <p style={{ color: '#666', lineHeight: 1.7 }}>
                你只需要说清楚一条岗位流程，再准备一份脱敏样本。我们先判断能不能自动化、值不值得做，再讨论系统接入和部署方式。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
