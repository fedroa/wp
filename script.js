// ---- Nav scroll state + mobile toggle ----
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
}));

// ---- Theme toggle (persists only for this session, no localStorage) ----
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.textContent = isDark ? 'Dark mode' : 'Light mode';
});

// ---- Scroll reveal for sections ----
const revealTargets = document.querySelectorAll('.section');
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ---- EN / 中文 language toggle ----
const translations = {
  nav_about:{en:"About",zh:"关于"},
  nav_education:{en:"Education",zh:"教育背景"},
  nav_skills:{en:"Skills",zh:"技能"},
  nav_work:{en:"Work",zh:"作品"},
  nav_experience:{en:"Experience",zh:"工作经历"},
  nav_certificates:{en:"Certificates",zh:"证书"},
  nav_contact:{en:"Contact",zh:"联系方式"},
  eyebrow:{en:"Quantitative Analyst",zh:"量化分析师"},
  hero_h1:{en:'Fedro Andreanto<br>turns raw data into decisions worth<br><em>trusting.</em>',
           zh:'Fedro Andreanto<br>将原始数据转化为<br><em>值得信赖</em>的决策。'},
  hero_sub:{en:"A mathematician working across statistical modeling, financial analytics, and market research. Currently pairing that with a Master's in International Business to bring quantitative rigor to business and financial decisions.",
            zh:"一位拥有数学背景、专注统计建模、金融分析与市场研究的分析师。目前正攻读国际商务硕士学位，力求将量化方法更紧密地融入商业与金融决策。"},
  btn_work:{en:"See the work",zh:"查看作品"},
  btn_resume:{en:"Download résumé",zh:"下载简历"},
  hero_location:{en:"Wuhan, China",zh:"中国 · 武汉"},
  hero_open:{en:"Open to relocation &amp; remote",zh:"可接受异地及远程工作"},
  portrait_tag:{en:"Wuhan, China",zh:"中国 · 武汉"},
  section_about:{en:"About",zh:"关于我"},
  section_education:{en:"Education",zh:"教育背景"},
  section_skills:{en:"Skills &amp; Tools",zh:"技能与工具"},
  section_work:{en:"Selected Work",zh:"精选作品"},
  section_experience:{en:"Experience",zh:"工作经历"},
  section_certificates:{en:"Certificates &amp; Awards",zh:"证书与荣誉"},
  section_contact:{en:"Let's talk",zh:"保持联系"},
  about_lede:{en:"With a mathematics background and hands-on experience in data analytics, I've developed a strong interest in using quantitative methods to solve complex business and financial problems. Work with large datasets, market analysis, and trend research has pulled me toward statistical modeling, financial analytics, and data-driven decision-making. I'm building on that now with a Master's in International Business at Wuhan University.",
             zh:"凭借数学背景与数据分析实战经验，我逐渐建立起运用量化方法解决复杂商业与金融问题的浓厚兴趣。在处理大规模数据集、市场分析与趋势研究的过程中，我愈发倾向于统计建模、金融分析与数据驱动决策。目前，我正在武汉大学攻读国际商务硕士学位，以此进一步拓展这方面的能力。"},
  fact1_label:{en:"analytics &amp; data roles completed",zh:"段数据分析相关工作经历"},
  fact2_label:{en:"consumer data points analyzed",zh:"条消费者数据完成分析"},
  fact3_label:{en:"datasets validated across 26 markets",zh:"份数据集覆盖26个市场完成校验"},
  edu1:{en:'M.A. International Business <span>· Wuhan University</span>',zh:'国际商务硕士 <span>· 武汉大学</span>'},
  edu2:{en:'Chinese Language Program <span>· Hefei Preschool Education College</span>',zh:'汉语语言项目 <span>· 合肥幼儿师范高等专科学校</span>'},
  edu3:{en:'B.Sc. Mathematics <span>State University of Malang</span>',zh:'数学学士 <span>玛琅国立大学</span>'},
  skills_intro:{en:"The toolkit I reach for most, grouped by where it earns its keep.",zh:"按应用场景分类的常用工具与方法。"},
  skill_group1:{en:"Statistical Software",zh:"统计软件"},
  skill_group2:{en:"Modeling &amp; Statistics",zh:"建模与统计方法"},
  skill_group2_items:{en:'<li>Regression &amp; Time Series</li><li>Monte Carlo Methods</li><li>Hypothesis Testing</li><li>Machine Learning</li>',
                       zh:'<li>回归分析与时间序列</li><li>蒙特卡洛方法</li><li>假设检验</li><li>机器学习</li>'},
  skill_group3:{en:"Platforms &amp; Reporting",zh:"平台与报表工具"},
  skills_langs:{en:"Spoken: English (DET 120) · Chinese (HSK 4) · Indonesian (Native)",zh:"语言能力：英语（DET 120）· 中文（HSK 4）· 印尼语（母语）"},
  p1_title:{en:"Beverage Market 2024 Analysis",zh:"2024年饮品市场分析"},
  p1_desc:{en:"Analyzed 700,000+ consumer data points and social conversations in Python to map beverage market segments, demographics, and purchase behavior, with sentiment analysis surfacing the product attributes driving popularity.",
           zh:"运用Python分析超70万条消费者数据与社交讨论，绘制饮品市场细分、人群画像与购买行为图谱，并通过情感分析挖掘驱动产品热度的关键属性。"},
  p1_tags:{en:'<li>Python</li><li>Sentiment Analysis</li><li>Social Listening</li>',zh:'<li>Python</li><li>情感分析</li><li>社交聆听</li>'},
  p2_title:{en:"Traditional Market Data Mapping",zh:"传统市场数据地图绘制"},
  p2_desc:{en:"Cleaned, standardized, and validated 10,000+ records across 26 traditional markets in Malang for the city's Department of Cooperatives, Industry, and Trade, then mapped street-vendor and trader activity in Tableau for downstream market analysis.",
           zh:"为玛琅市合作社、工业与贸易局清理、标准化并校验超过1万条记录，覆盖26个传统市场，并通过Tableau将街头摊贩与市场交易活动绘制成可视化地图，支撑后续市场分析。"},
  p2_tags:{en:'<li>Tableau</li><li>Data Cleaning</li><li>Market Mapping</li>',zh:'<li>Tableau</li><li>数据清理</li><li>市场地图绘制</li>'},
  p3_title:{en:"Motor Vehicle Claim Portfolio Classification",zh:"机动车理赔组合分类研究"},
  p3_desc:{en:"Bachelor's thesis evaluating K-Means clustering against a genetic-algorithm approach for classifying motor vehicle insurance claim portfolios, presented at the International Conference on Mathematics and Applications (IcoMathApp) 2024.",
           zh:"本科毕业论文，比较K-均值聚类与遗传算法在机动车保险理赔组合分类中的效果，并在2024年国际数学与应用会议（IcoMathApp）上发表。"},
  p3_tags:{en:'<li>K-Means Clustering</li><li>Genetic Algorithms</li><li>Python</li>',zh:'<li>K-均值聚类</li><li>遗传算法</li><li>Python</li>'},
  p4_title:{en:"HSK Chinese Learning Platform",zh:"HSK中文学习平台"},
  p4_desc:{en:"Self-directed learning tool covering HSK levels 1–5, combining spaced-repetition flashcards with a guided writing module so learners build vocabulary and stroke-order accuracy in one place.",
           zh:"覆盖HSK 1-5级的自主学习工具，结合间隔重复闪卡与引导式写字练习，帮助学习者在同一平台同步积累词汇量并掌握正确笔顺。"},
  p4_tags:{en:'<li>Flashcards</li><li>Writing Practice</li><li>Self-Learning Tool</li>',zh:'<li>闪卡记忆</li><li>写字练习</li><li>自学工具</li>'},
  p5_title:{en:"Course Companion — AI Lecture Assistant",zh:"Course Companion — AI课堂助手"},
  p5_desc:{en:"Turns live lecture recordings into structured study material: real-time transcription and translation paired with an in-context AI assistant that answers questions the moment a concept doesn't land.",
           zh:"将课堂实时录音转化为结构化学习资料：实时转录与翻译，并配备情境化AI助手，遇到听不懂的概念可即时提问获得解答。"},
  p5_tags:{en:'<li>Speech-to-Text</li><li>Translation</li><li>AI Assistant</li>',zh:'<li>语音转文字</li><li>实时翻译</li><li>AI助手</li>'},
  p6_title:{en:"Aviara Express — Drone Logistics Venture",zh:"Aviara Express — 无人机物流项目"},
  p6_desc:{en:"A venture concept for last-mile air freight: a drone-based expedition service designed to cut delivery time and cost for time-sensitive cargo across hard-to-reach routes.",
           zh:"面向末端空运的创业项目构想：基于无人机的快递服务，旨在为难以到达的路线上的时效性货物降低配送时间与成本。"},
  p6_tags:{en:'<li>Business Model</li><li>Logistics</li><li>Drone Delivery</li>',zh:'<li>商业模式</li><li>物流</li><li>无人机配送</li>'},
  p7_title:{en:"Zhong Hua Da — Cross-Border Shopping Service",zh:"Zhong Hua Da — 中印代购与集运服务"},
  p7_desc:{en:"A cross-border personal-shopping platform connecting Indonesian buyers with product listings across China — handling sourcing, order consolidation, and shipping logistics for goods that would otherwise be out of reach.",
           zh:"跨境代购平台，帮助印尼买家直接下单中国商品，负责选品、集运与物流配送，让原本难以触及的商品也能便捷送达。"},
  p7_tags:{en:'<li>Cross-Border Commerce</li><li>Logistics</li><li>E-Commerce</li>',zh:'<li>跨境电商</li><li>物流集运</li><li>电子商务</li>'},
  link_case_study:{en:"Case study →",zh:"案例详情 →"},
  note_confidential:{en:"Client project · happy to walk through the details in an interview",zh:"客户项目 · 欢迎在面试中详细讨论"},
  link_visit_site:{en:"Visit site →",zh:"访问网站 →"},
  exp1_title:{en:'Digital &amp; Data Analyst <span>· PT Ivonesia Solusi Data (Ivosights)</span>',zh:'数字与数据分析师 <span>· PT Ivonesia Solusi Data (Ivosights)</span>'},
  exp1_desc:{en:"Managed 15+ recurring statistical reports with sentiment validation, and presented social media analytics to clients through executive summaries and interactive dashboards; completed a Python capstone on beverage industry trends.",
             zh:"负责管理15+份周期性统计报表并完成情感数据校验，通过执行摘要与交互式仪表盘向客户呈现社交媒体分析结果；完成基于Python的饮品行业趋势顶点项目。"},
  exp2_title:{en:'Virtual Data Manager <span>· PT Talenta Sinergi Group (Eduwork)</span>',zh:'虚拟数据管理专员 <span>· PT Talenta Sinergi Group (Eduwork)</span>'},
  exp2_desc:{en:"Managed and validated data for 3,000+ job-related tasks across job portal listings, and ran focus group discussions with students to identify patterns in job-search needs.",
             zh:"管理并校验3000+项求职相关任务数据，覆盖招聘平台信息；组织学生焦点小组访谈，梳理求职需求模式。"},
  exp3_title:{en:'Data Management <span>· Malang City Dept. of Cooperatives, Industry &amp; Trade</span>',zh:'数据管理专员 <span>· 玛琅市合作社、工业与贸易局</span>'},
  exp3_desc:{en:"Cleaned, standardized, and validated 10,000+ records from 26 traditional markets, generating market insights through data mapping and visualization in Tableau.",
             zh:"清理、标准化并校验来自26个传统市场的1万余条记录，通过Tableau数据地图与可视化呈现市场洞察。"},
  exp4_title:{en:'Data Analytics Junior Research <span>· PT Viktori Aksara Teknologi Indonesia</span>',zh:'数据分析初级研究员 <span>· PT Viktori Aksara Teknologi Indonesia</span>'},
  exp4_desc:{en:"Supported market-analysis research with data cleaning, standardization, and validation, strengthening the structured records used for downstream analysis.",
             zh:"支持市场分析相关研究工作，负责数据清理、标准化与校验，为后续分析提供结构化数据支撑。"},
  cert_intro:{en:"Tap or click any card to view the full certificate.",zh:"点击或轻触任意卡片查看完整证书。"},
  cert1_caption:{en:'2nd Place Winner in the Business Model Canvas Competition<em>Agritech Research and Entrepreneurship Innovation (AGREETION) Brawijaya University</em>',
                 zh:'商业模式画布竞赛 第二名<em>布拉维加亚大学 AGREETION 农业科技创新竞赛</em>'},
  cert2_caption:{en:'International Conference on Mathematics and Applications (IcoMathApp) 2024<em>Universitas Negeri Malang</em>',
                 zh:'2024年国际数学与应用会议（IcoMathApp）<em>玛琅国立大学</em>'},
  cert3_caption:{en:'Business Analysis &amp; Process Management<em>Coursera</em>',zh:'商业分析与流程管理<em>Coursera</em>'},
  cert4_caption:{en:'Data Analysis<em>My Skill</em>',zh:'数据分析<em>My Skill</em>'},
  cert5_caption:{en:'Microsoft Azure Data Fundamental<em>Talenta AI Indonesia</em>',zh:'微软Azure数据基础认证<em>Talenta AI Indonesia</em>'},
  contact_lede:{en:"I'm based in Wuhan, China and open to full-time Quantitative, Data, or Business Analyst roles — remote or on-site. If you have a data problem worth solving, I'd like to hear about it.",
                zh:"我目前常驻中国武汉，欢迎量化分析师、数据分析师或商业分析师相关全职岗位——无论远程还是现场工作。如果你有值得深入研究的数据问题，欢迎与我联系。"},
  contact_email_label:{en:"Email",zh:"邮箱"},
  contact_linkedin_label:{en:"LinkedIn",zh:"领英"}
};

let currentLang = 'en';
const langBtn = document.getElementById('lang-toggle');
const i18nEls = document.querySelectorAll('[data-i18n]');

function applyLang(lang) {
  i18nEls.forEach(el => {
    const entry = translations[el.dataset.i18n];
    if (entry && entry[lang]) el.innerHTML = entry[lang];
  });
  document.documentElement.lang = lang;
  langBtn.textContent = lang === 'en' ? '中文' : 'EN';
}

if (langBtn) {
  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    applyLang(currentLang);
  });
}

// ---- Certificate lightbox (click / tap to view full size) ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const certCards = document.querySelectorAll('.cert-card');

function openLightbox(card) {
  const fullSrc = card.dataset.full;
  const captionEl = card.querySelector('.cert-caption');
  lightboxImg.src = fullSrc;
  lightboxImg.alt = card.querySelector('img').alt;
  lightboxCaption.textContent = captionEl ? captionEl.textContent.trim() : '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

certCards.forEach(card => {
  card.addEventListener('click', () => openLightbox(card));
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

// ---- Smooth anchor scrolling (in case scroll-behavior is unsupported) ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
