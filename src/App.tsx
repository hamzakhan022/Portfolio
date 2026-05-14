import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from 'motion/react';
import { ArrowRight, Menu, Github, Linkedin, Mail, X, Plus, Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';

const TechCanvas = ({ color = "primary" }: { color?: string }) => (
  <div className="absolute inset-0 overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity duration-1000">
    <div className="absolute inset-0" style={{ 
      backgroundImage: `radial-gradient(circle at 2px 2px, ${color === 'primary' ? '#000' : '#444'} 1px, transparent 0)`,
      backgroundSize: '24px 24px' 
    }} />
    <motion.div 
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
    />
    <motion.div 
      initial={{ y: "-100%" }}
      animate={{ y: "100%" }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
      className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"
    />
  </div>
);

const Cursor = ({ isHovering }: { isHovering: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorOpacity = useMotionValue(0);
  const [isPressed, setIsPressed] = useState(false);
  
  // Outer circle spring with slightly more lag for "fancy" feel
  const outerX = useSpring(mouseX, { damping: 25, stiffness: 80 });
  const outerY = useSpring(mouseY, { damping: 25, stiffness: 80 });
  
  const cursorSize = isHovering ? 60 : 20;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorOpacity.set(1);
    };
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, cursorOpacity]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-primary/30 rounded-full pointer-events-none z-[10001] hidden md:block backdrop-blur-[1px]"
        animate={{
          width: isPressed ? cursorSize * 0.8 : cursorSize,
          height: isPressed ? cursorSize * 0.8 : cursorSize,
          borderWidth: isHovering ? "1px" : "1.5px",
        }}
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: cursorOpacity
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[10001] hidden md:block"
        animate={{
          scale: isPressed ? 2.5 : 1,
        }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: cursorOpacity
        }}
      />
    </>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);
  const words = ["ARCHITECT", "ENGINEER", "FOUNDER", "HAMZA"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const wordInterval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % words.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center p-12 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center space-y-12 relative z-10">
        <div className="overflow-hidden h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[currentWord]}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="font-serif text-5xl md:text-8xl font-extralight tracking-tighter uppercase text-primary"
            >
              {words[currentWord]}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-between font-sans text-[10px] uppercase tracking-[0.4em] font-black text-neutral-300">
            <span>Loading System</span>
            <span>{percent}%</span>
          </div>
          <div className="h-[2px] w-full bg-neutral-100 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: `${percent}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-16 h-16 opacity-10 pointer-events-none select-none">
        <img src="/input_file_0.png" alt="" className="w-full h-full object-contain grayscale" />
      </div>

      <div className="absolute bottom-12 left-12 right-12 flex justify-between font-sans text-[8px] uppercase tracking-[0.3em] text-neutral-300">
        <span>EST. 2024</span>
        <span>PEAK PERFORMANCE ARCHITECTURE</span>
        <span>© 2026</span>
      </div>
    </motion.div>
  );
};

const projects = [
  {
    id: "fbr",
    title: "FBR e-Invoicing SaaS",
    description: "Architected and launched a production-ready multi-tenant SaaS platform from scratch. Integrated real-time invoice submission to FBR API with IRN/USIN tracking.",
    detailedDescription: "A high-concurrency SaaS solution designed to handle massive throughput of financial data. The platform ensures 100% compliance with local taxation laws through automated real-time reporting and immutable record-keeping.",
    technologies: "Next.js 14, NestJS, PostgreSQL, Prisma, Redis, Docker, Nginx, AWS EC2",
    fullStack: ["Next.js 14 (Frontend)", "NestJS (Backend)", "PostgreSQL (Database)", "Redis (Caching)", "Docker & Nginx (Infrastructure)"],
    features: ["Real-time API Sync", "Automated QR Generation", "Multi-tenant RBAC", "Immutable Audit Logs"],
    category: "FOUNDER & FULL-STACK"
  },
  {
    id: "bank",
    title: "Bank Statement Converter",
    description: "Robust SaaS converting bank statement PDFs to structured Excel with 100% accuracy. Features 5-tier subscription system with Stripe.",
    detailedDescription: "Leveraging custom OCR algorithms and pattern recognition to parse complex financial documents into structured formats. Built with a focus on data privacy and enterprise-grade reliability.",
    technologies: "Next.js, TypeScript, Flask, SQLite, Stripe, PyMuPDF, Tesseract OCR",
    fullStack: ["Next.js (Interface)", "Flask (OCR Engine)", "SQLite (Persistence)", "Stripe (Payments)", "PyMuPDF (Parsing)"],
    features: ["Batch Processing", "Pattern Recognition", "Stripe Integration", "Usage Analytics"],
    category: "SELF-BUILT SAAS"
  },
  {
    id: "pos-system",
    title: "Enterprise POS & Inventory",
    description: "Cloud-based Point of Sale and Inventory Management system for retail enterprises with real-time analytics and offline-first capabilities.",
    detailedDescription: "A comprehensive enterprise solution managing inventory across multiple warehouses, featuring real-time stock tracking, automated reordering, and deep analytics dashboards. Built for multi-region scalability.",
    technologies: "React, Node.js, MongoDB, Material UI, Redis, AWS S3",
    fullStack: ["React (Dashboard)", "Node.js (API)", "MongoDB (Data Store)", "Redis (Sync)", "Material UI (Design System)"],
    features: ["Multi-warehouse Support", "Real-time Analytics", "Offline Synchronization", "Supplier Management"],
    category: "ENTERPRISE SOLUTION"
  }
];

