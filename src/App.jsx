import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Nadix Innovations — Portfolio (v2)
 * - Fond hero en 3D (three.js, gratuit, pas de service tiers) : réseau de
 *   nœuds qui flotte et tourne doucement — écho direct au canvas n8n.
 * - i18n FR / EN / AR avec bascule RTL automatique pour l'arabe.
 * - Tailwind requis. À coller dans app/page.jsx (Next.js) ou un projet Vite.
 */

// ---------- i18n ----------
const dict = {
  fr: {
    nav: { expertise: "Expertise", workflows: "Workflows", dashboards: "Dashboards", contact: "Contact" },
    cta: "Discutons",
    hero: {
      eyebrow: "AI · SaaS · Data Solutions",
      title1: "On automatise vos process,",
      title2: "on libère votre temps.",
      sub: "Nadix Innovations conçoit des agents IA, automatise vos workflows, développe vos plateformes SaaS et transforme vos données en décisions.",
      ctaPrimary: "Voir le portfolio",
      ctaSecondary: "Demander un audit gratuit",
    },
    expertise: {
      eyebrow: "Ce qu'on fait",
      title: "Une expertise technique de bout en bout",
      sub: "De l'agent IA au dashboard final, on couvre toute la chaîne de valeur de la donnée.",
    },
    workflows: {
      eyebrow: "Portfolio — n8n",
      title: "Des workflows pensés pour faire gagner du temps",
      sub: "Captures réelles de workflows livrés.",
    },
    dashboards: {
      eyebrow: "Portfolio — Power BI",
      title: "Des dashboards faits pour décider, pas pour décorer",
      sub: "Captures sur données anonymisées — aucun embed live, aucune fuite de données.",
    },
    contact: {
      eyebrow: "Travaillons ensemble",
      title: "Une idée d'automatisation ou de dashboard en tête ?",
      sub: "Réponse sous 24h. Premier échange gratuit pour cadrer votre besoin.",
      email: "Envoyer un email",
    },
    services: [
      ["🤖", "AI Agents", "Agents LLM sur-mesure pour automatiser la prise de décision."],
      ["⚙️", "Workflow Automation", "Automatisation de processus métier avec n8n."],
      ["💻", "SaaS Development", "Plateformes SaaS complètes : FastAPI, Next.js, PostgreSQL."],
      ["🔗", "API & Intégrations", "Connexion de vos outils existants en un système cohérent."],
      ["📊", "Data Analytics & BI", "Transformation de données brutes en décisions actionnables."],
      ["📈", "Power BI Dashboards", "Tableaux de bord interactifs pensés pour le pilotage."],
      ["🐍", "Python Development", "Scripts, ETL, et backends robustes en Python."],
    ],
  },
  en: {
    nav: { expertise: "Expertise", workflows: "Workflows", dashboards: "Dashboards", contact: "Contact" },
    cta: "Let's talk",
    hero: {
      eyebrow: "AI · SaaS · Data Solutions",
      title1: "We automate your processes,",
      title2: "you get your time back.",
      sub: "Nadix Innovations builds AI agents, automates your workflows, develops your SaaS platforms, and turns your data into decisions.",
      ctaPrimary: "View portfolio",
      ctaSecondary: "Get a free audit",
    },
    expertise: {
      eyebrow: "What we do",
      title: "End-to-end technical expertise",
      sub: "From the AI agent to the final dashboard, we cover the whole data value chain.",
    },
    workflows: {
      eyebrow: "Portfolio — n8n",
      title: "Workflows built to save real time",
      sub: "Real screenshots of delivered workflows.",
    },
    dashboards: {
      eyebrow: "Portfolio — Power BI",
      title: "Dashboards built to decide, not to decorate",
      sub: "Screenshots on anonymized data — no live embed, no data leak.",
    },
    contact: {
      eyebrow: "Let's work together",
      title: "Got an automation or dashboard idea in mind?",
      sub: "Reply within 24h. First chat is free to scope your needs.",
      email: "Send an email",
    },
    services: [
      ["🤖", "AI Agents", "Custom LLM agents to automate decision-making."],
      ["⚙️", "Workflow Automation", "Business process automation with n8n."],
      ["💻", "SaaS Development", "Full SaaS platforms: FastAPI, Next.js, PostgreSQL."],
      ["🔗", "API & Integrations", "Connecting your existing tools into one coherent system."],
      ["📊", "Data Analytics & BI", "Turning raw data into actionable decisions."],
      ["📈", "Power BI Dashboards", "Interactive dashboards built for steering the business."],
      ["🐍", "Python Development", "Scripts, ETL pipelines, and robust Python backends."],
    ],
  },
  ar: {
    nav: { expertise: "الخبرات", workflows: "مسارات العمل", dashboards: "لوحات البيانات", contact: "تواصل" },
    cta: "لنتحدث",
    hero: {
      eyebrow: "الذكاء الاصطناعي · SaaS · البيانات",
      title1: "نُؤتمت مساراتك،",
      title2: "ونمنحك وقتك من جديد.",
      sub: "تصمم Nadix Innovations وكلاء ذكاء اصطناعي، وتؤتمت سير العمل، وتطوّر منصات SaaS، وتحوّل بياناتك إلى قرارات.",
      ctaPrimary: "عرض الأعمال",
      ctaSecondary: "طلب تدقيق مجاني",
    },
    expertise: {
      eyebrow: "ما الذي نقوم به",
      title: "خبرة تقنية شاملة من البداية للنهاية",
      sub: "من وكيل الذكاء الاصطناعي إلى لوحة البيانات النهائية، نغطي كل سلسلة قيمة البيانات.",
    },
    workflows: {
      eyebrow: "أعمالنا — n8n",
      title: "مسارات عمل صُممت لتوفير الوقت الحقيقي",
      sub: "لقطات حقيقية من مسارات عمل تم تسليمها.",
    },
    dashboards: {
      eyebrow: "أعمالنا — Power BI",
      title: "لوحات بيانات صُممت لاتخاذ القرار، لا للتزيين",
      sub: "لقطات على بيانات مجهّلة — بدون عرض مباشر، بدون أي تسريب للبيانات.",
    },
    contact: {
      eyebrow: "لنعمل معًا",
      title: "هل لديك فكرة أتمتة أو لوحة بيانات؟",
      sub: "الرد خلال 24 ساعة. أول تواصل مجاني لتحديد حاجتك.",
      email: "إرسال بريد إلكتروني",
    },
    services: [
      ["🤖", "وكلاء ذكاء اصطناعي", "وكلاء LLM مخصصون لأتمتة اتخاذ القرار."],
      ["⚙️", "أتمتة سير العمل", "أتمتة العمليات التجارية باستخدام n8n."],
      ["💻", "تطوير SaaS", "منصات SaaS كاملة: FastAPI و Next.js و PostgreSQL."],
      ["🔗", "واجهات برمجية وتكامل", "ربط أدواتك الحالية في نظام واحد متجانس."],
      ["📊", "تحليل البيانات وذكاء الأعمال", "تحويل البيانات الخام إلى قرارات قابلة للتنفيذ."],
      ["📈", "لوحات Power BI", "لوحات تفاعلية مصممة لقيادة الأعمال."],
      ["🐍", "تطوير بايثون", "سكريبتات و ETL وخوادم خلفية قوية بلغة بايثون."],
    ],
  },
};

