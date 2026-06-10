import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Mail, User, BookOpen, Cpu, Award, Send, 
  CheckCircle, AlertCircle, ExternalLink, Code2, 
  Database, Terminal, Settings, Briefcase, GraduationCap,
  Sparkles, Globe, MapPin, Coffee, Code, Layers, FileText
} from 'lucide-react';
import { getProjects } from '../services/projectService';
import { sendMessage } from '../services/messageService';

const Github = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Home = () => {
  // --- Typewriter Effect ---
  const titles = ["Software Engineer", "MERN Stack Developer", "Spring Boot Developer", "AI Enthusiast"];
  const [currentTitleIdx, setCurrentTitleIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 90;
  const deletingSpeed = 40;
  const delayBetweenWords = 2500;

  useEffect(() => {
    let timer;
    const fullWord = titles[currentTitleIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentTitleIdx((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIdx]);

  // --- Dynamic Projects State ---
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedTechFilter, setSelectedTechFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  // --- Skills Metadata (Brand Colors & Glows) ---
  const skillMeta = {
    'HTML5': { color: '#e34c26', lightColor: 'rgba(227, 76, 38, 0.1)', shadow: 'rgba(227, 76, 38, 0.2)' },
    'CSS3': { color: '#264de4', lightColor: 'rgba(38, 77, 228, 0.1)', shadow: 'rgba(38, 77, 228, 0.2)' },
    'JavaScript (ES6+)': { color: '#f7df1e', lightColor: 'rgba(247, 223, 30, 0.1)', shadow: 'rgba(247, 223, 30, 0.2)' },
    'React.js': { color: '#61dafb', lightColor: 'rgba(97, 218, 251, 0.1)', shadow: 'rgba(97, 218, 251, 0.2)' },
    'Tailwind CSS': { color: '#38bdf8', lightColor: 'rgba(56, 189, 248, 0.1)', shadow: 'rgba(56, 189, 248, 0.2)' },
    'Node.js': { color: '#339933', lightColor: 'rgba(51, 153, 51, 0.1)', shadow: 'rgba(51, 153, 51, 0.2)' },
    'Express.js': { color: '#828282', lightColor: 'rgba(130, 130, 130, 0.1)', shadow: 'rgba(130, 130, 130, 0.2)' },
    'Spring Boot': { color: '#6db33f', lightColor: 'rgba(109, 179, 63, 0.1)', shadow: 'rgba(109, 179, 63, 0.2)' },
    'MongoDB': { color: '#47a248', lightColor: 'rgba(71, 162, 72, 0.1)', shadow: 'rgba(71, 162, 72, 0.2)' },
    'MySQL': { color: '#00758f', lightColor: 'rgba(0, 117, 143, 0.1)', shadow: 'rgba(0, 117, 143, 0.25)' },
    'Java': { color: '#f8981d', lightColor: 'rgba(248, 152, 29, 0.1)', shadow: 'rgba(248, 152, 29, 0.2)' },
    'Python': { color: '#3776ab', lightColor: 'rgba(55, 118, 171, 0.1)', shadow: 'rgba(55, 118, 171, 0.2)' },
    'C++': { color: '#00599c', lightColor: 'rgba(0, 89, 156, 0.1)', shadow: 'rgba(0, 89, 156, 0.2)' },
    'C': { color: '#a8b9cc', lightColor: 'rgba(168, 185, 204, 0.1)', shadow: 'rgba(168, 185, 204, 0.2)' },
    'Git & GitHub': { color: '#f05032', lightColor: 'rgba(240, 80, 50, 0.1)', shadow: 'rgba(240, 80, 50, 0.2)' },
    'Docker': { color: '#2496ed', lightColor: 'rgba(36, 150, 237, 0.1)', shadow: 'rgba(36, 150, 237, 0.2)' },
    'Jenkins': { color: '#d24939', lightColor: 'rgba(210, 73, 57, 0.1)', shadow: 'rgba(210, 73, 57, 0.2)' },
    'Linux Commands': { color: '#fcc624', lightColor: 'rgba(252, 198, 36, 0.1)', shadow: 'rgba(252, 198, 36, 0.2)' },
    'Figma UI/UX': { color: '#f24e1e', lightColor: 'rgba(242, 78, 30, 0.1)', shadow: 'rgba(242, 78, 30, 0.2)' }
  };

  // --- Skills Data ---
  const skillsData = {
    Frontend: [
      { name: 'HTML5', percentage: 95 },
      { name: 'CSS3', percentage: 90 },
      { name: 'JavaScript (ES6+)', percentage: 90 },
      { name: 'React.js', percentage: 85 },
      { name: 'Tailwind CSS', percentage: 95 }
    ],
    Backend: [
      { name: 'Node.js', percentage: 85 },
      { name: 'Express.js', percentage: 85 },
      { name: 'Spring Boot', percentage: 80 }
    ],
    Database: [
      { name: 'MongoDB', percentage: 85 },
      { name: 'MySQL', percentage: 85 }
    ],
    'Programming Languages': [
      { name: 'Java', percentage: 90 },
      { name: 'Python', percentage: 85 },
      { name: 'C++', percentage: 80 },
      { name: 'C', percentage: 75 }
    ],
    Tools: [
      { name: 'Git & GitHub', percentage: 90 },
      { name: 'Docker', percentage: 75 },
      { name: 'Jenkins', percentage: 70 },
      { name: 'Linux Commands', percentage: 80 },
      { name: 'Figma UI/UX', percentage: 75 }
    ]
  };

  // --- Contact Form State ---
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [sendingStatus, setSendingStatus] = useState(null); // 'sending', 'success', 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errors.message = 'Message details are required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Write a description of at least 10 characters';
    }
    return errors;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSendingStatus('sending');

    try {
      await sendMessage(formData);
      setSendingStatus('success');
      setStatusMessage('Your message was successfully transmitted! Akash will respond to your inquiry shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSendingStatus('error');
      setStatusMessage('Failed to transmit message: ' + (err.message || 'System issues occurred.'));
    }
  };

  const handleDownloadCV = () => {
    const cvText = `
=============================================
             AKASH K - RESUME
=============================================
Email: akash.k.cse@example.com | CGPA: 7.61
Student Member of the Institution of Engineers (IE)

SUMMARY:
Final Year Computer Science Engineering student passionate about full-stack software development, machine learning, and scalable systems.

EDUCATION:
- B.E. Computer Science Engineering
  National Engineering College, Kovilpatti (2023 - 2027) | CGPA: 7.61
- HSC
  AVRMV Matric Hr Sec School (2021 - 2023) | Score: 79.5%
- SSLC
  AVRMV Matric Hr Sec School (2020 - 2021)

SKILLS:
- Frontend: HTML, CSS, JavaScript, React.js, Tailwind CSS
- Backend: Node.js, Express.js, Spring Boot
- Database: MongoDB, MySQL
- Programming: C, C++, Java, Python
- Tools: Git, GitHub, Docker, Jenkins, Linux, Figma

PROJECTS SUMMARY:
1. PurpleInsight – AI-Powered Retail Store Intelligence System (Python, FastAPI, YOLOv8)
2. Student Learning Management System (Spring Boot, MySQL)
3. DriveWise - AI Safety Monitoring System (Python, OpenCV)
4. Smart Healthcare Portal (MERN Stack)
=============================================
    `;

    const blob = new Blob([cvText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Akash_K_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Get distinct tech filters
  const allTechs = ['All', ...new Set(projects.flatMap(p => p.technology))].slice(0, 10);

  const filteredProjects = selectedTechFilter === 'All' 
    ? projects 
    : projects.filter(p => p.technology.includes(selectedTechFilter));

  return (
    <div className="relative overflow-hidden w-full">
      {/* Decorative Floating Glowing Blobs */}
      <div className="glow-orb orb-blue" />
      <div className="glow-orb orb-purple" />
      <div className="glow-orb orb-indigo" />

      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-28 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          
          {/* Info Details */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>Available for Front-End & Full-Stack Projects</span>
            </motion.div>

            <div className="space-y-3">
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest"
              >
                Welcome to my digital space
              </motion.h4>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white leading-tight"
              >
                Hi, I'm <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">Akash K</span>
              </motion.h1>
            </div>

            {/* Typewriting Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-dark-card/80 border border-gray-200/50 dark:border-dark-border text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-2"
            >
              <span className="text-gray-400 font-normal">I build systems as a</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold border-r-2 border-blue-600 dark:border-blue-400 pr-1 animate-pulse min-h-[24px] block">
                {currentText}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed"
            >
              Final-year Computer Science Engineering student specialized in crafting premium, dynamic web interfaces and building performant server-side software. 
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 w-full"
            >
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </button>
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800/40 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
            </motion.div>

            {/* Micro Social Handles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-4 pt-4 border-t border-gray-200/50 dark:border-dark-border w-full"
            >
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Find me on</span>
              <a
                href="https://github.com/akash-k"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/akash-k"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* vscode simulated code editor */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2 w-full">
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="code-editor w-full max-w-lg text-left text-xs overflow-hidden shadow-2xl relative border border-white/10"
            >
              {/* editor window buttons */}
              <div className="h-10 bg-slate-950/60 flex items-center px-4 justify-between border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="px-4 py-1.5 rounded-t-lg bg-gray-900 border-x border-t border-white/5 text-[10px] text-gray-400 font-mono flex items-center gap-1.5">
                  <Code className="w-3 h-3 text-blue-400" />
                  <span>AkashK.json</span>
                </div>
                <div className="w-12" />
              </div>

              {/* editor body */}
              <div className="p-5 font-mono text-[10px] sm:text-xs text-gray-300 space-y-1.5 overflow-x-auto leading-relaxed bg-[#0d1117]/80">
                <p><span className="text-pink-500">{"{"}</span></p>
                <p className="pl-4"><span className="text-blue-400">"name"</span>: <span className="text-amber-300">"Akash K"</span>,</p>
                <p className="pl-4"><span className="text-blue-400">"role"</span>: <span className="text-amber-300">"Computer Science Engineer"</span>,</p>
                <p className="pl-4"><span className="text-blue-400">"education"</span>: <span className="text-pink-500">{"{"}</span></p>
                <p className="pl-8"><span className="text-blue-400">"degree"</span>: <span className="text-amber-300">"Bachelor of Engineering"</span>,</p>
                <p className="pl-8"><span className="text-blue-400">"major"</span>: <span className="text-amber-300">"Computer Science Engineering"</span>,</p>
                <p className="pl-8"><span className="text-blue-400">"cgpa"</span>: <span className="text-emerald-400">7.61</span></p>
                <p className="pl-4"><span className="text-pink-500">{"}"}</span>,</p>
                <p className="pl-4"><span className="text-blue-400">"specialties"</span>: <span className="text-indigo-400">{"["}</span></p>
                <p className="pl-8"><span className="text-amber-300">"MERN Fullstack"</span>,</p>
                <p className="pl-8"><span className="text-amber-300">"Spring Boot Microservices"</span>,</p>
                <p className="pl-8"><span className="text-amber-300">"AI Integrated Applications"</span></p>
                <p className="pl-4"><span className="text-indigo-400">{"]"}</span>,</p>
                <p className="pl-4"><span className="text-blue-400">"location"</span>: <span className="text-amber-300">"Kovilpatti, Tamil Nadu"</span>,</p>
                <p className="pl-4"><span className="text-blue-400">"openToWork"</span>: <span className="text-emerald-400">true</span></p>
                <p><span className="text-pink-500">{"}"}</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section id="about" className="py-24 bg-slate-500/5 dark:bg-dark-bg/20 border-y border-gray-150 dark:border-dark-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full">Background</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-4 flex items-center justify-center gap-2">
              <User className="w-8 h-8 text-blue-500" />
              About Me
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Info Grid left */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="glassmorphism-card glow-border p-6 rounded-2xl flex flex-col space-y-3 relative overflow-hidden text-left shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">CURRENT ACADEMICS</span>
                  <h3 className="text-lg font-black text-gray-800 dark:text-white mt-0.5">
                    Final Year CSE Student
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    National Engineering College, Kovilpatti.
                  </p>
                </div>
              </div>

              <div className="glassmorphism-card glow-border p-6 rounded-2xl flex flex-col space-y-3 border-l-4 border-l-indigo-500 relative overflow-hidden text-left shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <span className="text-[10px] text-indigo-500 font-extrabold uppercase tracking-wider block">CUMULATIVE SCORE</span>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mt-0.5">
                    7.61 CGPA
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Strong academic understanding of systems core, database architectures, and algorithms.
                  </p>
                </div>
              </div>
            </div>

            {/* Description Text right */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                Designing Beautiful, Scalable, and Smart Web Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                I am an aspiring Software Engineer graduating in 2027. I have spent my academic years developing a strong conceptual foundation in core computing, from data structures to machine learning pipelines, and translating them into polished web systems.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                I enjoy mapping both ends of the engineering spectrum: crafting elegant, responsive front-ends utilizing **React.js and Tailwind CSS**, and building structured back-ends powered by **Spring Boot or Node.js**.
              </p>

              {/* Technologies Highlights */}
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest block">
                  Foundational Languages
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {['Java', 'Python', 'C++', 'C', 'JavaScript', 'SQL'].map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION */}
      <section id="skills" className="py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full">Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-4 flex items-center justify-center gap-2">
              <Cpu className="w-8 h-8 text-blue-500" />
              Technical Stack
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsData).map(([category, skills], idx) => {
              const icons = [
                <Code className="w-5 h-5 text-blue-500" />,
                <Layers className="w-5 h-5 text-emerald-500" />,
                <Database className="w-5 h-5 text-purple-500" />,
                <Terminal className="w-5 h-5 text-amber-500" />,
                <Settings className="w-5 h-5 text-rose-500" />
              ];

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glassmorphism-card p-6 rounded-2xl flex flex-col space-y-6 shadow-md relative overflow-hidden"
                >
                  <div className="flex items-center gap-2.5 border-b border-gray-200 dark:border-dark-border pb-3 text-left">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/60 transition-transform duration-300 hover:scale-110">
                      {icons[idx % icons.length]}
                    </div>
                    <h3 className="font-black text-gray-950 dark:text-white text-base">
                      {category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 text-left">
                    {skills.map((skill) => {
                      const meta = skillMeta[skill.name] || { color: '#3b82f6', lightColor: 'rgba(59, 130, 246, 0.1)', shadow: 'rgba(59, 130, 246, 0.2)' };
                      const level = skill.percentage >= 90 ? 'Expert' : skill.percentage >= 80 ? 'Advanced' : 'Proficient';

                      return (
                        <motion.div
                          key={skill.name}
                          className="flex flex-col space-y-2 p-3 rounded-xl border bg-white/45 dark:bg-slate-900/40 border-gray-200/50 dark:border-gray-800/45"
                          whileHover={{
                            scale: 1.03,
                            y: -2,
                            borderColor: meta.color,
                            boxShadow: `0 10px 25px -5px ${meta.shadow}, 0 8px 10px -6px ${meta.shadow}`
                          }}
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        >
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="font-extrabold text-[13px] text-gray-800 dark:text-gray-200 truncate" title={skill.name}>
                              {skill.name}
                            </span>
                            <span
                              className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: meta.lightColor, color: meta.color }}
                            >
                              {level}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex-grow h-1.5 bg-gray-200/80 dark:bg-gray-800/80 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                className="h-full rounded-full animate-pulse-slow"
                                style={{ backgroundColor: meta.color }}
                              />
                            </div>
                            <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 min-w-[24px] text-right">
                              {skill.percentage}%
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-slate-500/5 dark:bg-dark-bg/20 border-y border-gray-150 dark:border-dark-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full">Engineering</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-4 flex items-center justify-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-500" />
              Dynamic Projects
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
            <p className="text-xs font-bold text-gray-400 mt-3 uppercase tracking-wider">
              Explore dynamic database cards managed in the Admin control panel.
            </p>
          </div>

          {/* Tech Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTechFilter(tech)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all active:scale-95 cursor-pointer shadow-sm ${
                  selectedTechFilter === tech
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25'
                    : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loadingProjects ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider animate-pulse">Querying Database...</span>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={project._id}
                    className="glassmorphism-card glow-border overflow-hidden rounded-2xl flex flex-col h-full shadow-lg"
                  >
                    {/* Project Header/Image */}
                    <div className="h-56 overflow-hidden relative bg-[#0e131f] flex items-center justify-center text-white border-b border-gray-250 dark:border-dark-border">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : null}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
                        <span className="text-white font-black text-xl mb-1.5 drop-shadow-md">
                          {project.title}
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.technology.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded bg-blue-500/20 backdrop-blur-md text-[9px] font-extrabold text-blue-300 border border-blue-500/10 font-mono uppercase tracking-wider"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow text-left space-y-4">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {/* Action Links */}
                      <div className="flex items-center justify-between border-t border-gray-250 dark:border-dark-border/40 pt-4 mt-auto">
                        {project.githubLink ? (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-95 cursor-pointer"
                          >
                            <Github className="w-3.5 h-3.5" />
                            Repository
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400 font-semibold cursor-not-allowed">
                            Repository Private
                          </span>
                        )}

                        {project.liveLink ? (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 cursor-pointer"
                          >
                            Demo
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400 font-medium font-mono">
                            Local Build
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. EDUCATION SECTION */}
      <section id="education" className="py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full">Roadmap</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-4 flex items-center justify-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              Education Timeline
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="relative">
            {/* Center line with gradient colors */}
            <div className="timeline-line" />

            <div className="space-y-12">
              {/* Item 1 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full md:even:flex-row-reverse relative">
                <div className="w-full md:w-[45%] flex justify-end md:even:justify-start">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glassmorphism-card glow-border p-6 rounded-2xl text-left w-full shadow-lg relative overflow-hidden"
                  >
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">2023 – 2027</span>
                    <h3 className="text-lg font-black text-gray-950 dark:text-white mt-2.5 leading-tight">
                      Bachelor of Engineering in Computer Science
                    </h3>
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-1">
                      National Engineering College, Kovilpatti
                    </p>
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-dark-border/40">
                      <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">CUMULATIVE SCORE</span>
                      <span className="text-lg font-black text-blue-500 dark:text-blue-400">CGPA: 7.61</span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Node icon */}
                <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#030712] border-4 border-blue-500 flex items-center justify-center z-10 shadow-lg shadow-blue-500/20 animate-pulse-slow">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                </div>
                
                <div className="hidden md:block w-[45%]" />
              </div>

              {/* Item 2 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full md:flex-row-reverse relative">
                <div className="w-full md:w-[45%] flex justify-start">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glassmorphism-card glow-border p-6 rounded-2xl text-left w-full shadow-lg relative overflow-hidden"
                  >
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">2021 – 2023</span>
                    <h3 className="text-lg font-black text-gray-950 dark:text-white mt-2.5 leading-tight">
                      Higher Secondary School Certificate (HSC)
                    </h3>
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-1">
                      AVRMV Matriculation Hr Secondary School
                    </p>
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-dark-border/40">
                      <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">SCORE PERFORMANCE</span>
                      <span className="text-lg font-black text-indigo-500 dark:text-indigo-400">79.5 %</span>
                    </div>
                  </motion.div>
                </div>

                {/* Node icon */}
                <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#030712] border-4 border-indigo-500 flex items-center justify-center z-10 shadow-lg shadow-indigo-500/20">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                </div>

                <div className="hidden md:block w-[45%]" />
              </div>

              {/* Item 3 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
                <div className="w-full md:w-[45%] flex justify-end">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glassmorphism-card glow-border p-6 rounded-2xl text-left w-full shadow-lg relative overflow-hidden"
                  >
                    <span className="text-xs font-black text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">2020 – 2021</span>
                    <h3 className="text-lg font-black text-gray-950 dark:text-white mt-2.5 leading-tight">
                      Secondary School Leaving Certificate (SSLC)
                    </h3>
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-1">
                      AVRMV Matriculation Hr Secondary School
                    </p>
                  </motion.div>
                </div>

                {/* Node icon */}
                <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#030712] border-4 border-purple-500 flex items-center justify-center z-10 shadow-lg shadow-purple-500/20">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                </div>

                <div className="hidden md:block w-[45%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ACHIEVEMENTS SECTION */}
      <section id="achievements" className="py-24 bg-slate-500/5 dark:bg-dark-bg/20 border-y border-gray-150 dark:border-dark-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full">Milestones</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-4 flex items-center justify-center gap-2">
              <Award className="w-8 h-8 text-blue-500" />
              Achievements
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Full Stack Projects', desc: 'Engineered complete software solutions integrating robust, scalable MERN architectures.' },
              { title: 'Spring Boot Systems', desc: 'Coded secure, role-based backend microservices leveraging Java architectures.' },
              { title: 'AI & OpenCV Models', desc: 'Crafted intelligent computer vision safety systems (DriveWise active monitoring).' },
              { title: 'Student Member (IE)', desc: 'Active student associate member of the prestigious Institution of Engineers.' }
            ].map((ach, idx) => (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glassmorphism-card glow-border p-6 rounded-2xl text-left flex flex-col space-y-4 shadow-lg border border-blue-500/10 relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 flex items-center justify-center border border-blue-500/10">
                  <Award className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-black text-gray-900 dark:text-white text-base leading-tight">
                  {ach.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {ach.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full">Get in touch</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-4 flex items-center justify-center gap-2">
              <Mail className="w-8 h-8 text-blue-500" />
              Contact Console
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-center">
            {/* Quick Contacts panel left */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4 text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white leading-tight">
                  Let's engineer something together!
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Have an internship opening, a project idea, or simply want to say hello? Drop a message in the console, and I will get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-4">
                <div className="glassmorphism-card p-5 rounded-2xl flex items-center gap-4 text-left shadow-md relative overflow-hidden border border-blue-500/10">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-gray-400 block uppercase tracking-widest">EMAIL ADDRESS</span>
                    <a href="mailto:akash.k.cse@example.com" className="text-xs sm:text-sm font-bold hover:text-blue-500 transition-colors">
                      akash.k.cse@example.com
                    </a>
                  </div>
                </div>

                <div className="glassmorphism-card p-5 rounded-2xl flex items-center gap-4 text-left shadow-md relative overflow-hidden border border-indigo-500/10">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-gray-400 block uppercase tracking-widest">ASSOCIATION</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 leading-tight">
                      IE India Associate Student Member
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form right */}
            <div className="lg:col-span-7 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glassmorphism-card p-6 sm:p-8 rounded-2xl shadow-xl border border-white/10"
              >
                <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 transition-all ${
                          formErrors.name 
                            ? 'border-red-500 focus:ring-red-400' 
                            : 'border-gray-200 dark:border-dark-border focus:ring-blue-400'
                        }`}
                        placeholder="John Doe"
                      />
                      {formErrors.name && <span className="text-[10px] text-red-500 font-bold">{formErrors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 transition-all ${
                          formErrors.email 
                            ? 'border-red-500 focus:ring-red-400' 
                            : 'border-gray-200 dark:border-dark-border focus:ring-blue-400'
                        }`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && <span className="text-[10px] text-red-500 font-bold">{formErrors.email}</span>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-[10px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 transition-all ${
                        formErrors.subject 
                          ? 'border-red-500 focus:ring-red-400' 
                          : 'border-gray-200 dark:border-dark-border focus:ring-blue-400'
                      }`}
                      placeholder="Project Inquiries / Collaboration"
                    />
                    {formErrors.subject && <span className="text-[10px] text-red-500 font-bold">{formErrors.subject}</span>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 transition-all ${
                        formErrors.message 
                          ? 'border-red-500 focus:ring-red-400' 
                          : 'border-gray-200 dark:border-dark-border focus:ring-blue-400'
                      }`}
                      placeholder="Share details about your request..."
                    />
                    {formErrors.message && <span className="text-[10px] text-red-500 font-bold">{formErrors.message}</span>}
                  </div>

                  {/* Status Indicator Alerts */}
                  {sendingStatus && (
                    <div 
                      className={`flex items-start gap-2.5 p-3.5 rounded-xl border text-xs font-semibold ${
                        sendingStatus === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/50'
                          : sendingStatus === 'error'
                          ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/50'
                          : 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-900/50 animate-pulse'
                      }`}
                    >
                      {sendingStatus === 'success' ? (
                        <CheckCircle className="w-4.5 h-4.5 flex-shrink-0 text-emerald-500" />
                      ) : sendingStatus === 'error' ? (
                        <AlertCircle className="w-4.5 h-4.5 flex-shrink-0 text-red-500" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                      )}
                      <span>
                        {sendingStatus === 'sending' ? 'Transmitting details secure console...' : statusMessage}
                      </span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={sendingStatus === 'sending'}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-750 text-white font-extrabold shadow-lg shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Transmit message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
