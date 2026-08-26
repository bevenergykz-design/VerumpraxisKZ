'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { ArrowLeft, Calendar, Tag, Scale, Shield, Landmark, FileCheck, TrendingUp, AlertTriangle, Gavel, BookOpen } from 'lucide-react';

const ACCENT = 'var(--vp-accent)';

function SectionBlock({ icon: Icon, title, children, delay = 0 }: { icon: any; title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="mb-12 sm:mb-14"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center" style={{ backgroundColor: 'rgba(58,154,191,0.12)', borderRadius: 4 }}>
          <Icon size={20} strokeWidth={1.5} style={{ color: ACCENT }} />
        </div>
        <h2 className="font-heading text-xl sm:text-2xl md:text-[28px] text-white">{title}</h2>
      </div>
      <div className="text-[15px] sm:text-base leading-relaxed space-y-4" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Open Sans', sans-serif" }}>
        {children}
      </div>
    </motion.div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RuContent() {
  return (
    <>
      <SectionBlock icon={Scale} title="Правовая природа цифровых активов" delay={0.1}>
        <p>С принятием Закона Республики Казахстан «О цифровых активах» в 2023 году был закреплён правовой статус цифровых активов как имущественных прав в электронной форме, учитываемых с использованием технологий распределённого реестра.</p>
        <p>Законодательно выделяются две ключевые категории:</p>
        <BulletList items={[
          'Обеспеченные цифровые активы \u2014 имеющие базовый актив или право требования',
          'Необеспеченные цифровые активы \u2014 криптовалюты, не обеспеченные активами (включая Bitcoin и Ethereum)',
        ]} />
        <p className="mt-3">Такое разграничение имеет принципиальное значение с точки зрения правового режима их обращения.</p>
      </SectionBlock>

      <SectionBlock icon={Shield} title="Общий режим: ограничения и контроль" delay={0.15}>
        <p>Национальное законодательство Республики Казахстан устанавливает ограничительный подход к обороту необеспеченных цифровых активов. Ключевые положения:</p>
        <BulletList items={[
          'Оборот криптовалют вне регулируемых платформ запрещён',
          'Использование криптоактивов в качестве средства платежа не допускается',
          'Операции с цифровыми активами подлежат контролю в рамках законодательства о противодействии отмыванию доходов (AML/CFT)',
        ]} />
        <p className="mt-3">Таким образом, вне регулируемой инфраструктуры любые операции с криптовалютами фактически находятся в зоне повышенных правовых рисков.</p>
      </SectionBlock>

      <SectionBlock icon={Landmark} title="МФЦА как специализированная юрисдикция" delay={0.1}>
        <p>Особенностью казахстанской модели является наличие отдельного правового режима на базе Международного финансового центра «Астана» (МФЦА). В рамках МФЦА допускается:</p>
        <BulletList items={[
          'Деятельность криптовалютных бирж',
          'Хранение и обращение цифровых активов',
          'Участие инвесторов в операциях с криптоактивами',
          'Лицензирование финтех-компаний',
        ]} />
        <p className="mt-3">Регулирование осуществляется на основе принципов английского права и обеспечивает более гибкий и предсказуемый режим для бизнеса. Для большинства проектов, связанных с цифровыми активами, именно МФЦА является единственным легальным инструментом структурирования деятельности.</p>
      </SectionBlock>

      <SectionBlock icon={FileCheck} title="Лицензирование и комплаенс" delay={0.1}>
        <p>Осуществление деятельности в сфере цифровых активов требует соблюдения строгих регуляторных требований:</p>
        <BulletList items={[
          'Получение лицензии (в зависимости от вида деятельности)',
          'Внедрение процедур KYC/AML',
          'Внутренние политики управления рисками',
          'Раскрытие информации для клиентов и инвесторов',
          'Соответствие требованиям финансового мониторинга',
        ]} />
        <p className="mt-3">Нарушение указанных требований может повлечь как административную, так и уголовную ответственность.</p>
      </SectionBlock>

      <SectionBlock icon={TrendingUp} title="Налогообложение и финансовый контроль" delay={0.1}>
        <p>Налоговый режим в отношении цифровых активов находится в стадии развития, однако уже сейчас применяются следующие подходы:</p>
        <BulletList items={[
          'Доходы от операций с цифровыми активами подлежат налогообложению',
          'Майнинг облагается специальными налогами и сборами',
          'Усиливается контроль за трансграничными операциями и движением средств',
        ]} />
        <p className="mt-3">Особое внимание уделяется прозрачности источников происхождения активов.</p>
      </SectionBlock>

      <SectionBlock icon={AlertTriangle} title="Ключевые риски для бизнеса" delay={0.1}>
        <p>Практика показывает, что основными юридическими рисками являются:</p>
        <BulletList items={[
          'Использование нелицензированных платформ',
          'Некорректная квалификация цифровых активов',
          'Нарушение требований AML/KYC',
          'Привлечение инвестиций без соблюдения регуляторных норм',
          'Работа вне юрисдикции МФЦА при наличии соответствующих требований',
        ]} />
        <p className="mt-3">Во многих случаях риски носят неочевидный характер и проявляются уже на стадии взаимодействия с банками или регуляторами.</p>
      </SectionBlock>

      <SectionBlock icon={TrendingUp} title="Текущие регуляторные тренды" delay={0.1}>
        <p>Регулирование цифровых активов в Казахстане продолжает развиваться в следующих направлениях:</p>
        <BulletList items={[
          'Внедрение цифрового тенге как формы государственной цифровой валюты',
          'Усиление требований к криптовалютным платформам',
          'Развитие регулирования обеспеченных цифровых активов',
          'Интеграция с международными стандартами финансового мониторинга',
        ]} />
        <p className="mt-3">Это свидетельствует о стремлении государства к формированию контролируемой, но конкурентоспособной экосистемы.</p>
      </SectionBlock>

      <SectionBlock icon={BookOpen} title="Практические выводы" delay={0.1}>
        <p>Для бизнеса, работающего с цифровыми активами, в Казахстане применим следующий принцип: <strong className="text-white">легальная деятельность возможна только при правильной правовой структуре и соблюдении регуляторных требований</strong>. На практике это означает:</p>
        <BulletList items={[
          'Необходимость выбора корректной юрисдикции (в большинстве случаев \u2014 МФЦА)',
          'Предварительный правовой анализ модели бизнеса',
          'Выстраивание системы комплаенса',
          'Сопровождение взаимодействия с регуляторами и финансовыми институтами',
        ]} />
      </SectionBlock>

      <SectionBlock icon={Gavel} title="Юридическое сопровождение проектов в сфере цифровых активов" delay={0.1}>
        <p>С учётом сложности и динамичности регулирования, запуск и развитие проектов в сфере цифровых активов требует комплексного юридического подхода. Профессиональное сопровождение позволяет:</p>
        <BulletList items={[
          'Структурировать бизнес-модель с учётом требований законодательства',
          'Минимизировать регуляторные и налоговые риски',
          'Обеспечить соответствие требованиям МФЦА',
          'Подготовить документацию для лицензирования и привлечения инвестиций',
        ]} />
      </SectionBlock>

      {/* CTA block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 p-7 sm:p-10 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(58,154,191,0.12), rgba(42,112,144,0.06))', borderRadius: 4, border: '1px solid rgba(58,154,191,0.2)' }}
      >
        <p className="font-heading text-lg sm:text-xl text-white mb-4">Нужна консультация по цифровым активам?</p>
        <p className="text-sm text-white/50 mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Мы поможем структурировать ваш проект в соответствии с законодательством Казахстана и МФЦА.
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
          style={{ backgroundColor: ACCENT, borderRadius: 4, fontFamily: "'Open Sans', sans-serif" }}
        >
          Связаться с нами
        </a>
      </motion.div>
    </>
  );
}

function EnContent() {
  return (
    <>
      <SectionBlock icon={Scale} title="Legal Nature of Digital Assets" delay={0.1}>
        <p>Following the enactment of the Law of the Republic of Kazakhstan &ldquo;On Digital Assets&rdquo; in 2023, digital assets have been formally recognised as proprietary rights recorded in electronic form by means of distributed ledger technology.</p>
        <p>The legislation distinguishes two principal categories:</p>
        <BulletList items={[
          'Secured digital assets \u2014 those backed by an underlying asset or a right of claim',
          'Unsecured digital assets \u2014 cryptocurrencies not backed by any tangible asset (including Bitcoin and Ethereum)',
        ]} />
        <p className="mt-3">This classification is of fundamental importance, as it determines the applicable legal regime governing the circulation and treatment of each category.</p>
      </SectionBlock>

      <SectionBlock icon={Shield} title="General Regime: Restrictions and Regulatory Oversight" delay={0.15}>
        <p>The national legislation of the Republic of Kazakhstan adopts a restrictive approach to the circulation of unsecured digital assets. The key regulatory provisions are as follows:</p>
        <BulletList items={[
          'The trading of cryptocurrencies outside regulated platforms is prohibited',
          'The use of digital assets as a means of payment is not permitted',
          'All transactions involving digital assets are subject to anti-money laundering and counter-terrorism financing (AML/CFT) controls',
        ]} />
        <p className="mt-3">Accordingly, any cryptocurrency transactions conducted outside the regulated infrastructure carry heightened legal and compliance risks.</p>
      </SectionBlock>

      <SectionBlock icon={Landmark} title="The AIFC as a Specialised Jurisdiction" delay={0.1}>
        <p>A distinctive feature of the Kazakhstani regulatory model is the existence of a separate legal regime within the Astana International Financial Centre (AIFC). The AIFC framework permits the following activities:</p>
        <BulletList items={[
          'Operation of cryptocurrency exchanges',
          'Custody and circulation of digital assets',
          'Participation of investors in digital asset transactions',
          'Licensing of fintech companies',
        ]} />
        <p className="mt-3">The AIFC regulatory framework is grounded in the principles of English common law and provides a more flexible and predictable environment for business. For the majority of projects involving digital assets, the AIFC represents the sole lawful vehicle for structuring operations within Kazakhstan.</p>
      </SectionBlock>

      <SectionBlock icon={FileCheck} title="Licensing and Compliance" delay={0.1}>
        <p>Engaging in digital asset-related activities requires strict adherence to a comprehensive set of regulatory obligations:</p>
        <BulletList items={[
          'Obtaining the requisite licence (depending on the nature of the activity)',
          'Implementation of KYC/AML procedures',
          'Adoption of internal risk management policies',
          'Disclosure obligations towards clients and investors',
          'Compliance with financial monitoring requirements',
        ]} />
        <p className="mt-3">Non-compliance with these requirements may give rise to both administrative and criminal liability.</p>
      </SectionBlock>

      <SectionBlock icon={TrendingUp} title="Taxation and Financial Oversight" delay={0.1}>
        <p>The tax regime applicable to digital assets continues to evolve; however, the following principles are already in effect:</p>
        <BulletList items={[
          'Income derived from digital asset transactions is subject to taxation',
          'Cryptocurrency mining is subject to dedicated levies and charges',
          'Enhanced scrutiny is being applied to cross-border transactions and capital flows',
        ]} />
        <p className="mt-3">Particular emphasis is placed on the transparency and verifiability of the sources from which digital assets originate.</p>
      </SectionBlock>

      <SectionBlock icon={AlertTriangle} title="Key Legal Risks for Businesses" delay={0.1}>
        <p>In practice, the principal legal risks confronting market participants include:</p>
        <BulletList items={[
          'Utilisation of unlicensed trading platforms',
          'Incorrect legal classification of digital assets',
          'Failure to comply with AML/KYC obligations',
          'Raising investment capital in breach of applicable regulatory requirements',
          'Conducting operations outside the AIFC jurisdiction where such registration is required',
        ]} />
        <p className="mt-3">In many instances, these risks are not immediately apparent and only materialise at the stage of engagement with banking institutions or regulatory authorities.</p>
      </SectionBlock>

      <SectionBlock icon={TrendingUp} title="Current Regulatory Trends" delay={0.1}>
        <p>The regulation of digital assets in Kazakhstan continues to develop along the following trajectories:</p>
        <BulletList items={[
          'Introduction of the digital tenge as a form of central bank digital currency (CBDC)',
          'Tightening of regulatory requirements for cryptocurrency platforms',
          'Development of a regulatory framework for secured digital assets',
          'Alignment with international financial monitoring standards',
        ]} />
        <p className="mt-3">These developments reflect the government\u2019s commitment to fostering a controlled yet competitive digital asset ecosystem.</p>
      </SectionBlock>

      <SectionBlock icon={BookOpen} title="Practical Conclusions" delay={0.1}>
        <p>For businesses operating in the digital asset space in Kazakhstan, the overarching principle is clear: <strong className="text-white">lawful activity is only achievable through a properly structured legal framework and full compliance with regulatory requirements</strong>. In practical terms, this entails:</p>
        <BulletList items={[
          'Selecting the appropriate jurisdiction (in most cases, the AIFC)',
          'Conducting a preliminary legal assessment of the business model',
          'Establishing a robust compliance infrastructure',
          'Managing ongoing engagement with regulators and financial institutions',
        ]} />
      </SectionBlock>

      <SectionBlock icon={Gavel} title="Legal Advisory for Digital Asset Projects" delay={0.1}>
        <p>Given the complexity and rapid evolution of the regulatory landscape, the launch and development of digital asset projects demands a comprehensive legal approach. Professional legal counsel enables businesses to:</p>
        <BulletList items={[
          'Structure their business model in accordance with applicable legislation',
          'Mitigate regulatory and tax-related risks',
          'Ensure compliance with AIFC requirements',
          'Prepare licensing documentation and investment materials',
        ]} />
      </SectionBlock>

      {/* CTA block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 p-7 sm:p-10 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(58,154,191,0.12), rgba(42,112,144,0.06))', borderRadius: 4, border: '1px solid rgba(58,154,191,0.2)' }}
      >
        <p className="font-heading text-lg sm:text-xl text-white mb-4">Need advice on digital asset regulation?</p>
        <p className="text-sm text-white/50 mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          We can help you structure your project in compliance with Kazakhstan\u2019s legislation and the AIFC regulatory framework.
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
          style={{ backgroundColor: ACCENT, borderRadius: 4, fontFamily: "'Open Sans', sans-serif" }}
        >
          Contact Us
        </a>
      </motion.div>
    </>
  );
}

export default function DigitalAssetsArticle() {
  const { locale } = useI18n();
  const isEn = locale === 'en';

  return (
    <section className="gradient-dark py-16 sm:py-20 md:py-24">
      <div className="max-w-[820px] mx-auto px-5 sm:px-8">
        {/* Back link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-sm mb-10 sm:mb-12 transition-colors duration-200"
            style={{ color: ACCENT, fontFamily: "'Open Sans', sans-serif" }}
          >
            <ArrowLeft size={16} />
            {isEn ? 'Back to Publications' : 'Назад к публикациям'}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold" style={{ backgroundColor: 'rgba(58,154,191,0.15)', color: ACCENT, borderRadius: 4, fontFamily: "'Open Sans', sans-serif" }}>
              <Tag size={12} />
              IT/IP
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/40" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              <Calendar size={12} />
              {isEn ? 'April 2026' : 'Апрель 2026'}
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-[38px] text-white leading-tight mb-5">
            {isEn
              ? 'Digital Asset Regulation in\u00a0Kazakhstan: Legal Framework, Risks and\u00a0Opportunities for\u00a0Business'
              : 'Регулирование цифровых активов в\u00a0Казахстане: правовой режим, риски и\u00a0возможности для\u00a0бизнеса'}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Open Sans', sans-serif" }}>
            {isEn
              ? 'The development of Kazakhstan\u2019s digital asset market has been accompanied by the establishment of a comprehensive regulatory framework and heightened supervisory oversight. At present, the Republic of Kazakhstan offers one of the most formalised regulatory models in the region, combining restrictions on the free circulation of crypto-assets with legitimate avenues for their use through specialised jurisdictions.'
              : 'Развитие рынка цифровых активов в Казахстане сопровождается формированием комплексной нормативной базы и усилением контроля со стороны регуляторов. На текущий момент Республика Казахстан предлагает одну из наиболее формализованных моделей регулирования в регионе, сочетающую ограничения на свободный оборот криптоактивов с возможностями для их легального использования через специализированные юрисдикции.'}
          </p>
          <p className="text-sm sm:text-base leading-relaxed mt-3" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Open Sans', sans-serif" }}>
            {isEn
              ? 'This review has been prepared to provide a systematic analysis of the prevailing legal regime and to identify the principal risks and opportunities for market participants.'
              : 'Настоящий обзор подготовлен с целью системного анализа действующего правового режима, а также выявления ключевых рисков и возможностей для участников рынка.'}
          </p>
          {/* Divider */}
          <div className="mt-8" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(58,154,191,0.25), transparent)' }} />
        </motion.div>

        {/* Article body */}
        {isEn ? <EnContent /> : <RuContent />}
      </div>
    </section>
  );
}
