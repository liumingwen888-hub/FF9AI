import { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '私有化部署是什么意思？我们的数据安全吗？',
    answer: '私有化部署指将 AI 系统部署在您自己的服务器或内网环境中，所有业务数据、聊天记录、财务数据均不出域，完全由您掌控。我们支持物理机、私有云、混合云等多种部署方式，满足等保、金融合规等安全要求。',
  },
  {
    question: '需要改造我们现有的系统吗？',
    answer: '不需要。FF9 AI 通过 API、数据库连接、文件导入等方式与现有系统对接，不强制替换任何现有软件。无论是 ERP、CRM、客服系统还是 Excel 台账，都可以作为数据源接入，改造一条流程即可开始验证。',
  },
  {
    question: '从沟通到上线，整个周期要多久？',
    answer: '首次沟通只需提供岗位流程描述和脱敏样本，我们评估是否适合 AI 自动化。确认方案后，标准流程的试点部署通常在 2-4 周内完成，复杂流程视数据量和规则复杂度而定。先跑通一条流程，验证效果后再扩展。',
  },
  {
    question: '怎么收费？',
    answer: '采用项目制收费，根据流程复杂度、数据量、部署方式（本地/云端）和后续运维需求综合报价。首次沟通评估免费，确认方案后提供透明报价单，无隐藏费用。',
  },
  {
    question: '首次沟通需要准备什么？',
    answer: '准备三样东西即可：① 想改造的岗位流程（比如"客服质检"或"财务对账"）；② 现在人工怎么处理（步骤、规则、判断标准）；③ 脱敏样本数据（去掉真实客户信息后的示例数据）。不需要后台权限，不需要域名。',
  },
  {
    question: 'AI 会替代人工吗？最终决策谁来做？',
    answer: 'AI 负责识别、标记、生成建议和初稿，所有关键结果保留人工复核环节。最终确认权始终在人手中，负责人可以确认、修改、驳回、导出和留痕。目标是让 AI 处理重复性工作，释放人力去做更高价值的判断和决策。',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0.45, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="bg-white"
      style={{ padding: '15vh 0' }}
    >
      <div className="section-padding">
        <div className="text-label mb-4">[ 常见问题 / 06 ]</div>
        <h2 className="mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)', maxWidth: '700px' }}>
          你可能还想了解
        </h2>
        <p className="mb-16" style={{ color: '#666', maxWidth: '600px' }}>
          以下是我们与企业客户沟通时最常遇到的问题。如果还有其他疑问，直接通过 Telegram 联系即可。
        </p>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="border-b border-[#e5e5e5]"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span
                  className="text-lg pr-8 transition-colors"
                  style={{
                    fontWeight: 500,
                    color: openIndex === i ? '#000' : '#333',
                  }}
                >
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full border border-[#e5e5e5] flex items-center justify-center transition-all duration-300 group-hover:border-black"
                  style={{
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === i ? '300px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p
                  className="pb-6"
                  style={{ color: '#666', fontSize: '15px', lineHeight: 1.7, maxWidth: '600px' }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
