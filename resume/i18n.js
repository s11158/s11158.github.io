/* TLNT resume builder — RU/EN toggle + English PDF (chips map 1:1) */
(function(){
"use strict";
/* ===== chip/data translations (RU -> EN) ===== */
const T = {
// roles
"Мастер маникюра":"Nail Technician","Косметолог-эстетист":"Esthetician","Лешмейкер / бровист":"Lash & Brow Artist",
"Парикмахер / стилист":"Hair Stylist","Визажист":"Makeup Artist","Массажист":"Massage Therapist",
"Администратор салона":"Salon Receptionist / Admin","Управляющий салоном":"Salon Manager",
"Врач":"Medical Doctor","Врач-косметолог":"Aesthetic Doctor","Медсестра":"Registered Nurse",
"Лазерный техник":"Laser Technician","Администратор клиники":"Clinic Receptionist / Admin","Управляющий клиникой":"Clinic Manager",
"Бизнес-ассистент":"Executive Assistant","Бухгалтер":"Accountant","Финансовый директор":"Finance Director / CFO",
"Офис-менеджер":"Office Manager","Менеджер по продажам":"Sales Manager","Маркетолог / SMM":"Marketing / SMM Specialist",
"Личный ассистент":"Personal Assistant","Хаускипер / клининг-специалист":"Housekeeper","Хаус-менеджер":"House Manager",
"Няня":"Nanny","Семейный водитель":"Family Driver","Домашний повар":"Private Chef",
"Ресепшн / хостес":"Receptionist / Hostess","Другая профессия":"Other profession",
// cats
"Салон красоты":"Beauty salon","Медицина":"Medical","Бизнес и офис":"Business & office","Личный персонал":"Household staff","Другое":"Other",
// seniority / city / visa / avail / dha / langs / salary
"Нет опыта":"No experience yet","Опыт 1–3 года":"1–3 years of experience","Опыт 3+ лет":"3+ years of experience",
"Дубай":"Dubai","Абу-Даби":"Abu Dhabi","Другой эмират":"Other emirate","Пока не в ОАЭ":"Not in the UAE yet",
"Резидентская виза — transferable":"Residence visa — transferable","Виза супруга/супруги — NOC есть":"Spouse visa — NOC available",
"Туристическая виза":"Visit visa","Отмена визы в процессе":"Visa cancellation in progress","Freelance / own visa":"Freelance / own visa",
"Вне ОАЭ — готова к переезду":"Outside the UAE — ready to relocate",
"Могу выйти сразу":"Available immediately","Через 1–2 недели":"Available in 1–2 weeks","Через месяц":"Available in 1 month","После оформления визы":"Upon visa processing",
"Действующая лицензия DHA":"Active DHA license","DHA в процессе — DataFlow пройден":"DHA in progress — DataFlow completed",
"Лицензия MOH/DOH":"MOH/DOH license","Без лицензии — готова получать":"No license yet — ready to obtain",
"Русский — родной":"Russian — native","Английский — разговорный":"English — conversational","Английский — свободный":"English — fluent",
"Арабский — базовый":"Arabic — basic","Украинский — родной":"Ukrainian — native","Хинди/урду — разговорный":"Hindi/Urdu — conversational",
"от 3 500 AED":"from AED 3,500","от 5 000 AED":"from AED 5,000","от 7 000 AED":"from AED 7,000","от 10 000 AED":"from AED 10,000","от 15 000 AED":"from AED 15,000",
"Фикс + % от услуг":"Base + % of services","Обсуждаемо":"Negotiable",
// duties: beauty
"Маникюр и педикюр: классический, аппаратный, комбинированный":"Manicure & pedicure: classic, e-file, combined",
"Покрытие гель-лаком, укрепление, дизайн любой сложности":"Gel polish, strengthening, nail art of any complexity",
"Наращивание (гель, верхние формы)":"Extensions (gel, dual forms)",
"Принимала 6–8 клиентов в день, вела свою запись":"Served 6–8 clients daily, managed own bookings",
"Стерилизация инструментов по стандартам Dubai Municipality":"Tool sterilization per Dubai Municipality standards",
"База постоянных клиентов — возвращаемость выше 60%":"Loyal client base — 60%+ return rate",
"Чистки, пилинги, уходовые процедуры лица":"Facials: cleansing, peels, skincare treatments",
"Аппараты: HydraFacial, RF-лифтинг, микротоки":"Devices: HydraFacial, RF-lifting, microcurrents",
"Подбор протокола под тип кожи, ведение карты клиента":"Protocols tailored to skin type, client records",
"Консультации и продажа домашнего ухода":"Consultations and home-care sales",
"До 10 процедур в день":"Up to 10 treatments daily",
"Опыт с европейской, арабской и азиатской клиентурой":"Experience with European, Arab and Asian clientele",
"Наращивание ресниц: классика, 2D–5D, mega volume":"Lash extensions: classic, 2D–5D, mega volume",
"Ламинирование ресниц и бровей, окрашивание":"Lash & brow lamination, tinting",
"Коррекция и архитектура бровей (воск, пинцет)":"Brow shaping & architecture (wax, tweezers)",
"4–6 клиентов в день по записи":"4–6 clients daily by appointment",
"Вела Instagram с работами — приводила новых клиентов":"Ran a portfolio Instagram — attracted new clients",
"Женские и мужские стрижки, укладки":"Women's and men's cuts, styling",
"Окрашивание: сложные техники, блонд, AirTouch":"Coloring: advanced techniques, blonde, AirTouch",
"Кератин, ботокс, восстановление волос":"Keratin, botox, hair repair treatments",
"Свадебные и вечерние причёски":"Bridal and evening hairstyles",
"Своя база клиентов, работа с премиум-сегментом":"Own client base, premium segment experience",
"Дневной, вечерний, свадебный макияж":"Day, evening and bridal makeup",
"Работа с разными типами внешности и возрастом":"All appearance types and ages",
"Съёмки, мероприятия, выезды к клиенту":"Shoots, events, on-location services",
"Подбор и продажа косметики":"Cosmetics consulting and sales",
"Портфолио в Instagram":"Portfolio on Instagram",
"Классический, лимфодренажный, антицеллюлитный массаж":"Classic, lymphatic drainage, anti-cellulite massage",
"СПА-программы и обёртывания":"SPA programs and body wraps",
"Подбор программы под запрос клиента":"Programs tailored to client needs",
"До 6–8 сеансов в день":"Up to 6–8 sessions daily",
"Сертификаты по массажу, знание анатомии":"Massage certificates, anatomy knowledge",
"Запись клиентов: телефон, WhatsApp, Instagram, CRM (Fresha/Altegio)":"Bookings via phone, WhatsApp, Instagram, CRM (Fresha/Altegio)",
"Встреча гостей, координация расписания мастеров":"Guest welcome, coordinating specialists' schedules",
"Касса, отчётность, онлайн-оплаты":"Cash desk, reporting, online payments",
"Переписка и отзывы на английском":"Correspondence and reviews in English",
"Решение конфликтных ситуаций — удержание клиентов":"Conflict resolution — client retention",
"Учёт материалов и заказы у поставщиков":"Inventory and supplier orders",
"Операционное управление салоном":"Salon operations management",
"Найм, обучение и мотивация команды":"Hiring, training and motivating the team",
"Планы продаж и отчётность для собственника":"Sales targets and owner reporting",
"Контроль сервиса и стандартов":"Service and standards control",
"Запуск акций, работа с маркетингом":"Promotions and marketing",
"Взаимодействие с Dubai Municipality":"Liaison with Dubai Municipality",
// duties: medical
"Приём и консультирование пациентов":"Patient consultations and appointments",
"Назначение и контроль планов лечения":"Prescribing and monitoring treatment plans",
"Ведение медицинской документации на английском (EMR)":"Medical records in English (EMR)",
"Работа по стандартам DHA / DHCC":"Practice per DHA / DHCC standards",
"Взаимодействие со страховыми (approvals)":"Insurance liaison (approvals)",
"Проведение процедур по профилю":"Procedures within specialty",
"Инъекционные методики: ботулотоксин, филлеры, мезотерапия":"Injectables: botulinum toxin, fillers, mesotherapy",
"Аппаратные процедуры: лазеры, RF, SMAS":"Device treatments: lasers, RF, SMAS",
"Консультации и планы эстетической коррекции":"Aesthetic consultation and treatment planning",
"Ведение карт пациентов по стандартам DHA":"Patient records per DHA standards",
"Работа с премиальной клиентурой":"Premium clientele experience",
"Ассистирование врачу на инъекционных и аппаратных процедурах":"Assisting physician in injectable and device procedures",
"Подготовка кабинета, стерилизация, учёт препаратов по DHA":"Room prep, sterilization, medication control per DHA",
"Медицинская документация на английском":"Medical documentation in English",
"Пре- и пост-процедурные консультации пациентов":"Pre- and post-procedure patient counselling",
"Работа в клинике эстетической медицины":"Aesthetic medicine clinic experience",
"Лазерная эпиляция (Candela GentleLase, Soprano)":"Laser hair removal (Candela GentleLase, Soprano)",
"Настройка параметров под фототип кожи":"Settings adjusted to skin phototype",
"Консультации и тест-процедуры":"Consultations and patch tests",
"10–12 клиентов в день":"10–12 clients daily",
"Строгое соблюдение протоколов безопасности":"Strict safety protocol compliance",
"Запись пациентов и координация расписания врачей":"Patient booking and doctors' schedule coordination",
"Работа с кассой, страховыми и оплатами":"Cash desk, insurance and payments",
"Ведение документации клиники":"Clinic documentation",
"Общение с пациентами на английском":"Patient communication in English",
"Контроль стандартов сервиса":"Service standards control",
"Операционное управление клиникой":"Clinic operations management",
"Работа с DHA: лицензии, инспекции, стандарты":"DHA liaison: licenses, inspections, standards",
"Найм и управление медицинской командой":"Hiring and managing medical staff",
"Финансовая отчётность для собственника":"Financial reporting to the owner",
"Развитие клиники и запуск новых услуг":"Clinic growth and new service launches",
// duties: business
"Календарь, встречи и поездки руководителя":"Executive calendar, meetings and travel",
"Подготовка документов и презентаций":"Documents and presentations",
"Коммуникация с партнёрами на английском":"Partner communication in English",
"Контроль исполнения задач команды":"Tracking team deliverables",
"Полная конфиденциальность":"Full confidentiality",
"Полное ведение бухгалтерии компании":"Full-cycle company accounting",
"Отчётность и VAT (ОАЭ)":"Reporting and UAE VAT",
"Работа с банками и платежами":"Banking and payments",
"Зарплаты (WPS), учёт сотрудников":"Payroll (WPS), employee records",
"QuickBooks / Zoho Books / 1С":"QuickBooks / Zoho Books / 1C",
"Управленческая отчётность и бюджетирование":"Management reporting and budgeting",
"Контроль денежных потоков":"Cash flow control",
"Оптимизация расходов и налогов (VAT, Corporate Tax)":"Cost and tax optimization (VAT, Corporate Tax)",
"Финансовое планирование для собственника":"Financial planning for the owner",
"Работа с аудиторами и банками ОАЭ":"UAE auditors and banks liaison",
"Организация работы офиса":"Office operations",
"Документооборот и закупки":"Document flow and procurement",
"Поддержка команды и руководителя":"Team and executive support",
"Работа с подрядчиками и сервисами":"Contractors and services management",
"Продажи и выполнение плана":"Sales and target achievement",
"Ведение клиентов в CRM":"Client management in CRM",
"Переговоры и презентации на английском":"Negotiations and presentations in English",
"Работа с входящими заявками":"Inbound lead handling",
"Развитие базы клиентов":"Client base growth",
"Ведение Instagram и контент-план":"Instagram management and content plan",
"Запуск таргетированной рекламы":"Paid social campaigns",
"Работа с блогерами и партнёрами":"Influencer and partner collaborations",
"Аналитика заявок и отчёты":"Lead analytics and reporting",
"Съёмка и монтаж Reels":"Reels shooting and editing",
// duties: household
"Ведение календаря и организация встреч":"Calendar management and scheduling",
"Личные и деловые поручения":"Personal and business errands",
"Travel-поддержка: билеты, визы, отели":"Travel support: tickets, visas, hotels",
"Работа с документами и оплатами":"Documents and payments",
"Полная уборка и поддержание порядка в доме / вилле":"Full housekeeping of home / villa",
"Уход за гардеробом: стирка, глажка, деликатные ткани":"Wardrobe care: laundry, ironing, delicate fabrics",
"Организация пространства и запасов":"Organizing spaces and supplies",
"Деликатная работа в доме с семьёй":"Discreet work in a family home",
"Рекомендации с прошлых мест":"References from previous employers",
"Управление домом / виллой: персонал, подрядчики, закупки":"Managing home / villa: staff, contractors, procurement",
"Контроль уборки, кухни, техобслуживания":"Oversight of cleaning, kitchen, maintenance",
"Организация приёмов и событий":"Hosting receptions and events",
"Бюджет дома и отчётность":"Household budget and reporting",
"Уход за детьми: режим, питание, развитие":"Childcare: routine, meals, development",
"Развивающие занятия и прогулки":"Educational activities and walks",
"Сопровождение в школу и на кружки":"School runs and activities",
"Первая помощь, безопасность":"First aid, safety",
"Рекомендации от семей":"References from families",
"Личный / семейный водитель":"Personal / family driver",
"Права UAE, знание Дубая и Абу-Даби":"UAE license, knowledge of Dubai & Abu Dhabi",
"Сопровождение детей в школу":"School runs for children",
"Уход за автомобилем":"Vehicle care",
"Пунктуальность и конфиденциальность":"Punctuality and confidentiality",
"Домашняя кухня: меню под запрос семьи":"Home cuisine: menus tailored to the family",
"Европейская, паназиатская кухня, детское меню":"European, pan-Asian cuisine, kids' menu",
"Закупка продуктов и контроль качества":"Grocery sourcing and quality control",
"Сервировка и подача":"Table setting and service",
"Санитарные стандарты":"Sanitary standards",
"Встреча и сопровождение гостей":"Welcoming and assisting guests",
"Запись и координация расписания":"Bookings and schedule coordination",
"Работа с кассой и оплатами":"Cash desk and payments",
"Общение с гостями на английском":"Guest communication in English",
"Поддержание стандартов сервиса":"Maintaining service standards",
"Работа с клиентами и сервис":"Client service",
"Выполнение планов и стандартов":"Meeting targets and standards",
"Работа в команде":"Teamwork",
"Отчётность и дисциплина":"Reporting and discipline",
// skills (cat + role)
"Английский для работы с клиентами":"Client-facing English","CRM и онлайн-запись (Fresha, Booksy, Altegio)":"CRM & online booking (Fresha, Booksy, Altegio)",
"Продажа услуг и домашнего ухода":"Service and retail sales","Стандарты гигиены Dubai Municipality":"Dubai Municipality hygiene standards",
"Работа с VIP-клиентами":"VIP client experience","Instagram: контент и клиенты":"Instagram: content & clients",
"Работа в мультикультурной команде":"Multicultural teamwork",
"Английский медицинский":"Medical English","Стандарты DHA / DHCC":"DHA / DHCC standards","Медицинская документация (EMR)":"Medical records (EMR)",
"Работа с пациентами разных культур":"Multicultural patient care","Стерилизация и безопасность":"Sterilization & safety","Работа со страховыми":"Insurance handling",
"Деловой английский":"Business English","Excel / Google Sheets":"Excel / Google Sheets","CRM (Zoho, Bitrix24)":"CRM (Zoho, Bitrix24)",
"Деловая переписка":"Business correspondence","Отчётность и дедлайны":"Reporting & deadlines","Мультизадачность":"Multitasking","Презентации":"Presentations",
"Разговорный английский":"Conversational English","Конфиденциальность":"Confidentiality","Аккуратность и пунктуальность":"Diligence & punctuality",
"Готовность к полной занятости":"Available full-time","Работа в семьях с детьми":"Experience with families with children",
"Английский для работы":"Working English","Работа с клиентами":"Client service","Пунктуальность и надёжность":"Punctuality & reliability",
"Аппаратный маникюр":"E-file manicure","Дизайн ногтей":"Nail art","Наращивание":"Extensions","Педикюр":"Pedicure",
"HydraFacial":"HydraFacial","RF-лифтинг":"RF-lifting","Химические пилинги":"Chemical peels","Уход по типу кожи":"Skin-type based care",
"Классика и объёмы":"Classic & volume sets","Ламинирование":"Lamination","Архитектура бровей":"Brow architecture",
"Сложное окрашивание":"Advanced coloring","Кератин/ботокс":"Keratin/botox","Свадебные укладки":"Bridal styling",
"Свадебный макияж":"Bridal makeup","Съёмочный макияж":"Editorial makeup","Подбор косметики":"Cosmetics consulting",
"Лимфодренаж":"Lymphatic drainage","СПА-программы":"SPA programs","Анатомия и противопоказания":"Anatomy & contraindications",
"Касса и отчётность":"Cash desk & reporting","Работа с жалобами":"Complaint handling","Google Sheets":"Google Sheets",
"Управление командой":"Team management","P&L и отчётность":"P&L & reporting","Маркетинг салона":"Salon marketing",
"Диагностика и планы лечения":"Diagnostics & treatment plans","Телемедицина":"Telemedicine","Научная база, протоколы":"Evidence-based protocols",
"Ботулотоксин и филлеры":"Botulinum toxin & fillers","Лазерные методики":"Laser techniques","Контурная пластика":"Contouring",
"Ассистирование на процедурах":"Procedure assistance","Стерилизация по DHA":"DHA sterilization","Уход за пациентами":"Patient care",
"Candela / Soprano":"Candela / Soprano","Фототипы и протоколы":"Phototypes & protocols","Безопасность процедур":"Procedure safety",
"Работа со страховыми":"Insurance handling","Медрегистратура":"Medical front desk","Касса и отчёты":"Cash desk & reports",
"Лицензирование DHA":"DHA licensing","Управление медперсоналом":"Medical staff management","Финансы клиники":"Clinic finance",
"Календарь и логистика":"Calendar & logistics","Протоколы встреч":"Meeting minutes","Подготовка презентаций":"Presentations",
"VAT-отчётность ОАЭ":"UAE VAT reporting","WPS и зарплаты":"WPS & payroll","QuickBooks / Zoho Books":"QuickBooks / Zoho Books",
"Бюджетирование":"Budgeting","Cash-flow управление":"Cash-flow management","Corporate Tax ОАЭ":"UAE Corporate Tax",
"Закупки и снабжение":"Procurement","Документооборот":"Document flow","Организация офиса":"Office administration",
"Переговоры":"Negotiations","Воронка продаж в CRM":"CRM sales pipeline","Холодные и тёплые продажи":"Cold & warm sales",
"Таргет Instagram/Meta":"Instagram/Meta ads","Контент и Reels":"Content & Reels","Аналитика рекламы":"Ads analytics",
"Календарь и travel":"Calendar & travel","Личные поручения":"Personal errands",
"Деликатные ткани и уход":"Delicate fabrics care","Организация пространства":"Space organization","Работа с техникой премиум-класса":"Premium appliances handling",
"Управление персоналом дома":"Household staff management","Бюджет и закупки":"Budget & procurement","Организация событий":"Event hosting",
"Раннее развитие":"Early development","Детская безопасность":"Child safety","Помощь со школой":"School support",
"Права UAE":"UAE driving license","Знание города":"City knowledge","Детская безопасность в авто":"Child safety in the car",
"Составление меню":"Menu planning","Диетическое и детское питание":"Dietary & kids meals","Закупки":"Grocery sourcing",
"Сервис-стандарты":"Service standards","Телефонный этикет":"Phone etiquette","Телефонный этикет EN":"Phone etiquette (EN)"
};
const tr = s => T[s] || s;

/* ===== UI strings (RU -> EN), applied by matching first text node ===== */
const UI = {
"Красивое резюме для работы в Дубае — ":"A beautiful CV for a job in Dubai — ","за 5 минут":"in 5 minutes",
"Идите вниз и просто выбирайте готовые ответы. Бесплатно, без подписок, PDF сразу и без водяных знаков.":"Scroll down and just tap ready-made answers. Free, no subscriptions, instant PDF, no watermarks.",
"Бесплатно · без регистрации":"Free · no sign-up",
"Профессия":"Profession","Фото":"Photo","Контакты":"Contacts","Статус в ОАЭ":"UAE status","Опыт":"Experience",
"Образование":"Education","Навыки":"Skills","Языки и зарплата":"Languages & salary","О себе":"About you","Готово":"Done",
"Кем вы работаете":"What is your profession","Ваш опыт":"Your experience",
"Фото.":"Photo.","В ОАЭ фото ожидается для клиентских ролей. После загрузки можно приблизить и сдвинуть кадр — лишнее останется за рамкой.":"In the UAE a photo is expected for client-facing roles. After upload you can zoom and reposition — everything else stays outside the frame.",
"Загрузить фото":"Upload photo","JPG или PNG · потом обрежем и отцентруем":"JPG or PNG · crop & center next",
"Контакты.":"Contacts.","Имя и фамилия":"Full name","Телефон":"Phone","Email ":"Email ",
"Где вы находитесь":"Where are you now","Ваш статус в ОАЭ":"Your UAE status",
"Первое, о чём спрашивает работодатель в Дубае — ответим прямо в шапке резюме.":"The first thing a Dubai employer asks — we answer it right in the CV header.",
"Виза":"Visa","Когда можете выйти":"When can you start","Гражданство":"Nationality",
"Опыт работы":"Work experience","Последнее место — первым. Обязанности не пишите — протыкайте готовые.":"Latest job first. Don't type duties — tap the ready-made ones.",
"+ Добавить место работы":"+ Add a job","Образование и курсы":"Education & courses",
"Курсы и сертификаты":"Courses & certificates","Медицинская лицензия":"Medical license",
"Выберите 6–12. Подсказки подстроились под вашу профессию.":"Pick 6–12. Suggestions adapted to your profession.",
"Свой навык":"Your own skill","Напишите и нажмите Enter":"Type and press Enter",
"Языки":"Languages","Желаемая зарплата":"Desired salary","Необязательно — но с ней предложений больше.":"Optional — but you get more offers with it.",
"Мы собрали варианты из ваших ответов — выберите и поправьте под себя. Этот блок обязательный: работодатели читают его первым.":"We assembled options from your answers — pick one and adjust. Employers read this first.",
"Ваш текст":"Your text","Ваше резюме":"Your CV",
"Скачать резюме PDF — русская + английская версии":"Download CV PDF — Russian + English versions","Готовим файлы…":"Preparing files…","Готово! Оба PDF в загрузках 🤍":"Done! Both PDFs are in your downloads",
"Отправить резюме в TLNT — подберём вакансию":"Send CV to TLNT — we'll match you with a job",
"Включить меня в базу кандидатов TLNT — предлагать подходящие вакансии в Дубае":"Add me to the TLNT candidate base — offer me matching jobs in Dubai",
"Бесплатно · без водяных знаков · оба файла сразу в загрузки · копия уходит рекрутерам TLNT — подберём вам вакансию":"Free · no watermarks · both files download instantly · a copy goes to TLNT recruiters — we will match you with a job",
"Посмотреть резюме":"Preview CV","Закрыть":"Close","Резюме заполняется по мере ответов":"Your CV builds up as you answer",
"Должность":"Job title","Компания, город":"Company, city","Годы":"Years","Обязанности — протыкайте подходящие":"Duties — tap the ones that fit",
"Настройте кадр":"Adjust the frame","Двигайте фото пальцем и приближайте ползунком — в кадре останетесь только вы.":"Drag the photo and zoom with the slider — only you stay in the frame.",
"Отмена":"Cancel","Готово!":"Done!","— необязательно":"— optional","— необяз.":"— optional","— портфолио":"— portfolio"
};
const UIrev = {}; Object.keys(UI).forEach(k=>UIrev[UI[k]]=k);

let lang = localStorage.getItem("tlnt_resume_lang") || "ru";

/* translate first text node of an element */
function swapNode(n, dict){
  const t = n.textContent;
  const k = t.trim();
  if(!k) return;
  const hit = dict[k] || dict[t];
  if(hit !== undefined){
    n.textContent = t.replace(k, hit);
  }
}
function walk(dict){
  document.querySelectorAll("h1,h2,h3,p,label,button,span,em,b,i,div.cat,div.plabel span,a").forEach(el=>{
    [...el.childNodes].forEach(n=>{ if(n.nodeType===3) swapNode(n, dict); });
  });
  // chips / cards / variants are pure-text buttons
  document.querySelectorAll(".chip,.pcard,.cat").forEach(el=>{
    const k = el.textContent.trim();
    const d = (lang==="en") ? T : Trev;
    if(d[k]) el.textContent = d[k];
  });
}
const Trev = {}; Object.keys(T).forEach(k=>Trev[T[k]]=k);

function applyLang(){
  if(lang==="en"){ walk(UI); } else { walk(UIrev); }
  document.documentElement.lang = lang;
  const b = document.getElementById("langbtn");
  if(b) b.textContent = lang==="ru" ? "EN" : "RU";
}
/* re-apply after dynamic renders */
const _renderXp = window.renderXp, _renderSkills = window.renderSkills, _refreshAbout = window.refreshAbout;
window.renderXp = function(){ _renderXp(); if(lang==="en") applyLang(); };
window.renderSkills = function(){ _renderSkills(); if(lang==="en") applyLang(); };
window.refreshAbout = function(){ _refreshAbout(); if(lang==="en") applyLang(); };

/* toggle button in nav */
(function(){
  const nav = document.querySelector("nav .in");
  const b = document.createElement("button");
  b.id="langbtn"; b.type="button";
  b.style.cssText="margin-left:10px;background:transparent;border:1.5px solid #d8cebd;color:#3f3a33;font-weight:700;font-size:14px;padding:7px 16px;border-radius:100px;cursor:pointer;font-family:inherit";
  b.textContent = lang==="ru" ? "EN" : "RU";
  b.onclick = ()=>{ lang = lang==="ru" ? "en" : "ru"; localStorage.setItem("tlnt_resume_lang", lang); location.reload(); };
  nav.appendChild(b);
})();

/* ===== ENGLISH PDF ===== */
function escE(s){return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;")}
window.docHTMLen = function(){
  const S = JSON.parse(localStorage.getItem("tlnt_resume")||"{}");
  const roleEn = tr(S.roleName||"");
  const tg=S.tg?("Telegram: "+(S.tg.startsWith("@")?S.tg:"@"+S.tg)):"";
  const ig=S.ig?("Instagram: "+(S.ig.startsWith("@")?S.ig:"@"+S.ig)):"";
  const contacts=[S.phone?("Tel: "+S.phone):"", S.wa?("WhatsApp: "+S.wa):"", tg, ig, S.email].filter(Boolean).join(" · ");
  const meta=[tr(S.c_city||""), S.nat?("Nationality: "+escE(S.nat)):"", tr(S.u_visa||""), tr(S.u_avail||""), S.l_salary?("Salary: "+tr(S.l_salary)):""].filter(Boolean).join(" · ");
  let xp="";
  (S.xp||[]).forEach(x=>{ if(!(x.t||x.c)) return;
    xp+='<div class="dxp"><div class="t">'+escE(tr(x.t))+(x.c?" — "+escE(x.c):"")+'</div><div class="d">'+escE(x.d)+"</div>"+
      ((x.duties&&x.duties.length)?("<ul>"+x.duties.map(d=>"<li>"+escE(tr(d))+"</li>").join("")+"</ul>"):"")+"</div>"; });
  const dha=S.e_dha?('<div>'+escE(tr(S.e_dha))+'</div>'):"";
  /* about: template-match RU auto variant -> EN twin, else keep as-is */
  let about = S.about||"";
  const sen=S.seniority||"", sk=(S.skills||[]).slice(0,3).map(tr).join(", "), visa=tr(S.u_visa||""), av=tr(S.u_avail||"");
  if(about){
    about = roleEn + (sen==="Опыт 3+ лет"?" with 3+ years of experience":sen==="Опыт 1–3 года"?" with 1–3 years of experience":"") + ". " +
      (sk?sk+". ":"") + (visa?visa+". ":"") + (av?("Availability: "+av+"."):"");
  }
  return '<div class="doc">'+
    '<div class="dhead">'+(S.photo?'<img src="'+S.photo+'" alt="">':"")+
    '<div><div class="dname">'+(escE(S.name)||"Your name")+'</div>'+
    '<div class="drole">'+escE(roleEn)+'</div>'+
    '<div class="dmeta">'+escE(contacts)+(contacts&&meta?"<br>":"")+escE(meta)+'</div></div></div>'+
    (about?'<h3>About</h3><div>'+escE(about)+'</div>':"")+
    (xp?'<h3>Work experience</h3>'+xp:"")+
    ((S.skills&&S.skills.length)?'<h3>Skills</h3><div>'+S.skills.map(s=>escE(tr(s))).join(" · ")+'</div>':"")+
    ((S.edu||S.courses||dha)?'<h3>Education</h3>'+(S.edu?'<div>'+escE(S.edu)+'</div>':"")+(S.courses?'<div>'+escE(S.courses)+'</div>':"")+dha:"")+
    ((S.langs&&S.langs.length)?'<h3>Languages</h3><div>'+S.langs.map(l=>escE(tr(l))).join(" · ")+'</div>':"")+
    '<div class="dfoot">made with tlnt.ae — staff recruitment in Dubai</div></div>';
};

applyLang();
})();
