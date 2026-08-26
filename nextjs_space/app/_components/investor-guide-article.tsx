'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { ArrowLeft, Calendar, Tag, Building, Globe, Users, Calculator, Gavel, Shield, Landmark, FileCheck, TrendingUp, Scale, Briefcase, BookOpen } from 'lucide-react';

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

function EnContent() {
  return (
    <>
      <SectionBlock icon={Globe} title="Why Kazakhstan? The Investment Landscape" delay={0.1}>
        <p>
          Kazakhstan is the largest economy in Central Asia and has positioned itself as the region\u2019s principal gateway for foreign capital. 
          Between 2024 and 2026 the government committed to attracting at least USD\u00a0150\u00a0billion in foreign direct investment under 
          its Investment Policy Concept (2024\u20132029), backed by a streamlined \u201cone window\u201d permitting system and a Unified Register of 
          Investors\u2019 Issues to resolve grievances efficiently.
        </p>
        <p>
          The country\u2019s strategic location on the Belt and Road corridor, combined with membership in the Eurasian Economic Union (EAEU) 
          and the World Trade Organisation, means businesses can access a market of over 180\u00a0million consumers across the CIS region. 
          For international investors and English speaking businesses considering expansion into Central Asia, 
          understanding the legal framework is the first and most critical step.
        </p>
      </SectionBlock>

      <SectionBlock icon={Building} title="Setting Up a Business: Corporate Structures" delay={0.12}>
        <p>
          Foreign investors enjoy 100\u00a0% ownership rights in most sectors when establishing a company in Kazakhstan. 
          The Limited Liability Partnership (LLP) is the most common and practical vehicle, offering flexible management 
          structures and limited liability for founders. Other options include Joint Stock Companies (JSCs) and branch or 
          representative offices of foreign legal entities.
        </p>
        <p><strong>Key steps for company registration in Kazakhstan:</strong></p>
        <BulletList items={[
          'Obtain an Individual Identification Number (IIN) \u2014 physical presence in Kazakhstan is required since 2024; powers of attorney are no longer accepted',
          'Secure the appropriate visa \u2014 a C5 Business Immigrant Visa for non-EAEU citizens, or a Temporary Residence Permit for EAEU nationals',
          'Notarise and apostille all corporate documents from the home jurisdiction and have them translated into Kazakh and Russian',
          'Register via the eGov.kz portal or at a Public Service Centre \u2014 online registration is typically completed within 1\u20133 working days',
          'Open a corporate bank account \u2014 banks now conduct rigorous KYC procedures; a clear business plan and a physical office address significantly improve approval chances',
        ]} />
        <p className="mt-3">
          For technology and fintech ventures, registration through the Astana International Financial Centre (AIFC) or 
          the Astana Hub international technology park offers material advantages, including simplified procedures and 
          preferential regulatory treatment.
        </p>
      </SectionBlock>

      <SectionBlock icon={Landmark} title="The AIFC Advantage: English Law in the Heart of Central Asia" delay={0.14}>
        <p>
          The Astana International Financial Centre is a unique jurisdiction within Kazakhstan that operates under 
          English common law \u2014 a critical advantage for international investors accustomed to common-law frameworks. 
          Established in 2018, the AIFC provides its own independent court system staffed by judges from leading 
          common-law jurisdictions, an International Arbitration Centre, and a dedicated financial regulator.
        </p>
        <p><strong>Tax incentives (valid until 2066):</strong></p>
        <BulletList items={[
          '0\u00a0% corporate income tax on qualifying financial and ancillary services',
          '0\u00a0% individual income tax for foreign employees of AIFC participants',
          'Exemptions from VAT, property tax, and land tax for operations within the AIFC territory',
          'Tax-free capital gains on securities listed on the Astana International Exchange (AIX) and on disposal of shares in AIFC-registered entities',
          'Tax-free dividends and interest from AIX-listed instruments',
        ]} />
        <p><strong>Operational benefits:</strong></p>
        <BulletList items={[
          'Online company formation in 1\u20133 days with no minimum share capital requirements',
          'Exemption from Kazakhstan\u2019s general foreign-worker quotas \u2014 AIFC participants can freely hire international talent',
          'Multi-entry visas for up to five years for staff and their families',
          'A FinTech Lab regulatory sandbox for testing innovative products without full compliance obligations',
          'Redomiciliation provisions allowing companies to transfer registration from other jurisdictions while retaining their legal history',
        ]} />
        <p className="mt-3">
          The AIFC Court and the International Arbitration Centre have achieved a 100\u00a0% enforcement rate within Kazakhstan. 
          Dispute resolution clauses referencing the AIFC have been included in over 12,000 commercial contracts, 
          making it the most trusted forum for cross-border deals in the region.
        </p>
      </SectionBlock>

      <SectionBlock icon={Calculator} title="Tax Framework for Foreign Investors" delay={0.16}>
        <p>
          Kazakhstan\u2019s standard corporate income tax rate is 20\u00a0%. Non-residents without a permanent establishment 
          are subject to withholding tax at source. Understanding these rates is essential for effective tax planning:
        </p>
        <BulletList items={[
          'Management, consulting, legal, and financial services \u2014 20\u00a0% withholding tax',
          'Dividends and interest \u2014 15\u00a0% (reduced rates available under double taxation treaties)',
          'Royalties \u2014 15\u00a0% (or 20\u00a0% if the recipient is in a \u201cblacklisted\u201d jurisdiction)',
          'Capital gains \u2014 15\u00a0% (exemptions for securities traded on KASE/AIX under certain conditions)',
          'Branch profits tax \u2014 an additional 15\u00a0% on post-tax net income of permanent establishments',
        ]} />
        <p className="mt-3">
          Kazakhstan has signed over 50 double taxation treaties, covering most major economies. To benefit from 
          reduced treaty rates, non-residents must provide a valid certificate of tax residence to the Kazakh tax agent. 
          The country has also adopted the OECD\u2019s Multilateral Instrument (MLI) with a Principal Purpose Test (PPT), 
          meaning treaty benefits may be denied if obtaining the benefit was one of the principal purposes of an arrangement.
        </p>
        <p>
          In addition, Special Economic Zones (there are 15 across the country) offer further customs and tax incentives 
          in sectors such as manufacturing, technology, and petrochemicals. The Astana Hub provides IT companies with 
          exemptions from corporate income tax, VAT, and social tax.
        </p>
      </SectionBlock>

      <SectionBlock icon={Users} title="Employment Law: Hiring in Kazakhstan" delay={0.18}>
        <p>
          The Labour Code of the Republic of Kazakhstan governs all employment relationships. Foreign companies 
          must be aware of strict requirements around employment contracts, work permits, and local hiring quotas.
        </p>
        <p><strong>Core requirements:</strong></p>
        <BulletList items={[
          'Written employment contracts are mandatory \u2014 verbal agreements have no legal force',
          'Contracts must be in Kazakh and/or Russian and must specify duties, compensation (in KZT), working hours, and termination conditions',
          'Probation periods may not exceed 3 months',
          'Salaries must be paid at least monthly; the minimum wage is set by government decree each year',
        ]} />
        <p><strong>Foreign worker quotas:</strong></p>
        <BulletList items={[
          '70\u00a0% of senior management (CEOs, branch heads) must be Kazakhstan nationals',
          '90\u00a0% of specialist and middle-management positions must be filled locally',
          'Employers must obtain work permits for foreign staff; the employer sponsors the application through the Ministry of Labour',
          'EAEU citizens are exempt from work permit requirements but must register with migration authorities',
        ]} />
        <p className="mt-3">
          Termination is strictly regulated. The Labour Code mandates specific grounds for dismissal (redundancy, 
          misconduct, mutual agreement), and improper termination can result in court-ordered reinstatement and 
          back-pay awards. This is an area where professional legal services in Kazakhstan are indispensable.
        </p>
      </SectionBlock>

      <SectionBlock icon={Gavel} title="Dispute Resolution: Courts, Arbitration, and Enforcement" delay={0.2}>
        <p>
          Kazakhstan is a signatory to the 1958 New York Convention on the Recognition and Enforcement of Foreign 
          Arbitral Awards, providing a solid foundation for international commercial dispute resolution.
        </p>
        <p><strong>Available forums:</strong></p>
        <BulletList items={[
          'Domestic courts \u2014 Kazakhstan\u2019s judicial system operates under civil law; while independence has improved, international investors generally prefer arbitration for complex commercial matters',
          'AIFC Court \u2014 operates under English common law with international judges; judgments carry the same legal force as domestic court decisions and are directly enforceable in Kazakhstan',
          'AIFC International Arbitration Centre (IAC) \u2014 awards are registrable as AIFC Court judgments, bypassing standard domestic recognition procedures and enforceable in 170+ countries under the New York Convention',
          'International arbitration (LCIA, ICC, SIAC) \u2014 parties may agree to any institutional or ad hoc arbitration; enforcement through Kazakh courts under the New York Convention',
        ]} />
        <p className="mt-3">
          For foreign investors, including an AIFC Court or IAC arbitration clause in commercial agreements is 
          a best-practice approach. It combines the familiarity of English-law procedures with reliable enforcement 
          within the Kazakh legal system.
        </p>
      </SectionBlock>

      <SectionBlock icon={Shield} title="Intellectual Property Protection" delay={0.22}>
        <p>
          Intellectual property rights in Kazakhstan are protected under national legislation and reinforced by 
          the country\u2019s membership in the Paris Convention and the Madrid Protocol. The National Institute of 
          Intellectual Property (Kazpatent) administers trademark, patent, and design registrations.
        </p>
        <p><strong>Trademark registration process:</strong></p>
        <BulletList items={[
          'Foreign applicants must engage a licensed Kazakhstani trademark attorney',
          'The application is subject to a formal examination (approximately 1 month) followed by a substantive examination assessing distinctiveness (up to 7 months)',
          'Trademarks are valid for 10 years from the filing date and renewable indefinitely',
          'Non-use for 3 consecutive years may result in cancellation upon a third party\u2019s petition',
          'Multi-class applications are accepted under the Nice Classification system',
        ]} />
        <p className="mt-3">
          Customs authorities actively assist in intercepting counterfeit goods at the border, and trademark owners 
          may register their marks with customs for proactive enforcement. Patent and copyright disputes can be 
          resolved through domestic courts or, where applicable, the AIFC Court.
        </p>
      </SectionBlock>

      <SectionBlock icon={TrendingUp} title="Investment Incentives and Special Economic Zones" delay={0.24}>
        <p>
          The Kazakh government offers a range of incentives to attract investment in priority sectors, including 
          agriculture, manufacturing, technology, renewable energy, and transport infrastructure.
        </p>
        <BulletList items={[
          'Investment preferences under the Entrepreneurial Code \u2014 including tax exemptions, in-kind grants (land, infrastructure), and customs duty relief for imported equipment',
          '15 Special Economic Zones offering sector-specific customs and tax regimes',
          'Astana Hub \u2014 a dedicated international technology park providing tax holidays (CIT, VAT, social tax exemptions) and simplified work-permit processing for IT companies',
          'Kazakh Invest \u2014 a government body providing a \u201csingle window\u201d for all investor services, from permits to grievance resolution',
          'Investment contracts with stability clauses \u2014 protecting investors from adverse legislative changes for the duration of the project',
        ]} />
      </SectionBlock>

      <SectionBlock icon={FileCheck} title="Practical Considerations for International Businesses" delay={0.26}>
        <p>
          Based on our firm\u2019s experience advising international clients entering the Kazakh market, 
          we highlight several practical points:
        </p>
        <BulletList items={[
          'Plan the corporate structure early \u2014 the choice between an LLP, a branch office, and an AIFC entity has significant tax and regulatory implications',
          'Budget for compliance costs \u2014 especially regarding beneficial-ownership disclosure requirements tightened in 2026, AML/KYC procedures, and transfer-pricing documentation',
          'Conduct thorough due diligence \u2014 both legal and commercial \u2014 before entering into partnerships or acquiring local businesses',
          'Ensure all employment relationships are properly documented to avoid reclassification risks and back-tax liabilities',
          'Include an AIFC dispute-resolution clause in all material contracts to ensure access to an English-law forum',
          'Engage English speaking lawyers in Almaty or Astana who understand both the local regulatory landscape and international transaction structures',
        ]} />
      </SectionBlock>

      <SectionBlock icon={BookOpen} title="How Verumpraxis Can Help" delay={0.28}>
        <p>
          <strong>Verumpraxis</strong> is an English speaking law firm based in Almaty, Kazakhstan, providing 
          comprehensive legal services to international investors and businesses operating in Kazakhstan 
          and Central Asia. Our practice areas include:
        </p>
        <BulletList items={[
          'Corporate law and M&A \u2014 company formation, restructuring, due diligence, and transaction support',
          'AIFC law \u2014 registration, licensing, fund structuring, and ongoing compliance',
          'Tax advisory \u2014 structuring, double-taxation treaty analysis, and tax dispute resolution',
          'Employment law \u2014 employment contracts, work-permit applications, and labour dispute representation',
          'Dispute resolution \u2014 representation in domestic courts, the AIFC Court, and international arbitration',
          'Intellectual property \u2014 trademark and patent registration, brand protection, and IP due diligence',
          'Investment support \u2014 incentive applications, investment contracts, and regulatory liaison',
          'Digital law \u2014 data protection compliance, fintech regulation, and crypto-asset advisory',
        ]} />
        <p className="mt-3">
          Our team combines deep knowledge of Kazakh law with fluency in English, Russian, and Kazakh, 
          ensuring seamless communication and a practical, business-oriented approach to every mandate.
        </p>
        <p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 mt-2"
            style={{ color: ACCENT }}
          >
            Request a consultation \u2192
          </Link>
        </p>
      </SectionBlock>
    </>
  );
}

