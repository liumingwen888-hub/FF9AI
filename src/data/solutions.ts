export const solutions = [
  {
    slug: 'risk-review',
    eyebrow: '线上游戏 / 风险复核',
    title: '异常行为与套利风险自动预警',
    description:
      '把订单记录、结果波动、设备/IP、渠道层级和账户行为整理成可复核证据链，辅助负责人快速定位高风险记录。',
    pains: ['人工复核记录量大，容易漏掉异常组合', '风险判断依据分散在多个系统', '跨市场团队复核口径不统一'],
    outputs: ['高风险记录清单', '异常原因摘要', '设备/IP 与账户行为证据链', '人工复核建议'],
  },
  {
    slug: 'settlement-reconciliation',
    eyebrow: '线上游戏 / 结算对账',
    title: '结算流水、结果数据和报表自动核对',
    description:
      '对接订单记录、结果数据、结算流水和财务报表，自动找差异、生成异常清单，减少人工逐笔核对。',
    pains: ['数据来源多，字段口径不一致', '人工逐笔核对耗时且容易出错', '异常原因定位慢，影响结算周期'],
    outputs: ['差异自动成单', '重复和缺失记录标记', '金额与状态不一致提示', '每日对账摘要'],
  },
  {
    slug: 'operation-signals',
    eyebrow: '线上游戏 / 运营信号',
    title: '用户行为与活动风险自动整理',
    description:
      '分析登录、参与频次、充值提现、活动领取等行为，辅助识别套利、异常获利、沉默流失和人工跟进对象。',
    pains: ['运营信号分散，人工筛选慢', '活动权益风险难以及时发现', '沉默用户和异常用户混在一起'],
    outputs: ['用户分层清单', '活动风险提示', '异常获利线索', '人工跟进优先级'],
  },
];

export const getSolution = (slug: string) => solutions.find((solution) => solution.slug === slug);