const workflows = [
  { img: "/portfolio/workflow-invoice.png", title: "Extraction de factures", tag: "FastAPI · PyMuPDF · Groq" },
  { img: "/portfolio/workflow-relance.png", title: "Relance impayés automatisée", tag: "n8n · Gmail · FR/AR" },
  { img: "/portfolio/workflow-cv.png", title: "Screening de CV par IA", tag: "n8n · Groq · Sheets" },
  { img: "/portfolio/workflow-veille.png", title: "Veille concurrentielle", tag: "n8n · Scraping · Alerts" },
];

const dashboards = [
  { img: "/portfolio/dashboard-kpi.png", title: "KPI Commercial", tag: "CA · Ventes · Objectifs" },
  { img: "/portfolio/dashboard-finops.png", title: "FinOps Cloud", tag: "Coûts infra · Tendances" },
  { img: "/portfolio/dashboard-logistique.png", title: "Suivi Logistique", tag: "Commandes · SLA" },
];

// ---------- 3D Hero (three.js, no paid service) ----------
function ThreeHero() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const nodeCount = 26;
    const nodePositions = [];
    const nodeGeo = new THREE.SphereGeometry(0.07, 12, 12);

    for (let i = 0; i < nodeCount; i++) {
      const isAccent = i % 5 === 0;
      const mat = new THREE.MeshBasicMaterial({
        color: isAccent ? 0xffb454 : 0x00d9b5,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
      );
      mesh.position.copy(pos);
      nodePositions.push(pos);
      group.add(mesh);
    }

    const lineMat = new THREE.LineBasicMaterial({ color: 0x00d9b5, transparent: true, opacity: 0.25 });
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 2.4) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]]);
          group.add(new THREE.Line(lineGeo, lineMat));
        }
      }
    }

    let frameId;
    const animate = () => {
      group.rotation.y += 0.0018;
      group.rotation.x += 0.0006;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      nodeGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />;
}

