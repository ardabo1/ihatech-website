"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Instagram, Linkedin, X, Youtube, ChevronDown, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Hero3DModel from "@/components/Hero3DModel";
// Basit fade-in animasyonu için bir custom hook
const useFadeInOnScroll = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const { top } = el.getBoundingClientRect();
      if (top < window.innerHeight * 0.85) {
        el.classList.add("opacity-100", "translate-y-0");
        el.classList.remove("opacity-0", "translate-y-8");
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return ref;
};

const NAV_LINKS = [
  { name: "Ana Sayfa", href: "#hero" },
  { name: "Hakkımızda", href: "#about" },
  { name: "Uçaklarımız", href: "#planes" },
  { name: "Hedeflerimiz", href: "#goals" },
  { name: "Ekibimiz", href: "#team" },
  { name: "Sponsorluk", href: "#sponsorship" },
];

const SOCIALS = [
  { icon: Instagram, href: "https://www.instagram.com/ihatech_iyte", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ihatech-iztech/?viewAsMember=true", label: "LinkedIn" },
  { icon: X, href: "https://x.com/ihatech_iyte", label: "X" },
  { icon: Youtube, href: "https://www.youtube.com/@IHATECH-j8p", label: "YouTube" },
];
// --------- Dark Mode: Theme Toggle ---------
import ThemeToggle from "@/components/ThemeToggle";
// --------- End of Dark Mode: Theme Toggle ---------

// ------ Navbar (Güncellenmiş) ------
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [logoFlipped, setLogoFlipped] = useState(false);

  useEffect(() => {
    if (!resolvedTheme) return;
    setLogoFlipped(true);
    const timeout = setTimeout(() => setLogoFlipped(false), 500);
    return () => clearTimeout(timeout);
  }, [resolvedTheme]);

  // Eğer tema henüz çözülmediyse (ilk yükleme), logoyu koyu versiyonla başlat.
  const isDarkTheme = resolvedTheme === "dark" || !resolvedTheme;
  const logoSrc = isDarkTheme ? "/ihatech-logo1.png" : "/ihatech-logo.png";

  return (
    <>
      <nav className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 text-xl">
          <Image
            src={logoSrc}
            alt="IHATECH Logo"
            width={96}
            height={96}
            className="w-24 h-auto border-2 border-blue-600 rounded-full bg-white p-1 dark:bg-slate-900 transform-gpu transition-transform duration-500"
            style={{
              transform: logoFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            priority
          />
          İHATECH
        </a>

        {/* Links (Desktop) */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={clsx(
                "text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors font-medium",
                "hover:bg-blue-50 dark:hover:bg-blue-900/40 dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] rounded px-2 py-1"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Socials, Theme Toggle & Mobile Menu */}
        <div className="flex gap-4 items-center ml-4">
          <div className="hidden sm:flex gap-4 border-r border-slate-200 dark:border-slate-700 pr-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                 className={clsx(
                   "text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors",
                   "hover:bg-blue-50 dark:hover:bg-blue-900/40 dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] rounded p-2"
                 )}>
                <Icon size={20} />
              </a>
            ))}
          </div>
          <ThemeToggle />

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40"
            aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <span className="text-xl leading-none">&times;</span>
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden">
          <div className="ml-auto h-full w-64 max-w-[80%] bg-white dark:bg-slate-900 shadow-xl p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Menü</span>
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                aria-label="Menüyü Kapat"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg leading-none">&times;</span>
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-slate-800 dark:text-slate-200 px-2 py-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/40"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// ... (Diğer fonksiyonlar aynı kalabilir) ...

// ----- Ana Sayfa (Güncellenmiş Arka Plan) -----
export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // className patch fonksiyonu hâlâ kullanılabilir durumda bırakıyoruz
  function patchDarkModeClasses(className: string) {
    return className
      .replace(/\bbg-white\b/g, 'bg-white dark:bg-slate-900')
      .replace(/\bborder-slate-100\b/g, 'border-slate-100 dark:border-slate-800')
      .replace(/\btext-slate-800\b/g, 'text-slate-800 dark:text-slate-200')
      .replace(/\btext-slate-700\b/g, 'text-slate-700 dark:text-slate-200');
  }

  return (
    // bg-slate-50'yi dark:bg-slate-950 yaparak karanlık modu aktif ettik
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Navbar />
      <Hero />
      <AboutMission />
      <Planes />
      <Timeline />
      <Team />
      <SponsorshipPackages />
      <Sponsors />
      <Footer />
    </main>
  );
}

