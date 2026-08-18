document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkList = document.querySelectorAll('.nav-link');
  const langBtns = document.querySelectorAll('.lang-btn');

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    lastScroll = y;
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinkList.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkList.forEach(l => {
          l.classList.toggle('active', l.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });
  sections.forEach(s => observerNav.observe(s));

  const fadeEls = document.querySelectorAll(
    '.service-card, .value-card, .sector-item, .contact-item, .section-header, .about-text'
  );
  fadeEls.forEach(el => el.classList.add('fade-up'));
  const observerFade = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  fadeEls.forEach(el => observerFade.observe(el));

  const translations = {
    tk: {
      'nav.home': 'Baş sahypa',
      'nav.services': 'Hyzmatlar',
      'nav.about': 'Barada',
      'nav.contact': 'Habarlaşmak',
      'nav.quote': 'Bahany soramak',
      'hero.badge': 'Türkmenistan · Hazar sebiti',
      'hero.title': 'Inženerçilik ussatlygy<br/><span class="hero-highlight">Hazar deňzinde</span>',
      'hero.sub': 'Nesibe ES Türkmenistanyň energetika, infrastruktura we gurluşyk pudaklarynda ýerine ýetiriji tejribesi bilen doly EPC çözgütlerini we senagat hyzmatlaryny hödürleýär.',
      'services.tag': 'Näme edýäris',
      'services.title': 'Toplumlaýyn EPC we<br/>senagat hyzmatlary',
      'services.sub': 'Konsepsiýadan ulanyşa girizmä çenli doly inženerçilik, satyn alyş we gurluşyk çözgütleri.',
      'svc.0.title': 'Inženerçilik we taslamalaşdyrma',
      'svc.0.desc': 'Raýat, mehaniki, elektrik we tehnologiki ugurlarda konseptual, FEED we jikme-jik inženerçilik — Hazar şertlerine laýyklaşdyrylan.',
      'svc.1.title': 'Satyn alyş we üpjünçilik',
      'svc.1.desc': 'Enjamlar, materiallar we ýörite komponentler üçin strategiki satyn alyş, üpjünçi dolandyryşy we üpjünçilik zynjyry logistikasy.',
      'svc.2.title': 'Gurluşyk we gurnama',
      'svc.2.desc': 'Senagat desgalarynyň, turba geçirijileriň, gaýtadan işleýiş zawodlarynyň we infrastrukturanyň doly gurluşygy — halkara HSE standartlaryna laýyklykda.',
      'svc.3.title': 'Taslama dolandyryşy',
      'svc.3.desc': 'Mobilizasiýadan tabşyrylyşa çenli meýilnamalaşdyrma, çykdajy dolandyryşy, töwekgelçiligi azaltma we hil üpjünçiligi.',
      'svc.4.title': 'Nebit we gaz hyzmatlary',
      'svc.4.desc': 'Ýokary we orta akym amallaryna ýöriteleşdirilen goldaw — guýy hyzmatlary, turba geçiriji bitewiligini, desgalary abatlamak we önümçiligi optimallaşdyrma.',
      'svc.5.title': 'Tehniki hyzmat we ulanyş',
      'svc.5.desc': 'Meýilleşdirilen we gyssagly tehniki hyzmat, aktiwleriň bitewiligini dolandyrma we desganyň iş wagtyny artdyrmak üçin operasion goldaw.',
      'about.tag': 'Biz barada',
      'about.title': 'Nesibe ES barada',
      'about.lead': 'Nesibe ES — energetika, infrastruktura we gurluşyk pudaklarynda çylşyrymly taslamalary amala aşyrmakda ýerine ýetiriji derejedäki tejribesi bolan Türkmenistanda ýerleşýän EPC we senagat hyzmatlary kompaniýasy.',
      'about.v0.title': 'Howpsuzlyk ilki bilen',
      'about.v0.desc': '5M+ LTI-siz adam-sagat bilen zyýansyz borçnama',
      'about.v1.title': 'Wagtynda tabşyrylyş',
      'about.v1.desc': 'Ähli taslama görnüşlerinde 98% tertip berjaýlygy',
      'about.v2.title': 'Ýerli tejribe',
      'about.v2.desc': 'Türkmenistanyň kadalaşdyryjy gurşawyna çuňňur düşünme',
      'about.v3.title': 'Yzygiderli ösüş',
      'about.v3.desc': 'Gaýtadan dikeldilýän energiýa we sanly nebit meýdançasynda mümkinçilikleri giňeltmek',
      'sectors.tag': 'Pudaklar',
      'sectors.title': 'Hyzmat edýän pudaklarymyz',
      'sectors.0.title': 'Nebit we gaz',
      'sectors.0.desc': 'Ýokary, orta we aşaky akym desgalary',
      'sectors.1.title': 'Energetika',
      'sectors.1.desc': 'Gaz turbinalary, utgaşdyrylan sikl we podstansiýalar',
      'sectors.2.title': 'Infrastruktura',
      'sectors.2.desc': 'Ýollar, köprüler, kommunikasiýalar we jemgyýetçilik işleri',
      'sectors.3.title': 'Senagat',
      'sectors.3.desc': 'Himiýa zawodlary, nebiti gaýtadan işleýiş we önümçilik',
      'contact.tag': 'Söhbetdeşlige başlaň',
      'contact.title': 'Biz bilen habarlaşyň',
      'contact.sub': 'Indiki taslamaňyzy maslahatlaşmaga taýynmy? Habarlaşyň — toparymyz bir iş gününiň dowamynda jogap berýär.',
      'contact.office': 'Baş edara',
      'contact.address': 'Aşgabat, Türkmenistan<br/>Bitarap Türkmenistan şaýoly',
      'contact.phone': 'Telefon',
      'contact.email': 'E-poçta',
      'contact.ops': 'Iş ýerleri',
      'form.name': 'Doly adyňyz *',
      'form.name.ph': 'Doly adyňyz',
      'form.company': 'Kompaniýa',
      'form.company.ph': 'Kompaniýanyň ady',
      'form.email': 'E-poçta *',
      'form.email.ph': 'siz@kompaniya.com',
      'form.phone': 'Telefon',
      'form.phone.ph': '+993 ...',
      'form.service': 'Gyzyklanýan hyzmatyňyz',
      'form.service.ph': 'Hyzmat saýlaň...',
      'form.details': 'Taslama jikme-jiklikleri',
      'form.details.ph': 'Taslama gerimi, möhleti we talaplary barada aýdyň...',
      'form.submit': 'Sorag ibermek',
      'form.success': 'Soragyňyz üçin sag boluň. Toparymyz bir iş gününiň dowamynda jogap berer.',
      'form.sending': 'Iberilýär...',
      'footer.desc': 'Türkmenistanyň ygtybarly EPC hyzmatdaşy — Hazar sebitinde inženerçilik ussatlygy, gurluşyk bitewiligini we operasion ygtybarlylygyny üpjün edýär.',
      'footer.services': 'Hyzmatlar',
      'footer.sectors': 'Pudaklar',
      'footer.company': 'Kompaniýa'
    },
    ru: {
      'nav.home': 'Главная',
      'nav.services': 'Услуги',
      'nav.about': 'О нас',
      'nav.contact': 'Контакты',
      'nav.quote': 'Запросить цену',
      'hero.badge': 'Туркменистан · Каспийский регион',
      'hero.title': 'Инженерное мастерство<br/><span class="hero-highlight">на Каспии</span>',
      'hero.sub': 'Nesibe ES предоставляет комплексные EPC-решения и промышленные услуги с подтверждённым управленческим опытом в энергетическом, инфраструктурном и строительном секторах Туркменистана.',
      'services.tag': 'Наши услуги',
      'services.title': 'Комплексные EPC и<br/>промышленные услуги',
      'services.sub': 'Полный спектр инженерных, закупочных и строительных решений — от концепции до ввода в эксплуатацию.',
      'svc.0.title': 'Проектирование',
      'svc.0.desc': 'Концептуальное, FEED и детальное проектирование в области гражданского, механического, электрического и технологического строительства — адаптированное к условиям Каспийского региона.',
      'svc.1.title': 'Закупки и снабжение',
      'svc.1.desc': 'Стратегические закупки, управление поставщиками и логистика цепи поставок оборудования, материалов и специализированных компонентов — в срок и в рамках бюджета.',
      'svc.2.title': 'Строительство и монтаж',
      'svc.2.desc': 'Строительство промышленных объектов, трубопроводов, перерабатывающих заводов и инфраструктуры «под ключ» — в соответствии с международными стандартами HSE.',
      'svc.3.title': 'Управление проектами',
      'svc.3.desc': 'Комплексное управление проектами: планирование, управление затратами, снижение рисков и обеспечение качества от мобилизации до сдачи.',
      'svc.4.title': 'Нефтегазовые услуги',
      'svc.4.desc': 'Специализированная поддержка upstream и midstream операций — буровые услуги, целостность трубопроводов, обслуживание объектов и оптимизация добычи.',
      'svc.5.title': 'Техобслуживание и эксплуатация',
      'svc.5.desc': 'Плановое и аварийное техобслуживание, управление целостностью активов и операционная поддержка для максимального времени безотказной работы.',
      'about.tag': 'О компании',
      'about.title': 'О Nesibe ES',
      'about.lead': 'Nesibe ES — компания EPC и промышленных услуг, базирующаяся в Туркменистане, с управленческим опытом реализации сложных проектов в энергетическом, инфраструктурном и строительном секторах.',
      'about.v0.title': 'Безопасность прежде всего',
      'about.v0.desc': 'Приверженность нулевому ущербу с 5M+ человеко-часов без LTI',
      'about.v1.title': 'Сдача в срок',
      'about.v1.desc': '98% соблюдение графика по всем типам проектов',
      'about.v2.title': 'Местная экспертиза',
      'about.v2.desc': 'Глубокое понимание нормативной среды Туркменистана',
      'about.v3.title': 'Непрерывный рост',
      'about.v3.desc': 'Расширение возможностей в возобновляемой энергетике и цифровых нефтепромыслах',
      'sectors.tag': 'Отрасли',
      'sectors.title': 'Обслуживаемые отрасли',
      'sectors.0.title': 'Нефть и газ',
      'sectors.0.desc': 'Upstream, midstream и downstream объекты',
      'sectors.1.title': 'Энергетика',
      'sectors.1.desc': 'Газовые турбины, комбинированный цикл и подстанции',
      'sectors.2.title': 'Инфраструктура',
      'sectors.2.desc': 'Дороги, мосты, коммуникации и общественные работы',
      'sectors.3.title': 'Промышленность',
      'sectors.3.desc': 'Химические заводы, НПЗ и производство',
      'contact.tag': 'Начните разговор',
      'contact.title': 'Свяжитесь с нами',
      'contact.sub': 'Готовы обсудить ваш следующий проект? Напишите нам — наша команда ответит в течение одного рабочего дня.',
      'contact.office': 'Головной офис',
      'contact.address': 'Ашхабад, Туркменистан<br/>проспект Битарап Туркменистан',
      'contact.phone': 'Телефон',
      'contact.email': 'Эл. почта',
      'contact.ops': 'Присутствие',
      'form.name': 'Полное имя *',
      'form.name.ph': 'Ваше полное имя',
      'form.company': 'Компания',
      'form.company.ph': 'Ваша компания',
      'form.email': 'Эл. почта *',
      'form.email.ph': 'вы@компания.com',
      'form.phone': 'Телефон',
      'form.phone.ph': '+993 ...',
      'form.service': 'Интересующая услуга',
      'form.service.ph': 'Выберите услугу...',
      'form.details': 'Детали проекта',
      'form.details.ph': 'Расскажите о масштабе, сроках и требованиях вашего проекта...',
      'form.submit': 'Отправить запрос',
      'form.success': 'Спасибо за ваш запрос. Наша команда ответит в течение одного рабочего дня.',
      'form.sending': 'Отправка...',
      'footer.desc': 'Надёжный EPC-партнёр Туркменистана — инженерное мастерство, строительная надёжность и операционная стабильность в Каспийском регионе.',
      'footer.services': 'Услуги',
      'footer.sectors': 'Отрасли',
      'footer.company': 'Компания'
    }
  };

  let currentLang = 'en';

  function setLang(lang) {
    currentLang = lang;
    if (lang === 'en') {
      document.querySelectorAll('[data-i18n-orig]').forEach(el => {
        el.textContent = el.dataset.i18nOrig;
      });
      document.querySelectorAll('[data-i18n-html-orig]').forEach(el => {
        el.innerHTML = el.dataset.i18nHtmlOrig;
      });
      document.querySelectorAll('[data-i18n-ph-orig]').forEach(el => {
        el.placeholder = el.dataset.i18nPhOrig;
      });
      return;
    }
    const dict = translations[lang];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        if (!el.dataset.i18nOrig) el.dataset.i18nOrig = el.textContent;
        el.textContent = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (dict[key]) {
        if (!el.dataset.i18nHtmlOrig) el.dataset.i18nHtmlOrig = el.innerHTML;
        el.innerHTML = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (dict[key]) {
        if (!el.dataset.i18nPhOrig) el.dataset.i18nPhOrig = el.placeholder;
        el.placeholder = dict[key];
      }
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setLang(btn.dataset.lang);
    });
  });

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const span = btn.querySelector('span');
      btn.disabled = true;
      const dict = translations[currentLang];
      span.textContent = (dict && dict['form.sending']) || 'Sending...';
      setTimeout(() => {
        formSuccess.classList.add('show');
        span.textContent = (dict && dict['form.submit']) || 'Submit Inquiry';
        btn.disabled = false;
        contactForm.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1200);
    });
  }

  const particles = document.getElementById('heroParticles');
  if (particles) {
    for (let i = 0; i < 30; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:absolute;
        width:${Math.random() * 3 + 1}px;
        height:${Math.random() * 3 + 1}px;
        background:rgba(0,161,156,${Math.random() * 0.3 + 0.05});
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation:float ${Math.random() * 10 + 8}s ease-in-out infinite;
        animation-delay:${Math.random() * -10}s;
      `;
      particles.appendChild(dot);
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes float{0%,100%{transform:translate(0,0)}25%{transform:translate(${Math.random()*20-10}px,${Math.random()*20-10}px)}50%{transform:translate(${Math.random()*20-10}px,${Math.random()*20-10}px)}75%{transform:translate(${Math.random()*20-10}px,${Math.random()*20-10}px)}}`;
    document.head.appendChild(style);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
});