function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-12 max-w-2xl">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00D9B5]">{eyebrow}</p>
        )}
        <h2 className="mt-3 font-display text-3xl font-semibold text-[#E8EAED] md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-[#8B92A8]">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function ImageCard({ img, title, tag, kind }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="group overflow-hidden rounded-xl border border-white/10 bg-[#10141C] transition-colors hover:border-[#00D9B5]/40">
      <div className="aspect-[16/10] w-full overflow-hidden bg-[#0B0E14]">
        {!errored ? (
          <img
            src={img}
            alt={title}
            onError={() => setErrored(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#8B92A8]">
            <span className="text-2xl">{kind === "dashboard" ? "📊" : "⚙️"}</span>
            <span className="font-mono text-[11px]">Remplacer : {img.split("/").pop()}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-medium text-[#E8EAED]">{title}</h3>
        <p className="mt-1 font-mono text-xs text-[#8B92A8]">{tag}</p>
      </div>
    </div>
  );
}

function LangSwitch({ lang, setLang }) {
  const langs = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "ar", label: "ع" },
  ];
  return (
    <div className="flex items-center gap-1 rounded-md border border-white/10 p-1">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`rounded px-2.5 py-1 font-mono text-xs transition-colors ${
            lang === l.code
              ? "bg-[#00D9B5] text-[#0B0E14]"
              : "text-[#8B92A8] hover:text-[#E8EAED]"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function NadixPortfolio() {
  const [lang, setLang] = useState("fr");
  const t = dict[lang];
  const isRTL = lang === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-[#0B0E14] font-sans text-[#E8EAED] antialiased"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Noto+Kufi+Arabic:wght@500;600;700&display=swap');
        .font-display { font-family: ${isRTL ? "'Noto Kufi Arabic'" : "'Space Grotesk'"}, sans-serif; }
        .font-sans { font-family: ${isRTL ? "'Noto Kufi Arabic'" : "'Inter'"}, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-lg font-semibold tracking-tight">
            Nadix <span className="text-[#00D9B5]">Innovations</span>
          </span>
          <nav className="hidden gap-8 font-mono text-xs uppercase tracking-wide text-[#8B92A8] md:flex">
            <a href="#expertise" className="hover:text-[#E8EAED]">{t.nav.expertise}</a>
            <a href="#workflows" className="hover:text-[#E8EAED]">{t.nav.workflows}</a>
            <a href="#dashboards" className="hover:text-[#E8EAED]">{t.nav.dashboards}</a>
            <a href="#contact" className="hover:text-[#E8EAED]">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LangSwitch lang={lang} setLang={setLang} />
            <a
              href="#contact"
              className="hidden rounded-md border border-[#00D9B5]/40 px-4 py-1.5 font-mono text-xs text-[#00D9B5] hover:bg-[#00D9B5]/10 sm:block"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/5">
        <ThreeHero />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B0E14]/10 via-transparent to-[#0B0E14]" />
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFB454]">{t.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </h1>
          <p className="mt-6 max-w-xl text-base text-[#8B92A8] md:text-lg">{t.hero.sub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#workflows"
              className="rounded-md bg-[#00D9B5] px-6 py-3 font-mono text-sm font-medium text-[#0B0E14] hover:bg-[#00D9B5]/90"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#contact"
              className="rounded-md border border-white/15 px-6 py-3 font-mono text-sm text-[#E8EAED] hover:border-white/30"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      <Section id="expertise" eyebrow={t.expertise.eyebrow} title={t.expertise.title} subtitle={t.expertise.sub}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {t.services.map(([icon, title, desc]) => (
            <div key={title} className="rounded-xl border border-white/10 bg-[#10141C] p-6 transition-colors hover:border-[#00D9B5]/30">
              <span className="text-2xl">{icon}</span>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-[#8B92A8]">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="workflows" eyebrow={t.workflows.eyebrow} title={t.workflows.title} subtitle={t.workflows.sub}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {workflows.map((w) => (
            <ImageCard key={w.title} {...w} kind="workflow" />
          ))}
        </div>
      </Section>

      <Section id="dashboards" eyebrow={t.dashboards.eyebrow} title={t.dashboards.title} subtitle={t.dashboards.sub}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dashboards.map((d) => (
            <ImageCard key={d.title} {...d} kind="dashboard" />
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title}>
        <div className="flex flex-col items-start gap-6 rounded-xl border border-white/10 bg-[#10141C] p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#8B92A8]">{t.contact.sub}</p>
          <div className="flex gap-3">
            <a
              href="mailto:contact@nadix-innovations.com"
              className="rounded-md bg-[#00D9B5] px-6 py-3 font-mono text-sm font-medium text-[#0B0E14] hover:bg-[#00D9B5]/90"
            >
              {t.contact.email}
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/15 px-6 py-3 font-mono text-sm text-[#E8EAED] hover:border-white/30"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/5 px-6 py-8 text-center font-mono text-xs text-[#8B92A8]">
        © {new Date().getFullYear()} Nadix Innovations — Algérie
      </footer>
    </div>
  );
}