const skills = [
  { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "PHP", "C#"] },
  { category: "Frontend", items: ["React.js", "Next.js 16", "Tailwind CSS", "Redux Toolkit", "SWR"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Express.js", "Laravel", ".NET 8"] },
  { category: "Cloud & Dev", items: ["AWS EC2", "Docker", "Nginx", "GitHub Actions", "Git"] }
];

const experiences = [
  {
    role: "Full-Stack Software Engineer",
    company: "MCA Global (Main Course Associates)",
    period: "07/2024 – Present",
    details: [
      "Architected and maintain the Enterprise Email Automation infrastructure serving 15+ Global clients.",
      "Engineered AI-powered budgeting systems with OpenAI GPT-4o and PostgreSQL optimization.",
      "Developed high-security Practice Management Platforms with multi-layer RBAC."
    ]
  },
  {
    role: "Founder & Full-Stack Developer",
    company: "fbreinvoicing.com (SaaS)",
    period: "2025 – Present",
    details: [
      "Independently built and launched a production-ready multi-tenant e-invoicing platform.",
      "Implemented real-time FBR API integrations with QR-code generation.",
      "Deployed on Dockerized AWS infrastructure with 99.9%+ uptime."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "National IT Board (NITB)",
    period: "07/2024 – 08/2024",
    details: [
      "Contributed to internal government dashboards and management tools.",
      "Designed and optimized backend APIs with MongoDB data models."
    ]
  }
];

const testimonials = [
  {
    quote: "Hamza's ability to architect scalable systems is unmatched. He transformed our operations with absolute technical authority.",
    author: "Sherry",
    role: "CEO, MCA Global"
  },
  {
    quote: "Precision and reliability are at the core of Hamza's work. A true expert in engineering high-performance infrastructure.",
    author: "Asif",
    role: "CEO, Main Course Associates"
  },
  {
    quote: "A rare talent who understands the intersection of complex legal requirements and seamless technological execution.",
    author: "Farhan",
    role: "COO & Director, Cross Border Legal"
  },
  {
    quote: "The inventory system Hamza built is flawless. It has brought a new level of intelligence to our textile operations.",
    author: "Sajjad Gohar",
    role: "Owner, Gohar & Sons (Textile Inventory)"
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsInteractive(true);
      } else {
        setIsInteractive(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden bg-background text-on-background md:cursor-none"
    >
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Cursor isHovering={isInteractive} />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[1000] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-20 py-8 bg-background/40 backdrop-blur-md">
        <a href="/" className="font-serif text-xl font-light tracking-[0.2em] hover:opacity-70 transition-opacity uppercase">
          Hamza
        </a>
        
        <div className="hidden md:flex gap-12 font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400">
          {['Work', 'Experience', 'Trust', 'Skills', 'CV', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a href="mailto:ameerhamza200345@gmail.com" className="hidden md:block text-primary font-sans text-[9px] uppercase tracking-[0.4em] font-bold border-b border-primary pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all">
            Let's talk
          </a>
          <button className="md:hidden p-2">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-40 md:pt-60 px-6 md:px-20 pb-40 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-40 relative z-10">
          <div className="md:col-span-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-extralight uppercase leading-[1.1] tracking-[-0.01em] text-primary"
            >
              Architecting<br />Complex Systems.
            </motion.h1>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10 mt-12"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-neutral-200" />
                <h3 className="font-sans text-[10px] uppercase tracking-[0.5em] font-semibold text-neutral-300">
                  Senior Full-Stack Engineer
                </h3>
              </div>
              <p className="font-sans text-xl md:text-2xl text-neutral-500 leading-relaxed max-w-xl font-light">
                Engineering <span className="text-primary font-normal italic">high-performance digital infrastructure</span> with absolute technical authority. Currently specializing in SaaS optimization and production automation.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div id="work" className="space-y-60 relative z-10">
          {projects.map((project, index) => {
            const isExpanded = expandedProject === project.id;
            
            return (
              <motion.section 
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 md:grid-cols-12 gap-12 items-center group ${isExpanded ? 'bg-neutral-50/50 p-8 md:p-12 -mx-4 md:-mx-12 rounded-2xl' : ''}`}
              >
                <motion.div 
                  layout
                  className={`md:col-span-7 ${index % 2 === 0 ? 'md:order-1' : 'md:col-start-6 md:order-2'} cursor-pointer`}
                  onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                >
                  <div className="relative overflow-hidden bg-neutral-50 aspect-[16/9] border border-neutral-100 flex items-center justify-center group-hover:bg-neutral-100 transition-colors duration-700 rounded-lg">
                    <TechCanvas />
                    <div className="relative z-10 text-center p-12 w-full">
                      <div className="font-sans text-[9px] uppercase tracking-[0.6em] text-neutral-300 mb-6 font-bold">{project.category}</div>
                      <div className="font-serif text-3xl md:text-4xl font-light text-neutral-400 group-hover:text-primary transition-colors duration-700 select-none tracking-widest uppercase px-12">
                        {project.title.split(' ').map(word => <div key={word} className="my-1">{word}</div>)}
                      </div>
                      <motion.div 
                        initial={false}
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center bg-white/80 backdrop-blur-sm text-primary shadow-sm hover:scale-110 transition-transform"
                      >
                        <Plus size={18} strokeWidth={1} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  layout
                  className={`md:col-span-4 ${index % 2 === 0 ? 'md:col-start-9 md:order-2' : 'md:col-start-1 md:order-1'}`}
                >
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.5em] text-neutral-200">0{index + 1}</span>
                      <h2 className="font-serif text-4xl md:text-5xl font-extralight leading-[1.1] tracking-tight uppercase">
                        {project.title}
                      </h2>
                    </div>
                    
                    <p className="font-sans text-lg text-neutral-400 leading-relaxed font-light">
                      {project.description}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: "circOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-8 space-y-10 border-t border-neutral-100 mt-8">
                            <div className="space-y-4">
                              <h4 className="font-sans text-[9px] uppercase tracking-[0.4em] font-black text-neutral-300">Detailed Architecture</h4>
                              <p className="font-sans text-sm text-neutral-500 leading-relaxed">{project.detailedDescription}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <h4 className="font-sans text-[9px] uppercase tracking-[0.4em] font-black text-neutral-300">Stack</h4>
                                <ul className="space-y-2">
                                  {project.fullStack.map(item => (
                                    <li key={item} className="font-sans text-[11px] text-neutral-400 font-medium list-disc ml-4">{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-4">
                                <h4 className="font-sans text-[9px] uppercase tracking-[0.4em] font-black text-neutral-300">Key Features</h4>
                                <ul className="space-y-2">
                                  {project.features.map(item => (
                                    <li key={item} className="font-sans text-[11px] text-neutral-400 font-medium list-disc ml-4">{item}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="flex flex-wrap gap-x-6 gap-y-4 pt-6 border-t border-neutral-100 font-sans text-[10px] uppercase tracking-widest text-neutral-300 font-bold">
                        {project.technologies.split(', ').slice(0, 3).join(' / ')}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8">
                      <button 
                        onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                        className="inline-flex items-center gap-6 font-sans text-[9px] uppercase tracking-[0.4em] font-black group/link"
                      >
                        <span className="border-b border-primary pb-1 group-hover/link:text-neutral-400 group-hover/link:border-neutral-400 transition-all font-semibold">
                          {isExpanded ? 'Minimize' : 'View Architecture'}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? -90 : 0 }}
                          className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover/link:border-primary transition-colors"
                        >
                          {isExpanded ? <X size={14} strokeWidth={1} /> : <ArrowRight size={14} strokeWidth={1} />}
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-8"
                          >
                            <a 
                              href="#" 
                              className="font-sans text-[9px] uppercase tracking-[0.4em] font-black text-primary border-b border-primary pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all"
                            >
                              Case Study.pdf
                            </a>
                            <a 
                              href="#" 
                              className="font-sans text-[9px] uppercase tracking-[0.4em] font-black text-neutral-400 border-b border-neutral-200 pb-1 hover:text-primary hover:border-primary transition-all"
                            >
                              GitHub Repo
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </motion.section>
            );
          })}
        </div>
      </main>

      {/* Experience Section */}
      <section id="experience" className="py-60 px-6 md:px-20 bg-neutral-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-40 space-y-12"
              >
                <div className="space-y-6">
                  <div className="font-sans text-[10px] uppercase tracking-[0.8em] text-neutral-300 font-black">
                    Chronicle
                  </div>
                  <h2 className="font-serif text-5xl md:text-8xl font-extralight uppercase tracking-tighter leading-[0.8] text-primary">
                    The<br />Trajectory.
                  </h2>
                </div>
                
                <div className="space-y-6 p-8 border border-neutral-100 rounded-2xl bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] font-bold text-neutral-400">System Status: Active</span>
                  </div>
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed uppercase tracking-widest font-light">
                    Scaling enterprise architecture across global markets and high-concurrency environments.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-8 relative">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-neutral-100 hidden md:block" />
              
              <div className="space-y-32 md:pl-20">
                {experiences.map((exp, idx) => (
                  <motion.div 
                    key={exp.company}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 1 }}
                    className="group relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[85px] top-4 w-2 h-2 rounded-full bg-neutral-200 border-4 border-white group-hover:bg-primary transition-colors duration-500 hidden md:block" />
                    
                    <div className="space-y-10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full border border-neutral-100 bg-white font-sans text-[9px] uppercase tracking-[0.4em] font-black text-neutral-300">
                            {exp.period}
                          </div>
                          <h3 className="font-serif text-4xl md:text-5xl font-light uppercase tracking-tight text-neutral-800 group-hover:text-primary transition-colors duration-500">
                            {exp.role}
                          </h3>
                        </div>
                        <div className="font-sans text-[10px] uppercase tracking-[0.5em] font-black text-neutral-300 group-hover:text-neutral-500 transition-colors">
                          {exp.company}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        {exp.details.map((detail, i) => (
                          <div 
                            key={i} 
                            className="relative pl-12 group/detail"
                          >
                            <Plus size={12} className="absolute left-0 top-1.5 text-neutral-100 group-hover/detail:text-primary transition-colors duration-500" strokeWidth={1} />
                            <p className="font-sans text-lg md:text-xl text-neutral-400 font-light leading-relaxed group-hover/detail:text-neutral-600 transition-colors duration-500">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Technical Footprint */}
                      <div className="flex items-center gap-10 opacity-20 group-hover:opacity-100 transition-all duration-700">
                        <div className="flex -space-x-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border border-neutral-100 bg-white" />
                          ))}
                        </div>
                        <div className="font-sans text-[8px] uppercase tracking-[0.4em] font-black text-neutral-300">
                          Architecture Protocol / SEC-0{idx + 1}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-60 px-6 md:px-20 bg-background overflow-hidden relative border-t border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                <div className="font-sans text-[10px] uppercase tracking-[0.8em] text-neutral-300 font-black">
                  Philosophy
                </div>
                <h2 className="font-serif text-[clamp(2rem,10vw,8rem)] font-extralight uppercase leading-[0.85] tracking-tighter text-primary">
                  The Essence<br />of Less.
                </h2>
                <p className="font-sans text-xl md:text-3xl text-neutral-400 max-w-3xl leading-relaxed italic font-light">
                  "Complexity is the enemy of reliability. I build systems where every line of code serves a singular purpose, every architectural choice is deliberate, and every interface is distilled to its most potent form."
                </p>
              </motion.div>
            </div>
            <div className="md:col-span-4 relative hidden md:block">
              <div className="w-full aspect-square border border-neutral-100 rounded-full flex items-center justify-center p-20">
                <div className="w-full h-full border border-neutral-100 rounded-full flex items-center justify-center p-20">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="trust" className="py-60 px-6 md:px-20 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="font-sans text-[10px] uppercase tracking-[0.8em] text-neutral-300 font-black">
                Endorsements
              </div>
              <h2 className="font-serif text-5xl md:text-8xl font-extralight uppercase tracking-tighter leading-[0.8] text-primary">
                Commonplace<br />of Trust.
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-[9px] uppercase tracking-[0.4em] text-neutral-400 max-w-[200px] leading-relaxed"
            >
              Strategic partnerships built on technical excellence and unwavering reliability.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200/50 border border-neutral-200/50">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-12 md:p-20 space-y-12 hover:bg-neutral-50 transition-colors duration-700 group"
              >
                <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-200 group-hover:border-primary/20 group-hover:text-primary/20 transition-colors">
                  <Plus size={20} strokeWidth={1} />
                </div>
                <p className="font-serif text-2xl md:text-3xl font-light leading-snug text-neutral-800 italic">
                  "{t.quote}"
                </p>
                <div className="space-y-2">
                  <div className="font-sans text-[11px] uppercase tracking-[0.3em] font-black text-primary">
                    {t.author}
                  </div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-medium">
                    {t.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="py-60 bg-white px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50/50 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-5xl md:text-7xl font-extralight uppercase tracking-tighter leading-[0.9]">
                  Inventory.
                </h2>
                <p className="mt-8 font-sans text-neutral-400 max-w-xs leading-relaxed uppercase text-[9px] tracking-[0.4em] font-semibold">
                  Technologies deployed in critical performance environments.
                </p>
              </motion.div>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-x-24 sm:gap-y-24">
              {skills.map((skillGroup, idx) => (
                <motion.div 
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-8"
                >
                  <h4 className="font-sans text-[9px] uppercase tracking-[0.6em] font-semibold text-neutral-300 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-neutral-200" />
                    {skillGroup.category}
                  </h4>
                  <ul className="grid grid-cols-1 gap-4">
                    {skillGroup.items.map(item => (
                      <li key={item} className="font-sans text-xl font-extralight text-neutral-800 tracking-tight hover:translate-x-3 transition-transform duration-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CV Download Section */}
      <section id="cv" className="py-20 px-6 md:px-20 border-y border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-center md:text-left"
          >
            <div className="font-sans text-[10px] uppercase tracking-[0.8em] text-neutral-300 font-black">
              Documentation
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-extralight uppercase tracking-tighter text-primary">
              The Complete Dossier.
            </h2>
          </motion.div>
          <motion.a 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            href="/my-cv.pdf" // USER: Replace "/my-cv.pdf" with the actual path to your CV file
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-10 py-8 px-16 border border-neutral-100 hover:border-primary transition-all duration-700 rounded-full bg-neutral-50/50 hover:bg-white shadow-sm hover:shadow-xl group"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.6em] font-black text-neutral-400 group-hover:text-primary transition-colors">Download CV / Portfolio</span>
            <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
              <ArrowRight size={16} className="rotate-45" />
            </div>
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-40 pb-12 px-6 md:px-20 relative bg-neutral-50/20 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-20 relative z-10">
          <div className="space-y-12">
            <div className="font-serif text-5xl md:text-8xl font-extralight tracking-tighter uppercase leading-[0.8] text-primary">
              Muhammad<br />Ameer Hamza
            </div>
            <div className="flex items-center gap-4 font-sans text-[9px] uppercase tracking-[0.5em] font-black text-neutral-300">
              <span className="w-16 h-[1px] bg-neutral-200" />
              Islamabad \ Remote-First
            </div>
          </div>
          
          <div className="flex flex-col gap-20 w-full md:w-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Mail, label: 'Email', href: 'mailto:ameerhamza200345@gmail.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-ameer-hamza-416154363/' },
                { icon: Github, label: 'GitHub', href: 'https://github.com/hamzakhan022' },
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/hamzagraphs/' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Connect on ${social.label}`}
                  className="group flex flex-col items-center justify-center p-6 border border-neutral-100 hover:border-primary/20 hover:bg-white transition-all duration-500 rounded-xl gap-4"
                >
                  <social.icon size={18} className="text-neutral-300 group-hover:text-primary transition-colors" strokeWidth={1} />
                  <span className="font-sans text-[8px] uppercase tracking-[0.3em] font-black text-neutral-400 group-hover:text-primary transition-colors">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="flex flex-col items-start md:items-end gap-6 text-center md:text-right">
              <div className="space-y-2">
                <div className="font-sans text-[8px] uppercase tracking-[0.3em] text-neutral-400">
                  © 2026 HAMZA — CURATED ESSENCE
                </div>
                <div className="font-sans text-[8px] uppercase tracking-[0.3em] text-neutral-300 font-bold">
                  Performance Optimized Architecture
                </div>
              </div>
              
              <div className="w-24 h-24 opacity-20 hover:opacity-50 transition-opacity">
                <img src="/input_file_0.png" alt="Signature Brand Mark" className="w-full h-full object-contain grayscale" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
