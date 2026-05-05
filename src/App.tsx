import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Award,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Factory,
  GraduationCap,
  Handshake,
  Headphones,
  MailCheck,
  MapPin,
  Menu,
  MessageSquareText,
  Mic2,
  PackageCheck,
  Phone,
  PlayCircle,
  Presentation,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
  Users,
  Warehouse,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  need: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

const contactFormEndpoint = "https://formsubmit.co/ajax/c42662b8933d4b83fde78e5d16416dff";

const navItems = [
  ["Home", "home"],
  ["Program", "program"],
  ["Sectors", "sectors"],
  ["Demo", "demo"],
  ["Method", "method"],
  ["Contact", "contact"]
] as const;

const trustItems = [
  { icon: GraduationCap, label: "Experienced teachers" },
  { icon: Target, label: "Workplace-focused training" },
  { icon: Building2, label: "In-person company courses" },
  { icon: PlayCircle, label: "Free demo lesson" },
  { icon: Award, label: "Certificates and reports" }
];

const problemItems = [
  "Misunderstood delivery instructions",
  "Unprofessional client emails",
  "Poor handling of delays",
  "Confusing phone calls",
  "Weak international communication",
  "Loss of client confidence"
];

const solutionCards = [
  { icon: MailCheck, title: "Professional Emails", text: "Clear subject lines, polished replies, status updates, apologies, and follow-ups." },
  { icon: MessageSquareText, title: "Calls & WhatsApp", text: "Practical scripts for quick confirmations, delay updates, and client coordination." },
  { icon: Truck, title: "Logistics Vocabulary", text: "Transport, shipment, customs, warehousing, documentation, and operations language." },
  { icon: Headphones, title: "Client Complaints", text: "Calm, professional responses that protect trust when problems happen." },
  { icon: PackageCheck, title: "Delivery Updates", text: "Precise communication around ETAs, missing documents, and shipment status." },
  { icon: Presentation, title: "Meetings & Reporting", text: "Confident speaking for operational meetings, progress updates, and summaries." }
];

const modules = [
  ["Professional introductions", "Introduce roles, departments, responsibilities, and company services with confidence."],
  ["Core logistics vocabulary", "Use essential transport, supply chain, warehousing, and shipping terms accurately."],
  ["Phone calls and WhatsApp communication", "Handle quick operational conversations, confirmations, and urgent updates."],
  ["Professional logistics emails", "Write polished emails for clients, partners, suppliers, and internal teams."],
  ["Delays, complaints, and problem solving", "Explain issues clearly, apologize professionally, and offer next steps."],
  ["Meetings and operational updates", "Share status updates, ask clarifying questions, and report progress."],
  ["Quotations and client communication", "Discuss prices, timelines, documents, and service details professionally."],
  ["Final simulation and assessment", "Apply the full workflow in realistic scenarios and receive measured feedback."]
];

const demoIncludes = [
  "Short company needs discussion",
  "Real logistics English activity",
  "Email improvement example",
  "Speaking role play",
  "Program presentation",
  "Q&A with HR or managers"
];

const sectors = [
  { icon: Truck, title: "Logistics companies" },
  { icon: PackageCheck, title: "Transport companies" },
  { icon: Warehouse, title: "Warehousing teams" },
  { icon: BarChart3, title: "Supply chain departments" },
  { icon: Headphones, title: "Customer service teams" },
  { icon: Send, title: "Import/export teams" },
  { icon: Factory, title: "Industrial companies" },
  { icon: BriefcaseBusiness, title: "Corporate administration teams" }
];

const methodSteps = [
  { icon: ClipboardCheck, title: "Needs Analysis", text: "We identify the roles, communication pain points, documents, and situations your team handles every week." },
  { icon: BadgeCheck, title: "Placement Check", text: "Employees are grouped by practical level so the training feels useful, relevant, and efficient from day one." },
  { icon: Users, title: "In-Person Training", text: "Your team practices emails, calls, meetings, and workplace scenarios with an experienced trainer." },
  { icon: Award, title: "Assessment & Report", text: "Managers receive certificates, progress insights, and a practical view of team improvement." }
];

const reasons = [
  "Experienced teachers",
  "Business English specialization",
  "Practical workplace scenarios",
  "Customized examples",
  "In-person engagement",
  "Progress tracking",
  "Certificates",
  "Professional company report"
];

