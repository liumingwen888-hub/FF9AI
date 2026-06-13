import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    image: '/client-case-1.jpg',
    label: '金融服务 / 银企对账',
    title: '城商行对账自动化',
    stat: '6h → 30min',
    desc: '日均处理银企对账数据超 15,000 笔，3 名专职人员每日耗时 6 小时人工核对。部署后单日对账处理时间缩短至 30 分钟以内，准确率达 99.9% 以上，原专职人员转岗至客户服务与风险分析岗位。',
  },
  {
    image: '/client-case-2.jpg',
    label: '智能制造 / 生产线质检',
    title: '五金制造质检升级',
    stat: '效率提升 300%',
    desc: '广东某中型五金制造企业，质检长期依赖人工抽检，漏检率高，Excel 台账管理导致库存盘点误差大。接入 AI 视觉检测与传感器数据后，质检效率提升 300%，漏检率下降 85%，库存盘点误差趋近于零。',
  },
  {
    image: '/client-case-3.jpg',
    label: '跨境电商 / 物流异常处理',
    title: '万单级异常自动识别',
    stat: '2h → 5min',
    desc: '日均订单过万，物流异常（丢件、延迟、地址错误）处理全靠人工客服逐单排查，平均响应时间 2 小时。AI 接入物流 API 与订单系统后，异常识别响应时间缩短至 5 分钟，客服人力释放 60%，客户满意度显著提升。',
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
        <div className="text-label mb-4">[ 部署案例 / 05 ]</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          从一条流程开始，逐步扩展
        </h2>
      </div>

      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <div
              key={c.title}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: i === 0 ? '3/2' : i === 1 ? '4/3' : '3/4' }}
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'grayscale(80%) contrast(1.1)' }}
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="mono text-label mb-2" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>
                  {c.label}
                </div>
                <div className="text-white text-lg mb-2" style={{ fontWeight: 500 }}>
                  {c.title}
                </div>
                <div className="text-white/90 text-sm mb-2" style={{ fontWeight: 600 }}>
                  {c.stat}
                </div>
                <div className="text-white/70 text-sm" style={{ lineHeight: 1.5 }}>
                  {c.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust statement */}
      <div className="section-padding mt-20">
        <div className="border-t border-[#e5e5e5] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl mb-4" style={{ fontWeight: 400 }}>
                AI 不直接替人做最终决策
              </h3>
              <p style={{ color: '#666', lineHeight: 1.7 }}>
                所有关键结果保留人工复核环节。AI 负责识别、标记、生成建议，最终确认权始终在人手中。
                负责人可以确认、修改、驳回、导出和留痕。
              </p>
            </div>
            <div>
              <h3 className="text-2xl mb-4" style={{ fontWeight: 400 }}>
                首次沟通零门槛
              </h3>
              <p style={{ color: '#666', lineHeight: 1.7 }}>
                不需要后台权限、不需要域名、不需要真实客户数据。先把岗位流程和想要的结果讲清楚，
                我们用脱敏样本评估是否适合 AI 自动化。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