function RuContent() {
  return (
    <>
      <SectionBlock icon={Globe} title="Почему Казахстан? Инвестиционный климат" delay={0.1}>
        <p>
          Казахстан — крупнейшая экономика Центральной Азии и ключевой хаб для привлечения иностранного капитала в регион.
          В рамках Концепции инвестиционной политики (2024–2029) правительство поставило амбициозную цель — привлечь
          не менее 150 млрд долларов США прямых иностранных инвестиций. Для этого была запущена цифровая платформа
          оформления разрешений по принципу «одного окна» и создан Единый реестр вопросов инвесторов для оперативного
          решения проблем.
        </p>
        <p>
          Стратегическое расположение на маршруте «Пояс и путь», членство в ЕАЭС и ВТО открывают доступ к рынку
          свыше 180 млн потребителей по всему СНГ. Для международных компаний и инвесторов, рассматривающих
          экспансию в Центральную Азию, понимание правовой среды — первый и важнейший шаг.
        </p>
      </SectionBlock>

      <SectionBlock icon={Building} title="Регистрация бизнеса: корпоративные структуры" delay={0.12}>
        <p>
          Иностранные инвесторы вправе владеть 100 % долей участия в большинстве отраслей. Наиболее распространённая
          и практичная организационно-правовая форма — ТОО (товарищество с ограниченной ответственностью), обеспечивающее
          гибкую структуру управления и ограниченную ответственность учредителей. Другие варианты — АО (акционерное общество),
          филиал или представительство иностранного юридического лица.
        </p>
        <p><strong>Ключевые этапы регистрации компании:</strong></p>
        <BulletList items={[
          'Получение ИИН — с 2024 года личное присутствие в Казахстане обязательно; оформление по доверенности больше не принимается',
          'Оформление визы — бизнес-виза C5 для граждан стран, не входящих в ЕАЭС, или ВНЖ для граждан ЕАЭС',
          'Нотариальное заверение и апостилирование всех корпоративных документов из страны происхождения с переводом на казахский и русский языки',
          'Регистрация через портал eGov.kz или в ЦОНе — онлайн-регистрация занимает 1–3 рабочих дня',
          'Открытие корпоративного банковского счёта — банки проводят углублённую проверку KYC; наличие бизнес-плана и физического офиса существенно повышает шансы на одобрение',
        ]} />
        <p className="mt-3">
          Для технологических и финтех-компаний регистрация через МФЦА или международный технопарк Astana Hub
          даёт существенные преимущества — упрощённые процедуры и льготный регуляторный режим.
        </p>
      </SectionBlock>

      <SectionBlock icon={Landmark} title="Преимущества МФЦА: английское право в сердце Центральной Азии" delay={0.14}>
        <p>
          Международный финансовый центр «Астана» — уникальная юрисдикция внутри Казахстана, действующая на основе
          английского общего права. Это критически важное преимущество для международных инвесторов, привыкших к системе
          общего права. МФЦА располагает собственным независимым судом с судьями из ведущих юрисдикций общего права,
          Международным арбитражным центром и специализированным финансовым регулятором.
        </p>
        <p><strong>Налоговые льготы (действуют до 2066 года):</strong></p>
        <BulletList items={[
          '0 % КПН на доходы от квалифицированных финансовых и вспомогательных услуг',
          '0 % ИПН для иностранных сотрудников участников МФЦА',
          'Освобождение от НДС, налога на имущество и земельного налога на территории МФЦА',
          'Безналоговый прирост капитала при продаже ценных бумаг, листингованных на AIX, и долей в компаниях, зарегистрированных в МФЦА',
          'Безналоговые дивиденды и проценты от инструментов AIX',
        ]} />
        <p><strong>Операционные преимущества:</strong></p>
        <BulletList items={[
          'Онлайн-регистрация компании за 1–3 дня без требований к минимальному уставному капиталу',
          'Освобождение от общих квот на иностранную рабочую силу — участники МФЦА могут свободно привлекать международные кадры',
          'Многократные визы сроком до пяти лет для сотрудников и членов их семей',
          'Регуляторная песочница FinTech Lab для тестирования инновационных продуктов без полного соблюдения регуляторных требований',
          'Возможность редомициляции — перенос регистрации из других юрисдикций с сохранением юридической истории компании',
        ]} />
        <p className="mt-3">
          Суд МФЦА и Международный арбитражный центр обеспечивают 100 % исполнение решений на территории Казахстана.
          Арбитражные оговорки со ссылкой на МФЦА включены более чем в 12 000 коммерческих договоров, что делает его
          наиболее надёжным форумом для трансграничных сделок в регионе.
        </p>
      </SectionBlock>

      <SectionBlock icon={Calculator} title="Налоговый режим для иностранных инвесторов" delay={0.16}>
        <p>
          Стандартная ставка корпоративного подоходного налога (КПН) в Казахстане составляет 20 %. Нерезиденты
          без постоянного учреждения подлежат налогообложению у источника выплаты. Понимание этих ставок — основа
          эффективного налогового планирования:
        </p>
        <BulletList items={[
          'Управленческие, консалтинговые, юридические и финансовые услуги — 20 % удержание у источника',
          'Дивиденды и проценты — 15 % (пониженные ставки по соглашениям об избежании двойного налогообложения)',
          'Роялти — 15 % (или 20 %, если получатель находится в юрисдикции из «чёрного списка»)',
          'Прирост капитала — 15 % (освобождение для ценных бумаг на KASE/AIX при соблюдении определённых условий)',
          'Налог на доход филиала — дополнительные 15 % на чистую прибыль постоянного учреждения после уплаты КПН',
        ]} />
        <p className="mt-3">
          Казахстан подписал более 50 соглашений об избежании двойного налогообложения, охватывающих большинство
          крупнейших экономик мира. Для применения льготных ставок нерезидент должен предоставить казахстанскому
          налоговому агенту действующий сертификат налогового резидентства. Страна также приняла Многостороннюю
          конвенцию ОЭСР (MLI) с тестом основной цели (PPT) — льготы по соглашениям могут быть отказаны, если
          их получение являлось одной из основных целей сделки.
        </p>
        <p>
          Кроме того, 15 особых экономических зон предлагают дополнительные таможенные и налоговые льготы
          в отраслях — от производства и технологий до нефтехимии. Astana Hub предоставляет IT-компаниям
          освобождение от КПН, НДС и социального налога.
        </p>
      </SectionBlock>

      <SectionBlock icon={Users} title="Трудовое право: найм персонала в Казахстане" delay={0.18}>
        <p>
          Трудовой кодекс Республики Казахстан регулирует все трудовые отношения. Иностранные компании
          обязаны соблюдать строгие требования к трудовым договорам, разрешениям на работу и квотам на
          местных сотрудников.
        </p>
        <p><strong>Основные требования:</strong></p>
        <BulletList items={[
          'Письменный трудовой договор обязателен — устные соглашения юридической силы не имеют',
          'Договор должен быть на казахском и/или русском языке и содержать обязанности, размер оплаты (в тенге), рабочее время и условия расторжения',
          'Испытательный срок — не более 3 месяцев',
          'Заработная плата выплачивается не реже одного раза в месяц; минимальный размер устанавливается правительством ежегодно',
        ]} />
        <p><strong>Квоты на иностранную рабочую силу:</strong></p>
        <BulletList items={[
          '70 % высшего руководства (генеральные директора, руководители филиалов) должны быть гражданами РК',
          '90 % специалистов и менеджеров среднего звена должны быть местными кадрами',
          'Работодатель обязан получить разрешение на работу для иностранных сотрудников через Министерство труда',
          'Граждане ЕАЭС освобождены от разрешений на работу, но обязаны встать на миграционный учёт',
        ]} />
        <p className="mt-3">
          Расторжение трудового договора строго регламентировано. Трудовой кодекс устанавливает исчерпывающий перечень
          оснований увольнения (сокращение, дисциплинарное взыскание, соглашение сторон), а незаконное увольнение
          может повлечь восстановление работника по решению суда и выплату заработной платы за время вынужденного прогула.
          Это область, где квалифицированная юридическая поддержка незаменима.
        </p>
      </SectionBlock>

      <SectionBlock icon={Gavel} title="Разрешение споров: суды, арбитраж и исполнение решений" delay={0.2}>
        <p>
          Казахстан является стороной Нью-Йоркской конвенции 1958 года о признании и приведении в исполнение
          иностранных арбитражных решений, что создаёт прочную основу для международного коммерческого
          разрешения споров.
        </p>
        <p><strong>Доступные форумы:</strong></p>
        <BulletList items={[
          'Суды общей юрисдикции — судебная система Казахстана действует в рамках гражданского права; несмотря на улучшение независимости, международные инвесторы обычно предпочитают арбитраж для сложных коммерческих споров',
          'Суд МФЦА — действует на основе английского общего права с международными судьями; решения имеют силу решений казахстанских судов и подлежат прямому исполнению на территории РК',
          'Международный арбитражный центр МФЦА (МАЦ) — решения регистрируются как акты Суда МФЦА, минуя процедуру признания в национальных судах, и исполняются в 170+ странах по Нью-Йоркской конвенции',
          'Международный арбитраж (LCIA, ICC, SIAC) — стороны могут договориться о любом институциональном или ad hoc арбитраже; исполнение через казахстанские суды по Нью-Йоркской конвенции',
        ]} />
        <p className="mt-3">
          Для иностранных инвесторов включение арбитражной оговорки МФЦА в коммерческие договоры —
          наилучшая практика. Она сочетает привычность процедур английского права с надёжным исполнением
          в рамках казахстанской правовой системы.
        </p>
      </SectionBlock>

      <SectionBlock icon={Shield} title="Защита интеллектуальной собственности" delay={0.22}>
        <p>
          Права интеллектуальной собственности в Казахстане защищены национальным законодательством и подкреплены
          участием страны в Парижской конвенции и Мадридском протоколе. Национальный институт интеллектуальной
          собственности (Казпатент) осуществляет регистрацию товарных знаков, патентов и промышленных образцов.
        </p>
        <p><strong>Процедура регистрации товарного знака:</strong></p>
        <BulletList items={[
          'Иностранные заявители обязаны действовать через лицензированного казахстанского патентного поверенного',
          'Заявка проходит формальную экспертизу (около 1 месяца) и экспертизу по существу на различительную способность (до 7 месяцев)',
          'Товарный знак действует 10 лет с даты подачи заявки и продлевается неограниченное количество раз',
          'Неиспользование в течение 3 лет подряд может повлечь аннулирование по заявлению третьего лица',
          'Принимаются многоклассные заявки по Ниццкой классификации',
        ]} />
        <p className="mt-3">
          Таможенные органы активно содействуют перехвату контрафактной продукции на границе; правообладатели
          могут внести свои знаки в таможенный реестр для проактивной защиты. Патентные и авторско-правовые споры
          разрешаются в национальных судах или, при наличии соответствующей оговорки, в Суде МФЦА.
        </p>
      </SectionBlock>

      <SectionBlock icon={TrendingUp} title="Инвестиционные льготы и особые экономические зоны" delay={0.24}>
        <p>
          Правительство Казахстана предлагает широкий спектр преференций для привлечения инвестиций в приоритетные
          отрасли — сельское хозяйство, обрабатывающую промышленность, технологии, возобновляемую энергетику
          и транспортную инфраструктуру.
        </p>
        <BulletList items={[
          'Инвестиционные преференции по Предпринимательскому кодексу — налоговые освобождения, натурные гранты (земля, инфраструктура), освобождение от таможенных пошлин на импортируемое оборудование',
          '15 особых экономических зон с отраслевыми таможенными и налоговыми режимами',
          'Astana Hub — международный технопарк с налоговыми каникулами (освобождение от КПН, НДС, социального налога) и упрощённым оформлением разрешений на работу для IT-компаний',
          'Kazakh Invest — государственный орган, обеспечивающий «единое окно» для инвесторов: от оформления разрешений до разрешения проблем',
          'Инвестиционные контракты со стабилизационными оговорками — защита от неблагоприятных законодательных изменений на весь период реализации проекта',
        ]} />
      </SectionBlock>

      <SectionBlock icon={FileCheck} title="Практические рекомендации для международного бизнеса" delay={0.26}>
        <p>
          Опираясь на опыт сопровождения международных клиентов, выходящих на казахстанский рынок,
          мы выделяем несколько ключевых практических аспектов:
        </p>
        <BulletList items={[
          'Продумайте корпоративную структуру заранее — выбор между ТОО, филиалом и компанией МФЦА имеет значительные налоговые и регуляторные последствия',
          'Заложите бюджет на комплаенс — особенно с учётом ужесточения требований к раскрытию бенефициарной собственности в 2026 году, процедур AML/KYC и документации по трансфертному ценообразованию',
          'Проведите всестороннюю проверку (due diligence) — как юридическую, так и коммерческую — до начала партнёрства или приобретения местного бизнеса',
          'Обеспечьте надлежащее документирование всех трудовых отношений во избежание рисков переквалификации и доначисления налогов',
          'Включайте арбитражную оговорку МФЦА во все существенные контракты для обеспечения доступа к форуму английского права',
          'Привлекайте юристов со знанием как местного регуляторного ландшафта, так и международных транзакционных структур',
        ]} />
      </SectionBlock>

      <SectionBlock icon={BookOpen} title="Как Verumpraxis может помочь" delay={0.28}>
        <p>
          <strong>Verumpraxis</strong> — юридическая фирма в Алматы, оказывающая комплексные юридические
          услуги международным инвесторам и бизнесу, работающему в Казахстане и Центральной Азии.
          Наши практики включают:
        </p>
        <BulletList items={[
          'Корпоративное право и M&A — регистрация компаний, реструктуризация, due diligence, сопровождение сделок',
          'Право МФЦА — регистрация, лицензирование, структурирование фондов, текущий комплаенс',
          'Налоговое консультирование — структурирование, анализ соглашений об избежании двойного налогообложения, налоговые споры',
          'Трудовое право — трудовые договоры, оформление разрешений на работу, представительство в трудовых спорах',
          'Разрешение споров — представительство в судах, Суде МФЦА и международном арбитраже',
          'Интеллектуальная собственность — регистрация товарных знаков и патентов, защита бренда, IP due diligence',
          'Сопровождение инвестиций — оформление преференций, инвестиционные контракты, взаимодействие с регуляторами',
          'Цифровое право — комплаенс в области персональных данных, финтех-регулирование, консультирование по криптоактивам',
        ]} />
        <p className="mt-3">
          Наша команда сочетает глубокое знание казахстанского права со свободным владением английским,
          русским и казахским языками, обеспечивая бесшовную коммуникацию и практический, ориентированный
          на бизнес подход к каждому проекту.
        </p>
        <p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 mt-2"
            style={{ color: ACCENT }}
          >
            Запросить консультацию →
          </Link>
        </p>
      </SectionBlock>
    </>
  );
}