// ------ Hero Section ------
function Hero() {
  const sectionRef = useFadeInOnScroll();
  return (
    <section id="hero" ref={sectionRef}
      className="max-w-7xl mx-auto pt-16 pb-24 flex flex-col md:flex-row items-center gap-12 px-6 opacity-0 translate-y-8 transition-all duration-1000">
      
      {/* 3D Model Şov Alanı */}
      <div className="mx-auto md:mx-0 flex-1 md:flex-[3] w-full flex items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40">
        {/* Daha önce oluşturduğumuz tel kafes İHA simülasyonunu buraya çağırıyoruz */}
        <Hero3DModel />
      </div>

      {/* Content */}
      <div className="flex-1 md:flex-[2] flex flex-col items-start justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4 leading-tight">
          İHATECH Otonom İHA Takımı
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-200 mb-8 w-full max-w-xl leading-relaxed">
          İYTE bünyesinde savunma sanayine yenilik getirmek için kurulan IHATECH. Tam otonom sistemler ve yerli yazılımla geliştirdiğimiz hava aracımızla, enstitümüzün teknolojik gücünü gökyüzünde gururla temsil ediyoruz.
        </p>
        <a
          href="#planes"
          className={clsx(
            "inline-block bg-blue-600 text-white px-8 py-3 rounded-xl shadow font-semibold text-lg transition",
            "hover:bg-blue-700 dark:hover:bg-blue-900/40 dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]",
            "hover:text-white dark:hover:text-blue-300"
          )}
        >
          Sistemlerimizi İnceleyin
        </a>
      </div>
    </section>
  );
}

