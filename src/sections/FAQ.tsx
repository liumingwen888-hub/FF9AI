import { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '什么样的工作适合先做 AI 自动化？',
    answer: '最适合的是高频、重复、规则相对明确、结果可以人工复核的工作。比如客服质检、财务对账、报表整理、运营审核、内部知识库问答等。',
  },
  {
    question: '需要改掉我们现在用的系统吗？',
    answer: '不需要。我们通常先从一条流程开始，用 API、数据库连接、文件导入或人工上传样本的方式接入，不强制替换 ERP、CRM、客服系统或 Excel 台账。',
  },
  {
    question: '我们的数据安全吗？可以私有化部署吗？',
    answer: '可以。FF9 AI 支持部署在你自己的服务器、私有云或内网环境中。第一次评估也不需要真实客户数据，可以先用脱敏样本判断是否适合自动化。',
  },
  {
    question: '从沟通到试点上线大概多久？',
    answer: '如果流程边界清楚、样本准备充分，一条标准流程通常可以在 2-4 周内完成试点。复杂流程会根据数据量、系统接入和规则复杂度调整周期。',
  },
  {
    question: '第一次沟通需要准备什么？',
    answer: '准备三样东西就够了：想改造的岗位流程、现在人工怎么处理、脱敏后的样本数据。如果暂时没有样本，也可以先把流程讲清楚。',
  },
  {
    question: 'AI 会不会直接替员工做决定？',
    answer: '我们的建议是不要。AI 更适合先做识别、整理、标记、生成建议和初稿。关键结果保留人工复核，最终确认权仍在负责人手里。',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
      className="bg-white"
      style={{ padding: '15vh 0' }}
    >
      <div className="section-padding">
        <div className="text-label mb-4">[ 常见问题 / 06 ]</div>
        <h2 className="mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)', maxWidth: '700px' }}>
          你可能还想确认这些事
        </h2>
        <p className="mb-16" style={{ color: '#666', maxWidth: '600px' }}>
          如果你不确定自己的流程是否适合，直接把流程发来，我们会先判断，不会一上来让你接系统或给权限。
        </p>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
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