const testimonials = [
  {
    quote:
      "The demo was practical from the first minute. Our team immediately saw how better English could improve client updates and internal coordination.",
    name: "Nadia",
    role: "HR Manager, Logistics Group"
  },
  {
    quote:
      "Teacher’s Talk focused on the exact language our operations team uses every day: delays, documents, calls, and delivery problems.",
    name: "Youssef",
    role: "Operations Manager, Transport Company"
  },
  {
    quote:
      "The training gave our customer service team more structure and confidence when writing to international clients.",
    name: "Salma",
    role: "Customer Service Supervisor"
  }
];

const trainingNeeds = [
  "Logistics English",
  "Business English",
  "Email writing",
  "Phone communication",
  "Meetings and presentations",
  "Custom company training"
];

const heroSlides = [
  {
    type: "video",
    src: "/hero-training-video.mp4",
    alt: "Business training video with professional team communication",
    objectPosition: "center center"
  },
  {
    type: "image",
    src: "/hero-boardroom-web.jpg",
    alt: "Business trainer presenting to professionals in a meeting room",
    objectPosition: "62% center"
  },
  {
    type: "image",
    src: "/hero-meeting-web.jpg",
    alt: "Corporate team in a boardroom training session",
    objectPosition: "center center"
  },
  {
    type: "image",
    src: "/hero-warehouse-web.jpg",
    alt: "Warehouse team discussing logistics operations",
    objectPosition: "center 72%"
  }
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 }
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <button
      className="group flex items-center gap-3 rounded-full focus-ring"
      onClick={() => scrollToSection("home")}
      aria-label="Teacher's Talk home"
    >
      <span className="flex h-12 w-[150px] items-center justify-center rounded-full bg-white/85 px-2 shadow-[inset_0_0_0_1px_rgba(0,0,0,.08),0_16px_40px_rgba(0,0,0,.1)] sm:w-[168px]">
        <img
          src="/teachers-talk-logo.png"
          alt="Teacher's Talk logo"
          className="max-h-10 w-full object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </span>
      {!compact && (
        <span className="hidden text-left md:block">
          <span className="block text-sm font-black uppercase text-brand-ink">Teacher&apos;s Talk</span>
          <span className="block text-xs font-semibold text-zinc-500">Talk, Connect, Grow</span>
        </span>
      )}
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  tone = "light"
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow && (
        <p
          className={`mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase shadow-sm ${
            isDark
              ? "border border-white/15 bg-white/10 text-white shadow-[0_12px_34px_rgba(0,0,0,.24)]"
              : "border border-red-200 bg-white/70 text-brand-deep"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl ${
          isDark ? "text-white" : "text-brand-ink"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-base leading-8 sm:text-lg ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
          {text}
        </p>
      )}
    </motion.div>
  );
}

function IconBadge({ icon: Icon, tone = "light" }: { icon: LucideIcon; tone?: "light" | "red" | "dark" }) {
  const toneClass =
    tone === "red"
      ? "bg-gradient-to-br from-brand-red to-brand-deep text-white shadow-glow"
      : tone === "dark"
        ? "bg-brand-ink text-white"
        : "bg-white text-brand-red shadow-[inset_0_0_0_1px_rgba(227,25,25,.12),0_16px_30px_rgba(227,25,25,.12)]";

  return (
    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${toneClass}`}>
      <Icon className="h-5 w-5" />
    </span>
  );
}

