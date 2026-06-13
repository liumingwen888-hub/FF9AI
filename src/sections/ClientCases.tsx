import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    image: '/gaming-risk-ops.svg',
    label: '风控 / 注单审核',
    title: '异常注单先由 AI 自动筛出',
    stat: '6 小时 → 30 分钟',
    desc: '接入注单、赔率变化、账户行为和风控规则后，AI 先标记高风险记录、生成证据说明，再交给风控人员复核。',
  },
  {
    image: '/gaming-settlement-flow.svg',
    label: '结算 / 账务核对',
    title: '派奖、流水和报表自动核对',
    stat: '差异自动标记',
    desc: '把投注记录、赛果、派奖流水和财务报表串起来，自动核对差异，输出每日异常清单和复核说明。',
  },
  {
    image: '/gaming-player-signals.svg',
    label: '运营 / 行为信号',
    title: '玩家行为信号自动整理',
    stat: '2 小时 → 5 分钟',
    desc: '自动整理登录、投注、优惠、充值提现等行为信号，辅助识别套利、薅羊毛、沉默流失和需要人工跟进的用户。',
  },
];

export default function ClientCases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0.4, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.08,
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
        <div className="text-label mb-4">[ 博彩内部自动化场景 / 05 ]</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          先从风控、结算、运营这些重复流程开始
        </h2>
      </div>

      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              className="relative overflow-hidden cursor-pointer group bg-black"
              style={{ aspectRatio: index === 0 ? '3/2' : index === 1 ? '4/3' : '3/4' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'grayscale(100%) contrast(1.08)' }}
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
                AI 先处理重复判断，人负责关键复核
              </h3>
              <p style={{ color: '#666', lineHeight: 1.7 }}>
                博彩后台的风控和结算不适合完全黑箱决策。更稳的方式是：AI 先识别、整理、生成证据和建议，关键结果仍由负责人确认。
              </p>
            </div>
            <div>
              <h3 className="text-2xl mb-4" style={{ fontWeight: 400 }}>
                第一次沟通不用开放系统权限
              </h3>
              <p style={{ color: '#666', lineHeight: 1.7 }}>
                你只需要说清楚一条后台流程，再准备一份脱敏样本。我们先判断能不能自动化、值不值得做，再讨论系统接入和部署方式。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
