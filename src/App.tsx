import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('hero');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      });
    }

    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        if (section) {
          setActiveSection(section);
          const targetSection = document.getElementById(section);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Typing animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
      const titles = ['Full-Stack Developer', 'AI/ML Enthusiast', 'Software Engineer'];
      let titleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const typeWriter = () => {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
          typingText.textContent = currentTitle.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingText.textContent = currentTitle.substring(0, charIndex + 1);
          charIndex++;
        }

        let typeSpeed = 100;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentTitle.length) {
          typeSpeed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
      };

      typeWriter();
    }

    // Scroll spy for navigation
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -80% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
            navItems.forEach(item => {
              item.classList.remove('active');
              if (item.getAttribute('data-section') === id) {
                item.classList.add('active');
              }
            });
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    return () => {
      if (themeToggle) {
        themeToggle.removeEventListener('click', () => { });
      }
      navItems.forEach(item => {
        item.removeEventListener('click', () => { });
      });
      observer.disconnect();
    };
  }, [theme]);

  // Notification display logic
  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  // Handler for the new Download Resume button
  const handleResumeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setNotification('For resume, please contact me.');
  };

  return (
    <>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          background: 'var(--gradient-primary)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '10px',
          boxShadow: 'var(--shadow-primary)',
          zIndex: 10000,
          fontWeight: 600,
          fontSize: '1.1rem',
        }}>
          {notification}
        </div>
      )}
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-shapes"></div>
        <div className="neural-network"></div>
        <div className="gradient-orbs"></div>
      </div>

      {/* Dark Mode Toggle */}
      <button className="theme-toggle" id="themeToggle">
        <div className="toggle-track">
          <div className="toggle-thumb">
            <i className="fas fa-sun sun-icon"></i>
            <i className="fas fa-moon moon-icon"></i>
          </div>
        </div>
      </button>

      {/* Navigation */}
      <nav className="floating-nav">
        <div className="nav-container">
          <div className="nav-items">
            <a href="#hero" className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`} data-section="hero">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </a>
            <a href="#about" className={`nav-item ${activeSection === 'about' ? 'active' : ''}`} data-section="about">
              <i className="fas fa-user"></i>
              <span>About</span>
            </a>
            <a href="#experience" className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`} data-section="experience">
              <i className="fas fa-briefcase"></i>
              <span>Experience</span>
            </a>
            <a href="#skills" className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`} data-section="skills">
              <i className="fas fa-code"></i>
              <span>Skills</span>
            </a>
            <a href="#projects" className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`} data-section="projects">
              <i className="fas fa-rocket"></i>
              <span>Projects</span>
            </a>
            <a href="#achievements" className={`nav-item ${activeSection === 'achievements' ? 'active' : ''}`} data-section="achievements">
              <i className="fas fa-trophy"></i>
              <span>Achievements</span>
            </a>
            <a href="#contact" className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`} data-section="contact">
              <i className="fas fa-envelope"></i>
              <span>Contact</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="profile-card">
              <div className="profile-image-container">
                <div className="profile-image">
                  <img src="/Profile.jpeg" alt="Sneha Belavi" className="profile-photo" />
                  <div className="profile-ring"></div>
                  <div className="profile-glow"></div>
                </div>
              </div>

              <div className="hero-text">
                <div className="greeting">
                  <span className="wave">👋</span>
                  <span>Hello, I'm</span>
                </div>
                <h1 className="hero-name">
                  <span className="name-part">SNEHA</span>
                  <span className="name-part">BELAVI</span>
                </h1>
                <div className="hero-title">
                  <span className="typing-text"></span>
                  <span className="cursor">|</span>
                </div>
                <p className="hero-description">
                  AI enthusiast with expertise in developing and deploying deep learning models that drive business value. Passionate Full-Stack Developer with a strong focus on building scalable, high-performance applications and ensuring robust web security. Skilled in leveraging cutting-edge AI technologies with a full-stack development background to build innovative solutions. I thrive in dynamic environments, continuously learning and adapting to new challenges.
                </p>

                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number">9.0</div>
                    <div className="stat-label">CGPA</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">2+</div>
                    <div className="stat-label">Years Exp</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">10+</div>
                    <div className="stat-label">Projects</div>
                  </div>
                </div>

                <div className="hero-actions">
                  <button className="cta-button primary" onClick={handleResumeClick}>
                    <span>Download Resume</span>
                    <i className="fas fa-download"></i>
                  </button>
                  <button className="cta-button secondary">
                    <span>View Projects</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>

                <div className="social-links">
                  <a href="https://www.linkedin.com/in/sneha-belavi-6730392a4/" className="social-link linkedin"
                    target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/belsneha" className="social-link github" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="mailto:zsneha1008@gmail.com" className="social-link email">
                    <i className="fas fa-envelope"></i>
                  </a>
                  <a href="tel:+918792040339" className="social-link phone">
                    <i className="fas fa-phone"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <div className="section-subtitle">Professional Summary</div>
          </div>

          <div className="about-content">
            <div className="about-text">
              <div className="premium-card">
                <div className="card-glow"></div>
                <div className="card-content">
                  <p className="about-description">
                    AI enthusiast with expertise in developing and deploying deep learning models that drive business value. Passionate Full-Stack Developer with a strong focus on building scalable, high-performance applications and ensuring robust web security. Skilled in leveraging cutting-edge AI technologies with a full-stack development background to build innovative solutions. I thrive in dynamic environments, continuously learning and adapting to new challenges.
                  </p>

                  <div className="education-info">
                    <h3>Education</h3>
                    <div className="education-item">
                      <div className="education-header">
                        <h4>Sir M. Visvesvaraya Institute Of Technology</h4>
                        <span className="duration">Dec 2022 - 2026</span>
                      </div>
                      <p className="degree">Bachelor of Engineering, Artificial Intelligence and Machine Learning</p>
                      <p className="location">Bangalore, India</p>
                      <div className="cgpa-display">
                        <span className="cgpa-label">CGPA:</span>
                        <span className="cgpa-value">9.0/10</span>
                      </div>
                    </div>

                    <div className="education-item">
                      <div className="education-header">
                        <h4>Vidyaniketan PU Science College</h4>
                        <span className="duration">April 2020 - May 2022</span>
                      </div>
                      <p className="degree">Pre University (PCMB)</p>
                      <p className="location">Hubli</p>
                      <div className="cgpa-display">
                        <span className="cgpa-label">Score:</span>
                        <span className="cgpa-value">95%</span>
                      </div>
                    </div>

                    <div className="education-item">
                      <div className="education-header">
                        <h4>Dr Gangadhar English Medium Residential School</h4>
                        <span className="duration">June 2008 - March 2020</span>
                      </div>
                      <p className="degree">Secondary school</p>
                      <p className="location">Shirdhan</p>
                      <div className="cgpa-display">
                        <span className="cgpa-label">Score:</span>
                        <span className="cgpa-value">95.68%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section experience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Experience</h2>
            <div className="section-subtitle">Professional Journey</div>
          </div>

          <div className="experience-timeline">
            <div className="timeline-line"></div>

            <div className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-card">
                <div className="card-glow"></div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h3>Web Developer (Internship)</h3>
                    <span className="duration">Mar 2024 - Apr 2024</span>
                  </div>
                  <h4>Oasis Infobyte</h4>
                  <p className="location">Bengaluru, Karnataka, India (Remote)</p>
                  <ul className="experience-details">
                    <li>Created a landing page using HTML, CSS, and JavaScript to showcase skills and accomplishments.</li>
                    <li>Built a pizza delivery website using HTML, CSS, JavaScript, and ReactJS.</li>
                    <li>Created a portfolio website using HTML and CSS.</li>
                    <li>Developed a temperature converter tool (Celsius, Fahrenheit, Kelvin).</li>
                    <li>Received a Letter of Recommendation.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-card">
                <div className="card-glow"></div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h3>Machine Learning Trainee</h3>
                    <span className="duration">Jun 2023</span>
                  </div>
                  <div className="experience-links" style={{ marginBottom: '0.5rem' }}>
                    <a className="cta-button primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} href="/aquamenz.jpg" download title="Download Aquamenz Certificate">
                      <span>Download Certificate</span>
                      <i className="fas fa-download"></i>
                    </a>
                  </div>
                  <h4>Agmenz Automation Private Limited</h4>
                  <p className="location">Bengaluru, Karnataka, India (Remote)</p>
                  <ul className="experience-details">
                    <li>Developed a predictive model for loan approval using machine learning algorithms.</li>
                    <li>Preprocessed data, handled missing values, and converted categorical variables.</li>
                    <li>Evaluated model using accuracy, precision, recall, and F1-score.</li>
                    <li>Deployed the model for predictions on new, unseen data.</li>
                    <li>Applied skills in machine learning, data preprocessing, and model evaluation.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-card">
                <div className="card-glow"></div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h3>Software Developer Intern</h3>
                    <span className="duration">May 2025 - July 2026</span>
                  </div>
                  <h4>Routefever Travels Pvt. Ltd.</h4>
                  <p className="location">Bangalore, India</p>
                  <ul className="experience-details">
                    <li>Developed the company's end-to-end website using React.js and Node.js, improving user engagement and providing a seamless booking experience.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-card">
                <div className="card-glow"></div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h3>Intern</h3>
                    <span className="duration">October 2024 - November 2024</span>
                  </div>
                  <div className="experience-links" style={{ marginBottom: '0.5rem' }}>
                    <a className="cta-button primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} href="/tata.png" download title="Download Tata Certificate">
                      <span>Download Certificate</span>
                      <i className="fas fa-download"></i>
                    </a>
                  </div>
                  <h4>Tata Consultancy Services</h4>
                  <p className="location">Remote</p>
                  <ul className="experience-details">
                    <li>Completed the Tata Data Visualization simulation, creating visuals and client meeting questions to support senior leadership and executive decision-making.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Skills</h2>
            <div className="section-subtitle">Technical Expertise</div>
          </div>

          <div className="skills-grid">
            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-code"></i>
                </div>
                <h3>Programming Languages</h3>
                <div className="skill-tags">
                  <span className="skill-tag">C/C++</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">Python</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-palette"></i>
                </div>
                <h3>Frontend</h3>
                <div className="skill-tags">
                  <span className="skill-tag">React.js</span>
                  <span className="skill-tag">Next.js</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">Tailwind CSS</span>
                  <span className="skill-tag">Bootstrap</span>
                  <span className="skill-tag">Sass</span>
                  <span className="skill-tag">Shadcn UI</span>
                  <span className="skill-tag">Chakra UI</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-server"></i>
                </div>
                <h3>Backend</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Express.js</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">RESTful API</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-cloud"></i>
                </div>
                <h3>DevOps & Cloud</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">Linux</span>
                  <span className="skill-tag">Firebase</span>
                  <span className="skill-tag">Cloudflare</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-database"></i>
                </div>
                <h3>Database & Testing</h3>
                <div className="skill-tags">
                  <span className="skill-tag">PostgreSQL</span>
                  <span className="skill-tag">MySQL</span>
                  <span className="skill-tag">Postman</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Soft Skills</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Strong Communication</span>
                  <span className="skill-tag">Quick Adaptability</span>
                  <span className="skill-tag">Self-Motivation</span>
                  <span className="skill-tag">Problem-Solving</span>
                  <span className="skill-tag">Results-Driven</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Coursework</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Data Structures</span>
                  <span className="skill-tag">Algorithms</span>
                  <span className="skill-tag">OOP</span>
                  <span className="skill-tag">Operating Systems</span>
                  <span className="skill-tag">DevOps</span>
                  <span className="skill-tag">Machine Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            <div className="section-subtitle">Featured Work</div>
          </div>

          <div className="projects-grid">
            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-traffic-light"></i>
                </div>
                <h3>Smart Traffic Management System</h3>
                <div className="project-tech">
                  <span>React.js</span>
                  <span>Node.js</span>
                  <span>Tailwind CSS</span>
                  <span>MongoDB</span>
                </div>
                <p className="project-description">
                  Built a real-time traffic tool using React and Node.js to optimize signal timings. Deployed on Render to reduce congestion and improve traffic flow.
                </p>
                <div className="project-links">
                  <a href="https://github.com/belsneha/Smart-Traffic-Oracle-system.git"
                    className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>DDoS Attack Detection For Enhanced Bank Server Resilience</h3>
                <div className="project-tech">
                  <span>Machine Learning</span>
                  <span>Deep Learning</span>
                  <span>NLP</span>
                </div>
                <p className="project-description">
                  Built Real-Time Anomaly Detection Model using LSTM, CNN, Random Forest, and SVM to identify DDoS attacks on bank servers and enhance security and minimize downtime.
                </p>
              </div>
            </div>

            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <h3>AI Mock Interview App</h3>
                <div className="project-tech">
                  <span>AI-powered</span>
                  <span>Python</span>
                  <span>Streamlit</span>
                  <span>OpenAI API</span>
                </div>
                <p className="project-description">
                  Built an AI-powered mock interview platform that simulates real interview scenarios using AI/ML models. Helps users practice and improve their interview skills with instant feedback.
                </p>
                <div className="project-links">
                  <a href="https://github.com/belsneha/ai-mock-interview.git" className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fab fa-linkedin"></i>
                </div>
                <h3>LinkedIn Post Generator</h3>
                <div className="project-tech">
                  <span>Gen AI</span>
                  <span>Langchain</span>
                  <span>Llama 3.3</span>
                  <span>Streamlit</span>
                </div>
                <p className="project-description">
                  Developed a GenAI-Powered tool using Langchain, Streamlit and Llama 3.3 open-source model. Generates high quality LinkedIn posts and streamlines content creation.
                </p>
                <div className="project-links">
                  <a href="https://github.com/belsneha/Linkedin-post-generator.git" className="project-link"
                    target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3>Landing Page</h3>
                <div className="project-tech">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                </div>
                <p className="project-description">
                  Designed and developed a visually appealing and responsive landing page to showcase web development skills and project accomplishments. The landing page features modern UI elements, smooth navigation, and adaptive layouts, providing an engaging user experience across devices. This project demonstrates expertise in front-end technologies and attention to design detail.
                </p>
                <div className="project-links">
                  <a href="https://github.com/belsneha/landing-page" className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-thermometer-half"></i>
                </div>
                <h3>Temperature Converter</h3>
                <div className="project-tech">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                </div>
                <p className="project-description">
                  Developed a practical temperature converter tool that allows users to seamlessly convert between Celsius, Fahrenheit, and Kelvin. The application features a clean and intuitive interface, real-time conversion, and responsive design, making it a useful utility for students, professionals, and anyone needing quick temperature conversions.
                </p>
                <div className="project-links">
                  <a href="https://github.com/belsneha/temp-converter" className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>LearnChain AI Mentor & Credential Tracker</h3>
                <div className="project-tech">
                  <span>TypeScript</span>
                  <span>JavaScript</span>
                  <span>AI</span>
                </div>
                <p className="project-description">
                  Developed an AI-powered mentorship and credential tracking platform designed to guide learners through personalized educational journeys. The system leverages advanced AI algorithms to recommend learning paths, track progress, and securely manage digital credentials, ensuring a seamless and motivating experience for users seeking to upskill or reskill in various domains.
                </p>
                <div className="project-links">
                  <a href="https://github.com/belsneha/LearnChain-AI" className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="section achievements-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Achievements</h2>
            <div className="section-subtitle">Recognition & Awards</div>
          </div>

          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="card-glow"></div>
              <div className="achievement-content">
                <div className="achievement-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Google Scholar World Congress On Advanced Pharmacy and Clinical Research (WCAPCR-24)</h3>
                <p>Published a research paper on Medical Image analysis using machine learning and natural language processing</p>
                <div className="achievement-links">
                  <a className="cta-button primary" href="/google scholar.jpeg" download title="Download Google Scholar Certificate">
                    <span>Download Certificate</span>
                    <i className="fas fa-download"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="achievement-card">
              <div className="card-glow"></div>
              <div className="achievement-content">
                <div className="achievement-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>ISP Program</h3>
                <h4>Internshala</h4>
                <p>Worked as an ISP coordinator to represent the Internshala brand in the college</p>
                <span className="achievement-duration">Mar 2023 - Aug 2023</span>
                <div className="achievement-links">
                  <a className="cta-button primary" href="/isp coordinator.jpg" download title="Download ISP Coordinator Certificate">
                    <span>Download Certificate</span>
                    <i className="fas fa-download"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="achievement-card">
              <div className="card-glow"></div>
              <div className="achievement-content">
                <div className="achievement-icon">
                  <i className="fas fa-award"></i>
                </div>
                <h3>Academic Excellence & Class Topper (2022–2024)</h3>
                <h4>Sir M Visvesvaraya Institute Of Technology</h4>
                <p>Received consecutive Academic Excellence awards for outstanding performance, including Class Topper recognition for the year 2023–2024.</p>
                <div className="achievement-links">
                  <a className="cta-button primary" href="/academic excellence.jpg" download title="Download Academic Excellence Certificate 1">
                    <span>Download Certificate</span>
                    <i className="fas fa-download"></i>
                  </a>
                  <a className="cta-button primary" href="/academic excellence 2.jpg" download title="Download Academic Excellence Certificate 2">
                    <span>Download Certificate</span>
                    <i className="fas fa-download"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="achievement-card">
              <div className="card-glow"></div>
              <div className="achievement-content">
                <div className="achievement-icon">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h3>Stack Fusion Fest – Hackathon Participation</h3>
                <h4>REVA University</h4>
                <p>Selected as one of the Top 5 finalists in a 24-hour hackathon organized by the School of Computer Science and Engineering, Full Stack Development Club, REVA University in April 2025.</p>
                <div className="achievement-links">
                  <a className="cta-button primary" href="/reva hackathon.jpg" download title="Download REVA Hackathon Certificate">
                    <span>Download Certificate</span>
                    <i className="fas fa-download"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="achievement-card">
              <div className="card-glow"></div>
              <div className="achievement-content">
                <div className="achievement-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <h3>AI for Beginners</h3>
                <h4>HP LIFE</h4>
                <p>Gained foundational knowledge of artificial intelligence (AI), including its applications, data relevance, ethical implications, and impact on business and technology. (Issued Dec 2024)</p>
                <div className="achievement-links">
                  <a className="cta-button primary" href="/hp ai for be.jpg" download title="Download HP AI for Beginners Certificate">
                    <span>Download Certificate</span>
                    <i className="fas fa-download"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contact</h2>
            <div className="section-subtitle">Get In Touch</div>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <div className="card-glow"></div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>zsneha1008@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-glow"></div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Phone</h4>
                    <p>+91 8792040339</p>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-glow"></div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Location</h4>
                    <p>Bangalore, Karnataka - 562157, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