export default function InvestorGuideArticle() {
  const { locale } = useI18n();
  const isEn = locale === 'en' || locale === 'zh';

  return (
    <section className="gradient-dark" style={{ minHeight: '100vh' }}>
      <div className="mx-auto px-5 sm:px-8 py-16 sm:py-20" style={{ maxWidth: 820 }}>
        {/* Back link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-sm mb-10 sm:mb-12 transition-colors duration-200"
            style={{ color: ACCENT, fontFamily: "'Open Sans', sans-serif" }}
          >
            <ArrowLeft size={16} />
            {isEn ? 'Back to Publications' : '\u041d\u0430\u0437\u0430\u0434 \u043a \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u044f\u043c'}
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
              {isEn ? 'Investment & Corporate' : '\u0418\u043d\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438 \u0438 \u043a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0435 \u043f\u0440\u0430\u0432\u043e'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/40" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              <Calendar size={12} />
              {isEn ? 'May 2026' : '\u041c\u0430\u0439 2026'}
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-[38px] text-white leading-tight mb-5">
            {isEn
              ? 'Legal Guide for Foreign Investors in\u00a0Kazakhstan: Corporate Law, Tax, AIFC, and\u00a0Practical Considerations'
              : '\u042e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0433\u0430\u0439\u0434 \u0434\u043b\u044f \u0438\u043d\u043e\u0441\u0442\u0440\u0430\u043d\u043d\u044b\u0445 \u0438\u043d\u0432\u0435\u0441\u0442\u043e\u0440\u043e\u0432 \u0432\u00a0\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d\u0435: \u043a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0435 \u043f\u0440\u0430\u0432\u043e, \u043d\u0430\u043b\u043e\u0433\u0438, \u041c\u0424\u0426\u0410'}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Open Sans', sans-serif" }}>
            {isEn
              ? 'A comprehensive overview of the legal landscape for international businesses and investors entering Kazakhstan and Central Asia \u2014 from company registration and the AIFC advantage to tax structuring, employment law, dispute resolution, and intellectual property protection.'
              : '\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043d\u044b\u0439 \u043e\u0431\u0437\u043e\u0440 \u043f\u0440\u0430\u0432\u043e\u0432\u043e\u0433\u043e \u043b\u0430\u043d\u0434\u0448\u0430\u0444\u0442\u0430 \u0434\u043b\u044f \u043c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u043e\u0433\u043e \u0431\u0438\u0437\u043d\u0435\u0441\u0430 \u0438 \u0438\u043d\u0432\u0435\u0441\u0442\u043e\u0440\u043e\u0432, \u0432\u0445\u043e\u0434\u044f\u0449\u0438\u0445 \u043d\u0430 \u0440\u044b\u043d\u043e\u043a \u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d\u0430 \u0438 \u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u043e\u0439 \u0410\u0437\u0438\u0438 \u2014 \u043e\u0442 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438 \u0438 \u043f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432 \u041c\u0424\u0426\u0410 \u0434\u043e \u043d\u0430\u043b\u043e\u0433\u043e\u0432\u043e\u0433\u043e \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f, \u0442\u0440\u0443\u0434\u043e\u0432\u043e\u0433\u043e \u043f\u0440\u0430\u0432\u0430, \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u0441\u043f\u043e\u0440\u043e\u0432 \u0438 \u0437\u0430\u0449\u0438\u0442\u044b \u0438\u043d\u0442\u0435\u043b\u043b\u0435\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u043e\u0439 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u0438.'}
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
