import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    image: '/gaming-risk-ops.svg',
    label: '线上游戏 / 风险复核',
    title: '异常行为与套利风险自动预警',
    stat: '分钟级预警',
    desc: '整合订单记录、结果波动、设备/IP、渠道层级和账户行为，自动标记高风险记录，输出可复核证据链。',
  },
  {
    image: '/gaming-settlement-flow.svg',
    label: '线上游戏 / 结算对账',
    title: '结算流水、结果数据和报表自动核对',
    stat: '差异自动成单',
    desc: '对接订单记录、结果数据、结算流水和财务报表，自动找差异、生成异常清单，减少人工逐笔核对。',
  },
  {
    image: '/gaming-player-signals.svg',
    label: '线上游戏 / 运营信号',
    title: '用户行为与活动风险自动整理',
    stat: '2 小时 → 5 分钟',
    desc: '分析登录、参与频次、充值提现、活动领取等行为，辅助识别套利、异常获利、沉默流失和人工跟进对象。',
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
        <div className="text-label mb-4">[ 线上游戏后台自动化 / 05 ]</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          先从风控、结算、运营这些高频后台流程开始
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="mono text-label mb-2" style={{ color: 'rgba(255,255,255,0.68)', fontSize: '11px' }}>
                  {item.label}
                </div>
                <div className="text-white text-lg mb-2" style={{ fontWeight: 500 }}>
                  {item.title}
                </div>
                <div className="text-white/90 text-sm mb-2" style={{ fontWeight: 600 }}>
                  {item.stat}
                </div>
                <div className="text-white/75 text-sm" style={{ lineHeight: 1.55 }}>
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
                线上游戏后台的风控、结算和运营不适合完全黑箱决策。更稳的方式是：AI 先识别、整理、生成证据和建议，关键结果仍由负责人确认。
              </p>
            </div>
            <div>
              <h3 className="text-2xl mb-4" style={{ fontWeight: 400 }}>
                适配多语言、多币种、多市场运营团队
              </h3>
              <p style={{ color: '#666', lineHeight: 1.7 }}>
                面向线上游戏运营常见的跨市场后台流程：渠道体系、用户分层、充值提现、活动权益、结果结算和风险复核，都可以先从脱敏样本评估。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