function PremiumButton({
  children,
  target,
  variant = "primary",
  icon = true
}: {
  children: string;
  target: string;
  variant?: "primary" | "secondary" | "dark";
  icon?: boolean;
}) {
  const classes =
    variant === "primary"
      ? "btn-primary"
      : variant === "dark"
        ? "btn-dark"
        : "btn-secondary";

  return (
    <button className={`${classes} group focus-ring`} onClick={() => scrollToSection(target)}>
      <span>{children}</span>
      {icon && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
    </button>
  );
}

function HeroScene() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.45], [0, -42]);
  const [activeSlide, setActiveSlide] = useState(0);

  const floating = [
    { text: "30h In-Person Course", icon: Clock3, className: "left-0 top-4", delay: 0 },
    { text: "Free 1h Demo Lesson", icon: PlayCircle, className: "right-0 top-20", delay: 0.2 },
    { text: "Logistics English", icon: Truck, className: "left-4 bottom-28", delay: 0.4 },
    { text: "Emails • Calls • Meetings", icon: MessageSquareText, className: "right-4 bottom-12", delay: 0.1 },
    { text: "Progress Report", icon: BarChart3, className: "left-28 -bottom-4", delay: 0.3 }
  ];

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearTimeout(timeout);
  }, [activeSlide]);

  const slide = heroSlides[activeSlide];

  return (
    <motion.div style={{ y }} className="relative mx-auto min-h-[560px] w-full max-w-[620px] lg:min-h-[680px]">
      <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-white/60 via-red-50/70 to-zinc-100/60 shadow-premium backdrop-blur-2xl" />
      <motion.div
        className="absolute left-0 right-0 top-16 mx-auto h-[380px] w-[380px] rounded-full bg-radial-red opacity-80 blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.62, 0.9, 0.62] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-0 right-0 top-24 mx-auto w-[82%] rounded-[2rem] border border-white/75 bg-white/65 p-5 shadow-premium backdrop-blur-2xl sm:p-7"
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mb-5 flex items-center justify-between border-b border-zinc-200/80 pb-4">
          <div>
            <p className="text-xs font-black uppercase text-brand-red">Professional photo carousel</p>
            <p className="text-sm font-bold text-brand-ink">Business English training in action</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">In session</span>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-[1.75rem] bg-brand-ink text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.12),0_28px_80px_rgba(23,23,23,.18)] sm:h-[480px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ opacity: { duration: 0.9 }, scale: { duration: 4.8, ease: "easeOut" } }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/68 via-zinc-950/18 to-brand-deep/70" />
          <div className="absolute inset-0 opacity-25 grid-mask" />

          <div className="absolute left-5 top-5 max-w-[16rem] rounded-2xl border border-white/22 bg-white/18 p-4 shadow-2xl backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-brand-red">
                <Presentation className="h-4 w-4" />
              </span>
              <p className="text-xs font-black uppercase text-red-100">{slide.alt}</p>
            </div>
            <p className="text-lg font-black leading-tight">Real workplace English, practiced live.</p>
          </div>

          <motion.div
            className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/22 bg-zinc-950/42 p-4 shadow-2xl backdrop-blur-xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase text-red-100">Sample training moment</p>
                <p className="mt-1 text-lg font-black">Delay update role play + email correction</p>
              </div>
              <div className="flex items-center gap-2">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.src}
                    className={`h-2.5 rounded-full transition-all focus-ring ${
                      activeSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70"
                    }`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show hero photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {floating.map((card) => (
        <motion.div
          key={card.text}
          className={`absolute ${card.className} hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-sm font-black text-brand-ink shadow-premium backdrop-blur-xl sm:flex`}
          initial={{ opacity: 0, scale: 0.82, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: card.delay },
            scale: { duration: 0.5, delay: card.delay },
            y: { duration: 4.5, delay: card.delay, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-red-50 text-brand-red">
            <card.icon className="h-4 w-4" />
          </span>
          {card.text}
        </motion.div>
      ))}
    </motion.div>
  );
}

function TrainerFigure() {
  return (
    <div className="relative h-28 w-24">
      <div className="absolute left-8 top-0 h-11 w-11 rounded-full bg-gradient-to-br from-red-100 to-red-300 shadow-lg" />
      <div className="absolute bottom-0 left-4 h-20 w-16 rounded-t-[2rem] bg-gradient-to-br from-brand-red to-brand-deep shadow-glow" />
      <div className="absolute right-0 top-[3.25rem] h-2 w-12 rotate-[-18deg] rounded-full bg-red-200" />
      <div className="absolute left-8 top-14 h-2 w-10 rotate-[20deg] rounded-full bg-red-100" />
    </div>
  );
}

function EmployeeFigure({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className="relative h-24 w-14"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className={`absolute left-3 top-0 h-8 w-8 rounded-full ${color} shadow-lg`} />
      <div className="absolute bottom-0 h-16 w-14 rounded-t-[1.5rem] bg-white/20 shadow-lg" />
      <div className="absolute bottom-5 left-3 h-2 w-8 rounded-full bg-white/35" />
    </motion.div>
  );
}

function HeroMedia() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.45], [0, -32]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearTimeout(timeout);
  }, [activeSlide]);

  return (
    <motion.div style={{ y }} className="relative mx-auto w-full max-w-[660px]">
      <motion.div
        className="absolute -left-10 top-16 h-[24rem] w-[24rem] rounded-full bg-radial-red opacity-80 blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.62, 0.9, 0.62] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-12 bottom-10 h-[18rem] w-[18rem] rounded-full bg-red-200/50 blur-3xl"
        animate={{ scale: [1.05, 0.96, 1.05], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-brand-ink shadow-[0_38px_110px_rgba(23,23,23,.22)]"
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative aspect-[4/5] min-h-[500px] overflow-hidden sm:aspect-[5/6] lg:min-h-[620px]">
          {heroSlides.map((item, index) => {
            const isActive = activeSlide === index;
            const mediaClass = "absolute inset-0 h-full w-full object-cover";
            const mediaStyle = { objectPosition: item.objectPosition };

            return item.type === "video" ? (
              <motion.video
                key={item.src}
                className={mediaClass}
                style={mediaStyle}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden={!isActive}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.08 : 1.02 }}
                transition={{ opacity: { duration: 0.65 }, scale: { duration: 5.6, ease: "easeOut" } }}
              >
                <source src={item.src} type="video/mp4" />
              </motion.video>
            ) : (
              <motion.img
                key={item.src}
                src={item.src}
                alt={isActive ? item.alt : ""}
                className={mediaClass}
                style={mediaStyle}
                loading="eager"
                decoding="async"
                aria-hidden={!isActive}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.09 : 1.02 }}
                transition={{ opacity: { duration: 0.65 }, scale: { duration: 5.6, ease: "easeOut" } }}
              />
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/18 via-transparent to-brand-deep/28" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950/38 to-transparent" />

          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
            {heroSlides.map((item, index) => (
              <button
                key={item.src}
                className={`h-2.5 rounded-full transition-all focus-ring ${
                  activeSlide === index ? "w-9 bg-white" : "w-2.5 bg-white/45 hover:bg-white/75"
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show hero media ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNav = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/72 px-3 py-2 shadow-[0_18px_65px_rgba(23,23,23,.12)] backdrop-blur-2xl">
        <Logo compact />
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="rounded-full px-4 py-2 text-sm font-bold text-zinc-600 transition hover:bg-red-50 hover:text-brand-red focus-ring"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="hidden lg:block">
          <PremiumButton target="demo" icon={false}>
            Book Free Demo
          </PremiumButton>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-full bg-brand-ink text-white shadow-lg focus-ring lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 p-3 shadow-premium backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
          >
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-bold text-brand-ink hover:bg-red-50 focus-ring"
              >
                {label}
                <ChevronRight className="h-4 w-4 text-brand-red" />
              </button>
            ))}
            <button className="btn-primary mt-2 w-full justify-center focus-ring" onClick={() => handleNav("demo")}>
              <span>Book Free Demo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-32 sm:pb-24 lg:min-h-screen lg:pt-40">
      <div className="ambient-field left-[-16rem] top-[-12rem] h-[36rem] w-[36rem] bg-red-200/45" />
      <div className="ambient-field right-[-14rem] top-24 h-[32rem] w-[32rem] bg-zinc-300/45" />
      <div className="absolute inset-0 soft-grid opacity-70" />

      <div className="container-grid relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }} className="min-w-0 max-w-3xl">
          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/70 px-4 py-2 text-xs font-black uppercase text-brand-deep shadow-sm backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-brand-red shadow-[0_0_0_6px_rgba(227,25,25,.12)]" />
            Business English Morocco • In-person company training
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-black leading-[1.04] text-brand-ink sm:text-5xl lg:text-7xl"
          >
            Business English Training That Makes Your Team Sound Professional
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-xl font-semibold leading-8 text-zinc-700">
            Practical in-person English courses for logistics, transport, supply chain, and corporate teams.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
            Teacher&apos;s Talk helps employees communicate clearly and confidently in real workplace situations:
            emails, phone calls, shipment updates, delivery delays, meetings, complaints, and client communication.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PremiumButton target="demo">Book a Free 1-Hour Demo</PremiumButton>
            <PremiumButton target="program" variant="secondary">
              View 30-Hour Program
            </PremiumButton>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["30h", "In-person course"],
              ["8-14", "Ideal group size"],
              ["A2+", "Best starting level"]
            ].map(([metric, label]) => (
              <div key={metric} className="rounded-2xl border border-white/70 bg-white/65 p-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-black text-brand-red">{metric}</p>
                <p className="mt-1 text-xs font-bold uppercase text-zinc-500">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div className="min-w-0">
          <HeroMedia />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section aria-label="Teacher's Talk advantages" className="relative z-20 -mt-6 px-4">
      <motion.div
        className="mx-auto grid max-w-7xl gap-3 rounded-[2rem] border border-white/80 bg-white/75 p-3 shadow-premium backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-5"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {trustItems.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-3xl px-4 py-4 transition hover:bg-red-50/70">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-red-50 text-brand-red">
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-sm font-black text-brand-ink">{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="section-space relative overflow-hidden">
      <div className="ambient-field right-[-18rem] top-20 h-[32rem] w-[32rem] bg-red-100/70" />
      <div className="container-grid relative">
        <SectionHeading
          eyebrow="The hidden cost"
          title="English Mistakes Cost More Than You Think"
          text="In logistics and business, unclear English does not stay small. It slows decisions, creates friction with clients, and makes capable teams sound less professional than they are."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {problemItems.map((item, index) => (
            <motion.div
              key={item}
              className="group relative overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-white via-white to-red-50/80 p-6 shadow-[0_24px_70px_rgba(23,23,23,.1)] transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_26px_80px_rgba(227,25,25,.18)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.05, duration: 0.55 }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-100/70 blur-2xl transition group-hover:bg-red-200/80" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-red via-brand-deep to-transparent" />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brand-ink text-white shadow-[0_18px_36px_rgba(23,23,23,.2)]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-black text-brand-ink">{item}</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-zinc-700">
                A small language gap can create delay, rework, or a weaker company image in front of clients.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="section-space bg-brand-ink text-white">
      <div className="container-grid">
        <SectionHeading
          eyebrow="The solution"
          title="Teacher's Talk Turns English Into a Business Tool"
          text="This is not general English. It is practical, job-specific communication training based on real company situations and the pressure your teams already know."
          tone="dark"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutionCards.map(({ icon, title, text }, index) => (
            <motion.div
              key={title}
              className="dark-card p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.55 }}
            >
              <IconBadge icon={icon} tone="red" />
              <h3 className="mt-6 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-zinc-300">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramSection() {
  return (
    <section id="program" className="section-space relative overflow-hidden scroll-mt-28">
      <div className="ambient-field left-[-18rem] top-10 h-[30rem] w-[30rem] bg-red-100/80" />
      <div className="container-grid relative">
        <div className="grid gap-10 lg:grid-cols-[.86fr_1.14fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              align="left"
              eyebrow="Signature program"
              title="30-Hour Logistics Business English Program"
              text="A focused in-person English training program built for logistics companies and corporate teams that need professional communication fast."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["Format", "30 hours in-person"],
                ["Schedule", "2 sessions/week × 2 hours × 7.5 weeks"],
                ["Ideal group", "8 to 14 employees"],
                ["Best level", "A2+ to B1/B2 employees"]
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-[2rem] border border-red-100 bg-gradient-to-br from-white via-white to-red-50/75 p-5 shadow-[0_20px_58px_rgba(23,23,23,.09)] transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_24px_70px_rgba(227,25,25,.16)]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-ink text-white shadow-[0_14px_30px_rgba(23,23,23,.18)]">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase text-brand-red">{label}</p>
                    <p className="mt-1 font-black text-brand-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 hidden w-px bg-gradient-to-b from-brand-red via-red-200 to-transparent sm:block" />
            <div className="grid gap-4">
              {modules.map(([title, text], index) => (
                <motion.div
                  key={title}
                  className="relative overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-white via-white to-red-50/70 p-5 shadow-[0_22px_64px_rgba(23,23,23,.09)] transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_26px_78px_rgba(227,25,25,.16)] sm:ml-12"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.04, duration: 0.5 }}
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-100/75 blur-2xl" />
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-red via-brand-deep to-transparent" />
                  <span className="relative mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-brand-ink text-sm font-black text-white shadow-[0_16px_34px_rgba(23,23,23,.2)] sm:absolute sm:-left-[4.25rem] sm:top-5">
                    {index + 1}
                  </span>
                  <div className="relative">
                    <h3 className="text-lg font-black text-brand-ink">{title}</h3>
                    <p className="mt-2 font-medium leading-7 text-zinc-700">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="section-space scroll-mt-28">
      <div className="container-grid">
        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-red via-[#bd1111] to-brand-ink p-6 text-white shadow-glow sm:p-10 lg:p-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 premium-lines opacity-35" />
          <div className="relative grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase">
                <CalendarCheck className="h-4 w-4" />
                Free company preview
              </p>
              <h2 className="text-balance text-3xl font-black leading-tight sm:text-5xl">Start With a Free 1-Hour Demo Lesson</h2>
              <p className="mt-6 text-lg leading-8 text-red-50">
                Before committing to the full program, your company can book a free 1-hour demo session. We present
                the course, show real logistics communication examples, and give your team a practical sample lesson.
              </p>
              <div className="mt-8">
                <PremiumButton target="contact" variant="dark">
                  Schedule the Free Demo
                </PremiumButton>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {demoIncludes.map((item, index) => (
                <motion.div
                  key={item}
                  className="rounded-3xl border border-white/20 bg-white/12 p-5 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                >
                  <CheckCircle2 className="mb-4 h-5 w-5 text-red-100" />
                  <p className="font-black">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectorsSection() {
  return (
    <section id="sectors" className="section-space bg-zinc-50 scroll-mt-28">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Target sectors"
          title="Built for Teams That Communicate Under Pressure"
          text="The course is designed for companies where clear English has a direct impact on service quality, speed, and client confidence."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map(({ icon, title }, index) => (
            <motion.div
              key={title}
              className="neo-card group p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.5 }}
            >
              <IconBadge icon={icon} />
              <h3 className="mt-6 text-lg font-black text-brand-ink">{title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section id="method" className="section-space scroll-mt-28">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Company-focused method"
          title="Our Method: Practical, Measurable, Company-Focused"
          text="Teacher's Talk combines a professional training process with the flexibility your company needs."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          {methodSteps.map(({ icon, title, text }, index) => (
            <motion.div
              key={title}
              className="relative rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_rgba(23,23,23,.08)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <span className="absolute right-5 top-5 text-5xl font-black text-zinc-100">{index + 1}</span>
              <IconBadge icon={icon} tone={index === 0 ? "red" : "light"} />
              <h3 className="mt-6 text-xl font-black text-brand-ink">{title}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section className="section-space bg-brand-warm">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Visible transformation"
          title="From Unclear Messages to Professional Client Communication"
          text="Your employees do not need abstract theory. They need language they can use the same day with clients, partners, and managers."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div
            className="rounded-[2rem] border border-red-100 bg-white p-6 shadow-premium"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-xs font-black uppercase text-brand-red">Before</p>
            <div className="rounded-3xl bg-zinc-100 p-6 text-2xl font-black leading-snug text-zinc-500">
              “Shipment late. Customs problem. We send soon.”
            </div>
            <p className="mt-5 leading-7 text-zinc-600">Short, unclear, and risky for client confidence.</p>
          </motion.div>
          <motion.div
            className="rounded-[2rem] border border-red-200 bg-gradient-to-br from-white to-red-50 p-6 shadow-glow"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-xs font-black uppercase text-brand-deep">After</p>
            <div className="rounded-3xl bg-white p-6 text-xl font-bold leading-9 text-brand-ink shadow-inner">
              “Dear Mr. Ahmed, we apologize for the inconvenience. Your shipment has been delayed due to customs
              clearance. Our team is following up and will update you as soon as we receive confirmation.”
            </div>
            <p className="mt-5 leading-7 text-zinc-600">Professional, specific, and reassuring.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="section-space">
      <div className="container-grid">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Why Teacher's Talk"
            title="Why Companies Choose Teacher's Talk"
            text="The training is premium because it is specific, practical, measurable, and delivered in person by teachers who understand professional communication."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason}
                className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.45 }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-red-50 text-brand-red">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="font-black text-brand-ink">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section-space bg-brand-ink text-white">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Credible results"
          title="What Managers Notice First"
          text="The difference is practical: clearer emails, calmer calls, better operational updates, and stronger confidence with clients."
          tone="dark"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              className="dark-card p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
            >
              <div className="mb-6 flex gap-1 text-brand-red">
                {Array.from({ length: 5 }).map((_, star) => (
                  <span key={star} className="text-lg">★</span>
                ))}
              </div>
              <blockquote className="leading-8 text-zinc-200">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-8 border-t border-white/10 pt-5">
                <p className="font-black">{testimonial.name}</p>
                <p className="mt-1 text-sm text-zinc-400">{testimonial.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="section-space relative overflow-hidden">
      <div className="ambient-field left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 bg-red-100/90" />
      <div className="container-grid relative">
        <motion.div
          className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/80 bg-white/75 p-8 text-center shadow-premium backdrop-blur-2xl sm:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-balance text-3xl font-black leading-tight text-brand-ink sm:text-5xl">
            Ready to Improve Your Team&apos;s Business English?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            Book a short meeting with Teacher&apos;s Talk and get a free 1-hour demo lesson for your team.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PremiumButton target="demo">Book Free Demo</PremiumButton>
            <PremiumButton target="contact" variant="secondary">
              Contact Us
            </PremiumButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    need: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.company.trim()) nextErrors.company = "Please enter your company name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Please enter a valid email.";
    if (!form.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!form.need) nextErrors.need = "Please select a training need.";
    if (form.message.trim().length < 10) nextErrors.message = "Please add a short message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("idle");
    setSubmitMessage("");
    if (!validate()) return;

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    if (String(formData.get("_honey") || "").trim()) {
      return;
    }

    setSubmitStatus("sending");

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          "training need": form.need,
          message: form.message.trim(),
          _subject: "New Teacher's Talk demo request",
          _template: "table",
          _captcha: "false",
          _honey: ""
        })
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "The request could not be sent.");
      }

      setSubmitStatus("success");
      setSubmitMessage("Thank you. Your request was sent and Teacher's Talk can now follow up with demo details.");
      setForm({ name: "", company: "", email: "", phone: "", need: "", message: "" });
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(
        "We could not send the request right now. Please try again, email info@teacherstalk.org, or use the WhatsApp button."
      );
    }
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (submitStatus !== "sending") {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const isSubmitting = submitStatus === "sending";

  return (
    <section id="contact" className="section-space bg-zinc-50 scroll-mt-28">
      <div className="container-grid">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Book a Meeting or Request the Free Demo"
              text="Tell us what your team needs. Teacher's Talk will help you choose the right starting point for practical Business English training."
            />
            <div className="mt-8 grid gap-4">
              {[
                { icon: Phone, label: "Phone", value: "0700318140" },
                { icon: MailCheck, label: "Email", value: "info@teacherstalk.org" },
                { icon: MapPin, label: "Location", value: "Rabat-Salé-Kenitra, Morocco" },
                { icon: Building2, label: "Availability", value: "In-person company training" }
              ].map(({ icon, label, value }) => (
                <div key={label} className="neo-card flex items-center gap-4 p-5">
                  <IconBadge icon={icon} />
                  <div>
                    <p className="text-xs font-black uppercase text-zinc-500">{label}</p>
                    <p className="mt-1 font-black text-brand-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.form
            onSubmit={onSubmit}
            className="rounded-[2rem] border border-white/80 bg-white p-5 shadow-premium sm:p-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <input
              className="hidden"
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                value={form.name}
                error={errors.name}
                onChange={(value) => updateField("name", value)}
                autoComplete="name"
                disabled={isSubmitting}
              />
              <Field
                label="Company"
                name="company"
                value={form.company}
                error={errors.company}
                onChange={(value) => updateField("company", value)}
                autoComplete="organization"
                disabled={isSubmitting}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={(value) => updateField("email", value)}
                autoComplete="email"
                disabled={isSubmitting}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                error={errors.phone}
                onChange={(value) => updateField("phone", value)}
                autoComplete="tel"
                disabled={isSubmitting}
              />
              <label className="sm:col-span-2">
                <span className="form-label">Preferred training need</span>
                <select
                  className={`form-input ${errors.need ? "border-brand-red" : ""}`}
                  name="training_need"
                  value={form.need}
                  onChange={(event) => updateField("need", event.target.value)}
                  aria-invalid={Boolean(errors.need)}
                  disabled={isSubmitting}
                >
                  <option value="">Select a training need</option>
                  {trainingNeeds.map((need) => (
                    <option key={need} value={need}>
                      {need}
                    </option>
                  ))}
                </select>
                {errors.need && <span className="form-error">{errors.need}</span>}
              </label>
              <label className="sm:col-span-2">
                <span className="form-label">Message</span>
                <textarea
                  className={`form-input min-h-36 resize-y ${errors.message ? "border-brand-red" : ""}`}
                  name="message"
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Tell us about your team, sector, and training goals."
                  aria-invalid={Boolean(errors.message)}
                  disabled={isSubmitting}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </label>
            </div>
            <button
              className="btn-primary mt-6 w-full justify-center focus-ring disabled:pointer-events-none disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Sending Request..." : "Send Demo Request"}</span>
              <Send className={`h-4 w-4 ${isSubmitting ? "animate-pulse" : ""}`} />
            </button>
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  className="mt-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <p className="font-black">Request sent.</p>
                  <p className="mt-1 text-sm">{submitMessage}</p>
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  className="mt-5 rounded-3xl border border-red-200 bg-red-50 p-5 text-brand-deep"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <p className="font-black">Request not sent.</p>
                  <p className="mt-1 text-sm">{submitMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  disabled = false
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
}) {
  return (
    <label>
      <span className="form-label">{label}</span>
      <input
        className={`form-input ${error ? "border-brand-red" : ""}`}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        disabled={disabled}
      />
      {error && <span className="form-error">{error}</span>}
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-ink px-4 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_.8fr_.8fr_.9fr]">
        <div>
          <Logo compact />
          <p className="mt-5 max-w-sm leading-7 text-zinc-400">
            Premium Business English training for logistics, transport, supply chain, customer service, and corporate teams.
          </p>
        </div>
        <FooterLinks title="Quick links" links={navItems.map(([label, id]) => ({ label, id }))} />
        <FooterLinks
          title="Services"
          links={[
            { label: "Logistics English course", id: "program" },
            { label: "Corporate English training", id: "program" },
            { label: "Free demo lesson", id: "demo" },
            { label: "Company progress report", id: "method" }
          ]}
        />
        <div>
          <h3 className="text-sm font-black uppercase text-white">Contact details</h3>
          <div className="mt-5 space-y-3 text-sm text-zinc-400">
            <p>0700318140</p>
            <p>info@teacherstalk.org</p>
            <p>Rabat-Salé-Kenitra, Morocco</p>
            <p>Talk, Connect, Grow</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Teacher&apos;s Talk. All rights reserved.</p>
        <p>Business English Morocco • Professional English communication • In-person English course</p>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: { label: string; id: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase text-white">{title}</h3>
      <div className="mt-5 space-y-3">
        {links.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollToSection(link.id)}
            className="block text-left text-sm text-zinc-400 transition hover:text-white focus-ring"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setShowBackToTop(window.scrollY > 520);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full border border-zinc-200 bg-white text-brand-ink shadow-[0_18px_48px_rgba(23,23,23,.18)] transition hover:-translate-y-0.5 hover:bg-zinc-100 focus-ring"
            onClick={() => scrollToSection("home")}
            aria-label="Back to top"
            title="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.86 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/212700318140"
        target="_blank"
        rel="noreferrer"
        className="group relative grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_22px_70px_rgba(20,122,58,.28)] focus-ring"
        aria-label="Contact Teacher's Talk on WhatsApp"
        title="WhatsApp"
        initial={{ opacity: 0, y: 18, scale: 0.86 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -5, scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-400/35"
          animate={{ scale: [1, 1.28, 1], opacity: [0.45, 0, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <img
          src="/whatsapp-icon.png"
          alt=""
          className="relative h-14 w-14 object-contain transition-transform duration-300 group-hover:rotate-[-6deg]"
        />
      </motion.a>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-warm text-brand-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSection />
        <SolutionSection />
        <ProgramSection />
        <DemoSection />
        <SectorsSection />
        <MethodSection />
        <BeforeAfterSection />
        <WhySection />
        <TestimonialsSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
}
