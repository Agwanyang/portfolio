import { useState, useEffect } from 'react'
import photo from './assets/photo.jpeg'
import './App.css'

// Custom SVGs for a zero-dependency, robust implementation of modern icons
const Icons = {
  Menu: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  X: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  Sun: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
  Moon: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  ExternalLink: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  ),
  GitHub: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  Code: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  ),
  Terminal: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  ),
  Cpu: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 15h3" />
      <path d="M1 9h3" />
      <path d="M1 15h3" />
    </svg>
  ),
  Database: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  Layout: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  Server: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  ),
  Globe: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  Send: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  Sparkles: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
    </svg>
  )
}

function App() {
  const [theme, setTheme] = useState('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({ name: '', email: '', message: '' })
      }, 4000)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const skills = [
    { name: 'React.js', icon: <Icons.Layout className="skill-icon" size={20} /> },
    { name: 'Tailwind CSS', icon: <Icons.Server className="skill-icon" size={20} /> },
    { name: 'JavaScript', icon: <Icons.Code className="skill-icon" size={20} /> },
    { name: 'Database API', icon: <Icons.Database className="skill-icon" size={20} /> },
    { name: 'Funds Manager', icon: <Icons.Cpu className="skill-icon" size={20} /> },
    { name: 'Web Dev', icon: <Icons.Globe className="skill-icon" size={20} /> },
  ]

  const projects = [
    {
      title: 'To-do-List',
      description: 'High performance Responsive React application for saving and managing jobs, gigs, and tasks efficiently.',
      tags: ['Html5', 'CSS3', 'React.js'],
      github: '#',
      demo: '#',
      liveUrl: "https://jobpall.netlify.app",
    },
    {
      title: 'MovieList',
      description: 'A clean, customizable movie discovery web app built with React.js and Tailwind CSS, featuring movie listings,search, and detailed movie pages powered by an external API.',
      tags: ['React.js', 'Tailwind CSS', 'Database API'],
      github: '#',
      demo: '#',
      liveUrl: "https://moviqs.netlify.app",
    },
    {
      title: 'WordCounter',
      description: 'A React App that counts characters and words in real time. Built with useState, useRef, and eventhandling.',
      tags: ['React.js', 'CSS3', 'API'],
      github: '#',
      demo: '#',
      liveUrl: "https://w-countt.netlify.app",
    },
    {
      title: 'Shopping Cart',
      description: 'A Responsive React Application that showcases a demo shopping cart of differents headsets for sale.',
      tags: ['Html5', 'CSS3', 'React.js'],
      github: '#',
      demo: '#',
      liveUrl: "https://cart-ul.netlify.app",
    },
  ]

  const experience = [

    {
      date: '2024 - Present',
      role: 'Frontend Engineer',
      company: 'Freelancer',
      desc: 'Crafted interactive, high-fidelity responsive user interfaces and worked closely with design teams to enforce consistency.'

    },
    {
      date: '2023 - Present',
      role: 'Funds Manager',
      company: 'Freelancer',
      desc: 'Collaborated within agile portfolio teams to analyze, execute, and manage forex trades utilizing modern risk assessment frameworks and market intelligence tools.'
    }
  ]



  return (
    <div className="portfolio-app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo-container" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="gradient-text">Daniel</span>
          <span className="logo-dot"></span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          <li>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />}
            </button>
          </li>
        </ul>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
        </button>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-hello">Welcome to my space</span>
            <h1 className="hero-name">
              Hi, I'm <span className="gradient-text">Daniel</span>
            </h1>
            <h2 className="hero-title">Crafting Premium Digital Experiences</h2>
            <p className="hero-desc">
              I am a Front-end Engineer specializing in building beautiful, fast, and accessible web applications that stand out & a Funds Manager with a keen eye for detail and performance, both in code and in managing forex capital
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn-secondary">
                Let's Talk <Icons.Sparkles size={20} />
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-blob">
              <span className="hero-avatar">
                <img src={photo} alt="Daniel" />
              </span>

            </div>
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="about-section">
        <h2 className="section-title gradient-text">About Me</h2>
        <p className="section-subtitle">A brief look into my background, stats, and technical capabilities.</p>

        <div className="about-content">
          <div className="about-details">
            <p className="about-highlight">
              Passionate about bridging the gap between design excellence and clean, modular engineering.
            </p>
            <p className="about-desc">
              Over the past 2 years, I have worked as a freelance frontend developer across a range of platforms, specializing in performance-driven code, responsive layouts, and seamless user experiences.
            </p>

            <div className="about-stats">
              <div className="glass-panel stat-item">
                <span className="stat-num gradient-text">2+</span>
                <span className="stat-label">Years Exp</span>
              </div>
              <div className="glass-panel stat-item">
                <span className="stat-num gradient-text-alt">5+
                </span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="glass-panel stat-item">
                <span className="stat-num gradient-text">10+</span>
                <span className="stat-label">Clients</span>
              </div>
            </div>
          </div>

          <div className="skills-container">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Core Technologies
            </h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {skill.icon}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2 className="section-title gradient-text">Selected Works</h2>
        <p className="section-subtitle">Explore a collection of featured projects demonstrating design and technology.</p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="glass-panel project-card">
              <div className="project-img-placeholder"></div>
              <div className="project-info">
                <div className="project-tags">
                  {project.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-links">
                  <a href={project.github} className="project-link" target='_blank'>
                    <Icons.GitHub size={16} /> Home
                  </a>
                  <a href={project.liveUrl} className="project-link" target='_blank'>
                    <Icons.ExternalLink size={16} /> Go live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <h2 className="section-title gradient-text">Career Journey</h2>
        <p className="section-subtitle">My professional evolution as a developer and creator.</p>

        <div className="timeline">
          {experience.map((item, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="glass-panel timeline-content">
                <span className="timeline-date">{item.date}</span>
                <h3 className="timeline-role">{item.role}</h3>
                <span className="timeline-company">{item.company}</span>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="section-title gradient-text">Get In Touch</h2>
        <p className="section-subtitle">Have an interesting project or want to collaborate? Drop a message!</p>

        <div className="contact-container">
          <div className="glass-panel contact-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your idea or project details..."
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message <Icons.Send size={18} />
              </button>

              {formSubmitted && (
                <p className="submit-success">
                  Your message has been sent successfully! I will reach out shortly.
                </p>

              )}

                    <p> Whatsapp number: +2348102861873</p>
            </form>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Daniel. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
        Email: agdaniel159@gmail.com
        </p>
      </footer>
    </div>
  )
}

export default App