// ------ About & Mission/Vision ------
function AboutMission() {
  const ref = useFadeInOnScroll();
  return (
    <section id="about" ref={ref}
      className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 opacity-0 translate-y-8 transition-all duration-1000">
      {/* About */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Hakkımızda</h2>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
        Türkiye'nin teknoloji üssü İYTE'de doğduk. Ülkemizin savunma sanayisindeki tam bağımsızlık hedefine 
        yürekten inanan 45 kişilik dev bir mühendis ordusuyuz. Hedefimiz; otonom sistemleri sıfırdan inşa ederek 
        göklerdeki yerimizi almak ve havacılık teknolojilerinde standartları yeniden belirlemek.
        </p>
      </div>
      {/* Mission & Vision */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Misyon</h3>
          <p className="text-slate-700 dark:text-slate-200">Gelişmiş otonom kilitlenme ve uçuş algoritmalarıyla göklerde tam hakimiyet kuran, 
            yüksek performanslı İHA'lar üretmek.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Vizyon</h3>
          <p className="text-slate-700 dark:text-slate-200">Yarışma sahalarında zirveyi hedefleyerek, ülkemizin otonom savunma teknolojilerine 
            yön veren lider mühendislik ekibi olmak.</p>
        </div>
      </div>
    </section>
  );
}

// ------ Planes ------
const PLANES = [
  {
    name: "IHA-X",
    // 1. ADIM: Görselin dosya yolunu buraya ekliyoruz
    image: "/planes/talon.png", 
    info: "X-UAV Talon modelinin kendi aviyonik ve yazılım sistemlerimizle donatılmış hali.",
    specs: [
      { label: "Kanat Açıklığı", value: "1718 mm" },
      { label: "Ağırlık", value: " 3617 gr" },
      { label: "Maksimum Hız", value: "18 m/s" },
      { label: "Uçuş Süresi", value: "≈24 dk" }
    ]
  },
];

function Planes() {
  const ref = useFadeInOnScroll();
  return (
    <section id="planes" ref={ref}
      className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-6 opacity-0 translate-y-8 transition-all duration-1000">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Uçaklarımız</h2>
      <div className="flex flex-col gap-6">
        {PLANES.map((plane) => (
          <div key={plane.name}
               className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center px-8 py-6 gap-6 transition-colors">
            
            {/* 2. ADIM: Placeholder kutusunu resim kutusuna çevirdik */}
            <div className="relative w-40 h-32 md:w-56 md:h-40 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700/50 p-2">
              {plane.image ? (
                <Image
                  src={plane.image}
                  alt={`${plane.name} İHA Modeli`}
                  fill
                  className="object-contain p-4 drop-shadow-lg" // drop-shadow uçağı havada duruyormuş gibi gösterir
                  unoptimized
                />
              ) : (
                <span className="text-blue-600 font-semibold">Görsel Yükleniyor</span>
              )}
            </div>

            {/* Info Kısmı (Aynı kalıyor) */}
            <div className="flex-1 min-w-[180px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{plane.name}</h3>
                <p className="text-slate-600 dark:text-slate-400">{plane.info}</p>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3">
                {plane.specs.map((spec) => (
                  <div key={spec.label} className="text-slate-700 dark:text-slate-200 text-sm bg-slate-50 dark:bg-slate-800 rounded px-3 py-1 border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">{spec.label}:</span> <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
// ------ Timeline (Yenilenen Tasarım) ------
const GOALS = [
  {
    year: "2026",
    title: "TEKNOFEST: Savaşan İHA",
    descriptionShort: "Teknofest Savaşan İHA: Otonom it dalaşı ve hedef kilitlenme yeteneklerimizle göklerde hakimiyet kurduğumuz ana sahnemiz.",
    image: "/timeline/teknofest-logo.png", // png dosyası public/timeline/ altında olmalı. Eğer yoksa aşağıda placeholder dalı kullanılacak.
    descriptionLong: "Türkiye'nin en prestijli teknoloji yarışmasında, otonom hava-hava muharebesi senaryolarını gerçekleştiriyoruz. Amacımız, rakip İHA'ları otonom olarak tespit edip kilitlenirken, kendi sistemimizi güvenle havada tutacak karmaşık kaçınma manevralarını başarıyla icra etmektir.",
  },
  {
    year: "2027",
    title: "SUAS Competition",
    descriptionShort: "Yapay zeka ile anlık görüntü işleme ve hassas faydalı yük bırakma görevlerinde yarışacağımız küresel arena.",
    image: "/timeline/suas-logo.png",
    descriptionLong: "Amerika Birleşik Devletleri'nde düzenlenen bu yarışmada; otonom uçuş, yapay zeka ile yerdeki hedeflerin görüntü işleme ile tespiti, engelden kaçınma ve belirlenen koordinatlara hassas faydalı yük (payload) bırakma gibi zorlu görevleri entegre bir sistemle çözmeyi hedefliyoruz.",
  },
  {
    year: "2028",
    title: "IARC",
    descriptionShort: "GPS sinyalinin bile olmadığı zorlu ortamlarda, yapay zekamızın otonom karar alma sınırlarını test edeceğimiz zirve.",
    image: "/timeline/iarc-logo.png",
    descriptionLong: "Otonom robotik sistemlerin zirvesi kabul edilen bu organizasyonda, dışarıdan hiçbir navigasyon (GPS) desteği almadan, tamamen yapay zeka ve sensör füzyonu ile kapalı/karmaşık alanlarda karar alabilen ileri düzey algoritmalarımızı test ediyoruz.",
  },
  {
    year: "2029",
    title: "IMAV Competition",
    descriptionShort: "Sürü (swarm) İHA'lar ve mikro hava araçlarıyla yüksek manevra kabiliyetimizi kanıtlayacağımız uluslararası platform.",
    image: "/timeline/imav-logo.png",
    descriptionLong: "Mikro Hava Araçları ve sürü (swarm) teknolojilerine odaklanan bu uluslararası platformda, birden fazla İHA'nın birbiriyle haberleşerek ortak görev icra etmesi ve dar alanlarda yüksek manevra kabiliyeti sergilemesi üzerine Ar-Ge yapıyoruz.",
  },
  {
    year: "2030",
    title: "UAS Challenge",
    descriptionShort: "Tam otonom navigasyon ve görev icrası yeteneklerimizi dünya standartlarında sergileyeceğimiz organizasyon.",
    image: "/timeline/uas-logo.png",
    descriptionLong: "İngiltere merkezli bu yarışmada, arama-kurtarma ve insani yardım senaryoları üzerine çalışıyoruz. Tam otonom rota planlama, hedef tanıma ve zorlu hava koşullarında stabil uçuş yeteneklerimizi dünya standartlarında sergilemeyi amaçlıyoruz.",
  },
];

// Detay kısmı için fade-in animasyonu sağlamak amacıyla bir custom hook.
function useFadeInAfterChange(dependency: any) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("opacity-0");
    void el.offsetWidth; // trigger reflow
    el.classList.add("opacity-100");
    const timer = setTimeout(() => {
      el.classList.remove("opacity-100");
      el.classList.add("opacity-0");
    }, 0);
    // Clean up remove fade-out class for next use
    return () => {
      clearTimeout(timer);
      el.classList.remove("opacity-100");
      el.classList.add("opacity-0");
    };
  }, [dependency]);
  return ref;
}

function Timeline() {
  const sectionRef = useFadeInOnScroll();
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Detay için fade-in animasyonu. Her seçim değiştiğinde tetiklenir.
  const detailRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = detailRef.current;
    if (el) {
      el.classList.remove("opacity-0");
      setTimeout(() => {
        el.classList.add("opacity-100");
      }, 10);
      return () => {
        el.classList.remove("opacity-100");
        el.classList.add("opacity-0");
      };
    }
  }, [selectedIdx]);

  const selected = GOALS[selectedIdx];

  return (
    <section
      id="goals"
      ref={sectionRef}
      className="max-w-7xl mx-auto px-6 py-12 opacity-0 translate-y-8 transition-all duration-1000"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-10">Hedeflerimiz</h2>
      <div
        // Kolon genişlik oranı 4fr-6fr
        className="grid grid-cols-1 md:grid-cols-[4fr_6fr] gap-8"
      >
        {/* Sol Sütun: Timeline Kartları */}
        <div className="flex flex-col gap-4">
          {GOALS.map((goal, idx) => (
            <button
              key={goal.year}
              onClick={() => setSelectedIdx(idx)}
              aria-current={selectedIdx === idx ? "true" : undefined}
              className={clsx(
                "text-left rounded-xl px-6 py-4 border transition-all duration-200 cursor-pointer select-none shadow-sm group",
                selectedIdx === idx
                  ? "border-blue-600 dark:border-blue-600 bg-blue-50/60 dark:bg-slate-900 ring-2 ring-blue-100 dark:ring-blue-800"
                  : "border-slate-200 dark:border-slate-800 hover:bg-blue-50/40 dark:hover:bg-blue-900/40 dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]",
                "focus:outline-none focus:ring-2 focus:ring-blue-300",
                "hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-300"
              )}
              style={{
                boxShadow: selectedIdx === idx
                  ? "0 2px 12px 0 rgba(37, 99, 235, 0.10), 0 0px 0 0 transparent"
                  : "0 1px 6px 0 rgba(60,60,120,0.03)",
                transition: "box-shadow 0.15s"
              }}
            >
              <div className="flex items-baseline gap-4">
                <span className={clsx(
                  "text-blue-700 font-bold text-lg",
                  selectedIdx === idx && "drop-shadow-sm"
                )}>
                  {goal.year}
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold text-base group-hover:text-blue-600 dark:group-hover:text-blue-300">{goal.title}</span>
              </div>
              <div className="mt-1 text-slate-600 dark:text-slate-300 text-sm">{goal.descriptionShort}</div>
            </button>
          ))}
        </div>
        {/* Sağ Sütun: Detay Panosu */}
        <div className="sticky top-32 h-fit">
          <div
            ref={detailRef}
            className="opacity-0 transition-opacity duration-500 ease-in"
            key={selectedIdx}
          >
            <div className="flex flex-col items-center bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl shadow-lg p-8">
              <div className="mb-6 w-full flex items-center justify-center">
                <div className="relative w-48 h-24 md:w-60 md:h-32 rounded-xl overflow-hidden bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-slate-800 flex items-center justify-center">
                  {selected.image ? (
                    <Image
                      src={selected.image}
                      alt={selected.title + " logo"}
                      width={240}
                      height={120}
                      className="object-contain w-full h-full"
                      priority={true}
                      onError={(e) => {
                        // fallback görseli için
                        (e.target as HTMLImageElement).src = "/placeholder-timeline.png";
                      }}
                    />
                  ) : (
                    <span className="text-blue-600 text-lg font-bold">Logo</span>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">{selected.title}</h3>
              <div className="text-slate-800 dark:text-slate-200 text-base md:text-lg text-center" style={{ maxWidth: 540 }}>
                {selected.descriptionLong}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------ Team ------
const TEAM = [
  {
    title: "Yönetim",
    members: [
      { name: "Mehmet Şakir Akın", role: "Takım Kaptanı" },
      { name: "Arda Furkan Akat Kul", role: "Yazılım Kaptanı" },
      { name: "Bekir Oğuzhan Çorak", role: "Kurumsal İletişim Sorumlusu" },
      { name: "Erdem Anıl Özbakan", role: "Mekanik Kaptanı" },
      { name: "Tuna Kerem Ülker", role: "Mekanik Üyesi" },
      { name: "Hüseyin Duman", role: "Sponsorluk Sorumlusu" },
      { name: "İbrahim Gürkan", role: "Elektronik Kaptanı" },
      { name: "Çınar Aslan", role:"Sosyal Medya Sorumlusu"}
    ]
  },
  {
    title: "Yazılım",
    members: [
      { name: "Mert Tavzer", role: "" },
      { name: "Halil İbrahim Yesirci", role: "" },
      { name: "Umut Anıl Altun", role: "" },
      { name: "İsmail Kanal", role: "" },
      { name: "Ada Boran Sipahi", role: "" },
      { name: "Malik Deniz", role: "" },
      { name: "Kaan Şahal", role: "" },
      { name: "Tevfik Kesmez", role: "" },
      { name: "Arkadaş Ilgaz Kaygusuz", role: "" }
    ]
  },
  {
    title: "Mekanik",
    members: [
      { name: "Talha Taşcı", role: "" },
      { name: "Mert Kayalar", role: "" },
      { name: "Alperen Şen", role: "" },
      { name: "Emre Altun", role: "" },
      { name: "Hakkı Kamil Ülker", role: "" },
      { name: "Aleyna Bulduk", role: "" },
    ]
  },
  {
    title: "Elektronik",
    members: [
      { name: "Aleyna Mahmutoğlu", role: "" },
      { name: "Aslı Soytürk", role: "" },
      { name: "Eren Güler", role: "" },
      { name: "Samet Topallı", role: "" },
      { name: "Umut Anıl Altun", role: "" },
      { name: "Şinasi Eren Kocakanat", role: "" },
    ]
  },
  {
    title: "Sponsorluk",
    members: [
      { name: "İrem Sinan", role: "" },
      { name: "Gökmen Akman", role: "" },
      { name: "Seydi Kıvanç Karaağaç", role: "" },
      { name: "Neslihan Baltacı", role: "" },
      { name: "Emir Günyol", role: "" },
    ]
  },
  {
    title: "Sosyal Medya",
    members: [
      { name: "Gülce Su Yardımcı", role: "" },
      { name: "Öykü Sezer", role: "" },
      { name: "Asım Cevdet Dukan", role: "" },
      { name: "Beray Nur Yıldırım", role: "" },
    ]
  }
];

function Team() {
  const ref = useFadeInOnScroll();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="team"
      ref={ref}
      className="max-w-7xl mx-auto px-6 py-12 opacity-0 translate-y-8 transition-all duration-1000"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-10">Üyelerimiz</h2>
      <div className="flex flex-col gap-5 md:gap-6">
        {TEAM.map((dep, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={dep.title} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              {/* Accordion Bar */}
              <button
                type="button"
                onClick={() => handleToggle(idx)}
                aria-expanded={isOpen}
                className={clsx(
                  "w-full flex items-center justify-between px-6 py-4 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer text-lg font-semibold text-slate-800 dark:text-slate-200 transition",
                  isOpen ? "rounded-t-2xl" : "rounded-2xl",
                  "hover:bg-blue-50 active:bg-blue-100",
                  "dark:hover:bg-blue-900/40 dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] dark:hover:text-blue-300"
                )}
              >
                <span>{dep.title}</span>
                <ChevronDown
                  className={`ml-2 transition-transform transform ${isOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`}
                  size={28}
                  aria-hidden="true"
                />
              </button>
              {/* Accordion Content (collapsible) */}
              <div
                className={clsx(
                  "transition-all duration-400 ease-in-out",
                  isOpen
                    ? "max-h-[60vh] overflow-y-auto overscroll-contain"
                    : "max-h-0 overflow-hidden"
                )}
                aria-hidden={!isOpen}
              >
                <div className="px-6 pb-6 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-5">
                    {dep.members.map((m, mIdx) => (
                      <div
                        key={m.name + m.role}
                        className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center px-3 py-4 text-center"
                      >
                        {/* Fotoğraf */}
                        <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 mb-2 flex items-center justify-center text-blue-600 font-bold text-lg">
                        <span>{m.name.split(" ").filter((_, i, arr) => i === 0 || i === arr.length - 1).map((x) => x[0]).join("")}</span>
                        </div>
                        <div className="font-medium text-slate-800 dark:text-slate-200 text-sm">{m.name}</div>
                        <div className="text-sm text-slate-500 mt-1">{m.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ------ Sponsorship Packages ------
const PACKAGES = [
  {
    title: "Bronz",
    price: "₺10.000+",
    features: [
      "Teknofest standında logonuz",
      "Toplu teşekkür listesinde adınız",
      "İnternet sitemizde logonuz"
    ]
  },
  {
    title: "Gümüş",
    price: "₺30.000+",
    features: [
      "İHA alt gövdesinde veya yanlarında logonuz (küçük boy)",
      "Teknofest standında logonuz",
      "Formamızda kol veya omuz üzerinde logonuz",
      "Hikaye paylaşımı",
      "İnternet sitemizde logonuz",
    ]
  },
  {
    title: "Altın",
    price: "₺60.000+",
    features: [
      "İHA kuyruk veya kanat altlarında logonuz (orta boy)",
      "Formamızda sırt bölgesinde logonuz",
      "Teknofest alanında roll-up yerleşimi",
      "Aylık özel teşekkür postu",
      "Sitemizde logonuz",
      "Lansmana davet"
    ]
  },
  {
    title: "Platin",
    price: "₺160.000+",
    features: [
      "Takım adı ile birlikte isminiz",
      "İHA kanat üstü ve gövde üzerinde logonuz (en büyük boy)",
      "Formamızda göğüs üzerinde logonuz",
      "Teknofest alanında size özel stand alanı ve roll-up yerleşimi",
      "Size özel tanıtım filmi ve her paylaşımda logonuz",
      "Lansmana protokol olarak davet",
    ]
  }
];

function SponsorshipPackages() {
  // PACKAGES dizisini burada 4 elemana çıkardığınızdan emin olun!
  const ref = useFadeInOnScroll();
  return (
    <section id="sponsorship" ref={ref}
      className="max-w-7xl mx-auto px-6 py-12 opacity-0 translate-y-8 transition-all duration-1000">
      <h2 className="text-2xl font-bold text-blue-600 mb-10">Sponsorluk Paketlerimiz</h2>
      <div className="flex flex-row gap-6 justify-between w-full overflow-x-auto md:overflow-visible">
        {PACKAGES.map((pack) => (
          <div
            key={pack.title}
            className={clsx(
              "flex-shrink-0 bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-slate-800 rounded-2xl shadow-sm p-8 flex flex-col items-center w-[270px] max-w-[270px]",
              "transition",
              "hover:bg-blue-50 dark:hover:bg-blue-900/40 dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            )}
          >
            <h3 className="text-xl font-bold text-blue-600">{pack.title}</h3>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 my-2">{pack.price}</div>
            <ul className="flex flex-col gap-2 text-slate-700 dark:text-slate-200 mb-4">
              {pack.features.map((f) => (
                <li key={f} className="flex gap-2 items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                  {f}
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </section>
  );
}

const SPONSORS = [
  { name: "KESİAD", logo: "/sponsors/kesiad.png" },
  { name: "Teknopark İzmir", logo: "/sponsors/teknopark-izmir.png" },
  { name: "İYTE Rektörlük", logo: "/sponsors/iyte-rektörlük.png" },
  { name: "Adem Kul", logo: "" } // Logosu olmayanlara boş bırakıyoruz

];

function Sponsors() {
  const ref = useFadeInOnScroll();
  return (
    <section id="sponsors" ref={ref}
      className="max-w-7xl mx-auto px-6 py-10 opacity-0 translate-y-8 transition-all duration-1000">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">Sponsorlarımız</h2>
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {SPONSORS.map((sp) => (
          <div
            key={sp.name}
            className={clsx(
              "w-40 h-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center transition",
              "hover:bg-blue-50 dark:hover:bg-blue-900/40 dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            )}
          >
            <div className="w-24 h-12 flex items-center justify-center mb-2">
              {/* Eğer logo varsa resmi bas, yoksa baş harfleri şık bir kutuda göster */}
              {sp.logo ? (
                <Image
                  src={sp.logo}
                  alt={`${sp.name} logo`}
                  width={96}
                  height={48}
                  className="object-contain max-h-12 max-w-full"
                  unoptimized
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                    {sp.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}
            </div>
            <span className="text-blue-600 font-semibold text-sm">{sp.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ------ Footer ------
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 mt-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Contact Info */}
        <div>
          <h4 className="font-bold text-lg mb-2">İletişim</h4>
          <div className="text-slate-100 text-sm">info@ihatechiyte.com</div>
          <div className="text-slate-400 text-sm mt-1">İzmir Yüksek Teknoloji Enstitüsü, Urla</div>
        </div>
          {/* Socials */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
               className={clsx(
                 "text-slate-400 hover:text-blue-400 transition-colors",
                 "hover:bg-blue-50 dark:hover:bg-blue-900/40 dark:hover:text-blue-300 dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] rounded p-2"
               )}>
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// (eski Home bileşeni kaldırıldı; güncel sürüm yukarıda tanımlı)