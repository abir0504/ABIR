/* ===================================
   ABIR PORTFOLIO - PREMIUM SCRIPT
=================================== */

'use strict';

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initParticles();
  initCursor();
  initNavbar();
  initTyped();
  initAOS();
  initSkillBars();
  initCounters();
  initTestimonials();
  initProjectFilter();
  initFAQ();
  initContactForm();
  initScrollProgress();
  initBackToTop();
  initThemeToggle();
  initChatWidget();
  initFloatingBadges();
  initDownloadCV();
  initGallery();
  initLanguage();
});

// ===== LOADER =====
function initLoader() {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger AOS after loader hides
        AOS.refresh();
      }, 300);
    }
    fill.style.width = progress + '%';
  }, 80);
  document.body.style.overflow = 'hidden';
}

// ===== PARTICLE CANVAS =====
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouse = { x: null, y: null };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); createParticles(); });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.6 ? '#f5a623' : (Math.random() > 0.5 ? '#3b82f6' : '#a78bfa');
      this.originalX = this.x;
      this.originalY = this.y;
    }
    update() {
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
        }
      }
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function createParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - dist/100) * 0.15;
          ctx.strokeStyle = '#f5a623';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  createParticles();
  animate();
}

// ===== CUSTOM CURSOR =====
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  const hoverables = document.querySelectorAll('a, button, .service-card, .project-card, .skill-icon-card, .blog-card, .faq-question, .gallery-item, .filter-btn, .float-social');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });

  // Hide system cursor
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    outline.style.opacity = '1';
  });
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = target.offsetTop - 70;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) link.classList.add('active');
        else link.classList.remove('active');
      }
    });
  }
}

// ===== TYPED TEXT =====
function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;
  let words = ['Web Developer', 'Programmer', 'Creative Thinker', 'Freelancer', 'UI/UX Designer', 'AI Enthusiast'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  let currentTimeout;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === currentWord.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }
    currentTimeout = setTimeout(type, delay);
  }
  type();

  // Expose word update function
  el._updateWords = function(newWords) {
    words = newWords;
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;
    clearTimeout(currentTimeout);
    el.textContent = '';
    type();
  };
}

// ===== AOS =====
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: false,
      offset: 60,
      delay: 0,
    });
  }
}

// ===== SKILL BARS =====
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width;
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
}

// ===== COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current);
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ===== TESTIMONIALS SLIDER =====
function initTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('testiDots');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  if (!cards.length) return;

  let current = 0;
  let autoTimer;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    cards[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + cards.length) % cards.length;
    cards[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  resetAuto();

  // Touch swipe support
  const slider = document.getElementById('testimonialsSlider');
  if (slider) {
    let startX = 0;
    slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive:true });
    slider.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive:true });
  }
}

// ===== PROJECT FILTER =====
function initProjectFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ===== FAQ =====
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      // Close all
      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('active');
        answer.classList.add('open');
      }
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const btn = form.querySelector('.btn-submit');
  const btnText = form.querySelector('.btn-submit-text');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    btn.classList.add('sending');
    btnText.textContent = 'Sending...';
    // Simulate send
    setTimeout(() => {
      btn.classList.remove('sending');
      btnText.textContent = 'Message Sent! ✓';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      form.reset();
      setTimeout(() => {
        btnText.textContent = 'Send Message';
        btn.style.background = '';
      }, 3000);
    }, 2000);
  });

  // Input focus effects
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.01)';
    });
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'scale(1)';
    });
  });
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    bar.style.width = progress + '%';
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

// ===== CHAT WIDGET =====
function initChatWidget() {
  const bubble = document.getElementById('chatBubble');
  const popup = document.getElementById('chatPopup');
  const close = document.getElementById('chatClose');

  bubble.addEventListener('click', () => {
    popup.classList.toggle('open');
  });
  close.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.remove('open');
  });
}

// ===== FLOATING BADGE ANIMATIONS =====
function initFloatingBadges() {
  // Already handled via CSS animations
}

// ===== DOWNLOAD CV =====
function initDownloadCV() {
  const btns = document.querySelectorAll('#downloadCV, #downloadCV2');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Show notification
      showNotification('CV download will be available soon!', 'info');
    });
  });
}

// ===== GALLERY LIGHTBOX =====
function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const backdrop = document.getElementById('lightboxBackdrop');
  if (!lightbox) return;

  const sources = Array.from(items).map(item => item.dataset.src || '');
  let current = 0;

  function openLightbox(index) {
    current = index;
    lightboxImg.src = sources[current];
    lightboxImg.alt = items[current].querySelector('img')?.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 350);
  }
  function prevImg() { current = (current - 1 + sources.length) % sources.length; lightboxImg.src = sources[current]; }
  function nextImg() { current = (current + 1) % sources.length; lightboxImg.src = sources[current]; }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
  lightboxClose.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevImg(); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextImg(); });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImg();
    if (e.key === 'ArrowRight') nextImg();
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive:true });
  lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? nextImg() : prevImg(); }
  }, { passive:true });
}

// ===== NOTIFICATION TOAST =====
function showNotification(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:100px; left:50%; transform:translateX(-50%) translateY(20px);
    background:${type === 'success' ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#3b82f6,#1e40af)'};
    color:#fff; padding:14px 28px; border-radius:50px;
    font-size:0.9rem; font-weight:600;
    box-shadow:0 8px 30px rgba(0,0,0,0.3);
    z-index:99999; opacity:0;
    transition:all 0.3s ease;
    white-space:nowrap;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; }, 10);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== SMOOTH ANCHOR SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

// ===== HOVER RIPPLE EFFECT =====
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .btn-hire').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.3);
      transform:scale(0);
      animation:rippleAnim 0.6s ease-out forwards;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframe
const style = document.createElement('style');
style.textContent = '@keyframes rippleAnim{to{transform:scale(2.5);opacity:0;}}';
document.head.appendChild(style);

// ===== TILT EFFECT ON CARDS (desktop only) =====
function initTiltEffect() {
  if ('ontouchstart' in window) return; // Skip on touch devices
  const cards = document.querySelectorAll('.service-card, .project-card, .stat-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

window.addEventListener('load', () => {
  initTiltEffect();
  // Re-observe cursor hoverables for dynamically relevant elements
});

// ===== PAGE VISIBILITY =====
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = '👋 Come back - Abir Portfolio';
  } else {
    document.title = 'Md. Mehedi Hasan Abir | Web Developer & Freelancer';
  }
});

// ===== SCROLL REVEAL for skill bars =====
window.addEventListener('scroll', () => {
  // AOS handles most, this is backup
}, { passive: true });

console.log('%c🚀 Abir Portfolio - Premium Edition', 'color:#f5a623; font-size:16px; font-weight:bold;');
console.log('%cBuilt with passion by Md. Mehedi Hasan Abir', 'color:#3b82f6; font-size:12px;');

// ===== LANGUAGE SYSTEM =====
const translations = {
  en: {
    nav_home:'Home', nav_about:'About', nav_skills:'Skills', nav_services:'Services', nav_projects:'Projects', nav_blog:'Blog', nav_contact:'Contact', nav_hire:'Hire Me',
    hero_badge:'Available for Freelance Work', hero_role_prefix:"I'm a ", hero_desc:'Crafting digital experiences that blend aesthetic beauty with technical excellence. I build premium web solutions that drive results and leave lasting impressions.',
    btn_hire_me:'Hire Me', btn_view_work:'View Work', btn_download_cv:'Download CV', btn_lets_talk:"Let's Talk",
    stat_projects_label:'Projects', stat_clients_label:'Clients', stat_exp_label:'Years Exp.', scroll_down:'Scroll Down',
    about_tag:'Get To Know', about_title:'About <span class="gold">Me</span>', premium_dev:'Premium Developer', years_exp:'Years of<br>Excellence',
    about_subtitle:'Transforming Ideas Into <span class="gold">Digital Reality</span>',
    about_text_1:"Hello! I'm <strong>Md. Mehedi Hasan Abir</strong>, a passionate Web Developer, Programmer, and Creative Thinker from Bangladesh. I specialize in creating premium digital experiences that merge cutting-edge technology with stunning design aesthetics.",
    about_text_2:'With expertise spanning full-stack development, UI/UX design, and AI integrations, I deliver solutions that not only look exceptional but perform flawlessly. Every project I undertake receives my full dedication to craft something truly extraordinary.',
    label_name:'Name:', label_email:'Email:', label_location:'Location:', label_status:'Status:', available:'Available',
    timeline_title:'My <span class="gold">Journey</span>',
    tl_1_title:'Started Coding Journey', tl_1_desc:'Began learning HTML, CSS and JavaScript, falling in love with the art of building for the web.',
    tl_2_title:'First Freelance Project', tl_2_desc:'Landed first client on Fiverr, delivering a premium business website that received 5-star reviews.',
    tl_3_title:'Mastered React & Node.js', tl_3_desc:'Expanded into full-stack development, building complex web applications with modern technologies.',
    tl_4_title:'AI & Advanced Solutions', tl_4_desc:'Integrated AI tools and prompt engineering into projects, offering next-generation digital solutions.',
    tl_5_title:'Premium Portfolio Growth', tl_5_desc:'Scaling business with 50+ completed projects, serving clients globally with premium quality work.',
    skills_tag:'My Expertise', skills_title:'Technical <span class="gold">Skills</span>', skills_proficiency:'Proficiency Levels', skills_tools:'Tools & Technologies',
    services_tag:'What I Offer', services_title:'Premium <span class="gold">Services</span>',
    projects_tag:'My Work', projects_title:'Featured <span class="gold">Projects</span>',
    filter_all:'All', filter_web:'Web Dev', filter_design:'UI/UX', filter_ai:'AI',
    stat_projects:'Projects Completed', stat_clients:'Happy Clients', stat_years:'Years Experience', stat_success:'Success Rate',
    testimonials_tag:'Client Reviews', testimonials_title:'What Clients <span class="gold">Say</span>',
    test_1:'Abir delivered an absolutely stunning website beyond my expectations. His attention to detail, creativity, and professionalism are unmatched. Highly recommend!',
    test_2:'Working with Abir was a game-changer for my business. He built a premium e-commerce platform that increased my sales by 200%. Exceptional work!',
    test_3:'Incredible talent! Abir redesigned our entire website and the results were phenomenal. Fast delivery, stunning design, and excellent communication throughout.',
    test_4:"Best developer I've ever hired on Fiverr! The AI chatbot he built for our platform saved us thousands in customer support costs. Absolutely brilliant!",
    blog_tag:'Latest Articles', blog_title:'My <span class="gold">Blog</span>',
    faq_tag:'Questions', faq_title:'Frequently Asked <span class="gold">Questions</span>',
    faq_q1:'How long does a website project take?', faq_q2:'What technologies do you specialize in?', faq_q3:'Do you provide post-delivery support?',
    faq_q4:'Are your websites mobile-responsive?', faq_q5:'What payment methods do you accept?', faq_q6:'Can you redesign my existing website?',
    contact_tag:'Get In Touch', contact_title:'Contact <span class="gold">Me</span>',
    contact_subtitle:"Let's Create Something <span class='gold'>Amazing</span>",
    contact_desc:"Ready to take your digital presence to the next level? I'm available for freelance projects, full-time opportunities, and collaborations. Let's build something extraordinary together!",
    label_gmail:'Gmail', label_whatsapp:'WhatsApp', label_telegram:'Telegram', label_phone:'Phone', label_location2:'Location',
    form_name:'Your Name', form_email:'Your Email', form_subject:'Subject', form_budget:'Budget Range', form_select_budget:'Select Budget',
    form_message:'Message', form_message_placeholder:'Tell me about your project...', form_submit:'Send Message',
    footer_desc:'Web Developer, Programmer & Creative Thinker crafting premium digital experiences that make a lasting impression.',
    footer_quick:'Quick Links', footer_services:'Services', footer_hire:'Hire Me On'
  },
  bn: {
    nav_home:'হোম', nav_about:'সম্পর্কে', nav_skills:'দক্ষতা', nav_services:'সেবাসমূহ', nav_projects:'প্রকল্প', nav_blog:'ব্লগ', nav_contact:'যোগাযোগ', nav_hire:'হায়ার করুন',
    hero_badge:'ফ্রিল্যান্স কাজের জন্য প্রস্তুত', hero_role_prefix:'আমি একজন ', hero_desc:'নান্দনিক সৌন্দর্য ও প্রযুক্তিগত উৎকর্ষতার সংমিশ্রণে ডিজিটাল অভিজ্ঞতা তৈরি করি। আমি প্রিমিয়াম ওয়েব সমাধান তৈরি করি যা ফলাফল দেয় এবং স্থায়ী ছাপ রাখে।',
    btn_hire_me:'হায়ার করুন', btn_view_work:'কাজ দেখুন', btn_download_cv:'সিভি ডাউনলোড', btn_lets_talk:'কথা বলি',
    stat_projects_label:'প্রকল্প', stat_clients_label:'ক্লায়েন্ট', stat_exp_label:'বছরের অভিজ্ঞতা', scroll_down:'নিচে স্ক্রল করুন',
    about_tag:'আমাকে জানুন', about_title:'আমার <span class="gold">সম্পর্কে</span>', premium_dev:'প্রিমিয়াম ডেভেলপার', years_exp:'বছরের<br>উৎকর্ষতা',
    about_subtitle:'ধারণাকে <span class="gold">ডিজিটাল বাস্তবে</span> রূপান্তরিত করছি',
    about_text_1:'হ্যালো! আমি <strong>Md. Mehedi Hasan Abir</strong>, বাংলাদেশের একজন উৎসাহী ওয়েব ডেভেলপার, প্রোগ্রামার এবং সৃজনশীল চিন্তাবিদ। আমি প্রিমিয়াম ডিজিটাল অভিজ্ঞতা তৈরিতে বিশেষজ্ঞ যা অত্যাধুনিক প্রযুক্তি ও চমৎকার ডিজাইনের সংমিশ্রণ।',
    about_text_2:'ফুল-স্ট্যাক ডেভেলপমেন্ট, UI/UX ডিজাইন এবং AI ইন্টিগ্রেশনে দক্ষতার সাথে আমি এমন সমাধান প্রদান করি যা কেবল দেখতেই অসাধারণ নয়, নির্ভুলভাবে কাজ করেও। প্রতিটি প্রকল্পে আমি অসাধারণ কিছু তৈরি করতে আমার পূর্ণ নিবেদন উৎসর্গ করি।',
    label_name:'নাম:', label_email:'ইমেইল:', label_location:'অবস্থান:', label_status:'অবস্থা:', available:'প্রস্তুত',
    timeline_title:'আমার <span class="gold">যাত্রা</span>',
    tl_1_title:'কোডিং যাত্রা শুরু', tl_1_desc:'HTML, CSS এবং JavaScript শেখা শুরু করি, ওয়েবের জন্য তৈরির শিল্পে মুগ্ধ হই।',
    tl_2_title:'প্রথম ফ্রিল্যান্স প্রকল্প', tl_2_desc:'Fiverr-এ প্রথম ক্লায়েন্ট পেয়েছি, একটি প্রিমিয়াম বিজনেস ওয়েবসাইট তৈরি করেছি যা ৫-স্টার রিভিউ পেয়েছে।',
    tl_3_title:'React ও Node.js-এ দক্ষতা', tl_3_desc:'ফুল-স্ট্যাক ডেভেলপমেন্টে প্রসারিত হয়েছি, আধুনিক প্রযুক্তিতে জটিল ওয়েব অ্যাপ্লিকেশন তৈরি করেছি।',
    tl_4_title:'AI ও অ্যাডভান্সড সমাধান', tl_4_desc:'প্রকল্পে AI টুলস এবং প্রম্পট ইঞ্জিনিয়ারিং যুক্ত করেছি, পরবর্তী প্রজন্মের ডিজিটাল সমাধান অফার করছি।',
    tl_5_title:'প্রিমিয়াম পোর্টফোলিও বৃদ্ধি', tl_5_desc:'৫০+ সম্পন্ন প্রকল্প নিয়ে ব্যবসা সম্প্রসারণ, বিশ্বব্যাপী ক্লায়েন্টদের প্রিমিয়াম মানের কাজ পরিবেশন।',
    skills_tag:'আমার দক্ষতা', skills_title:'প্রযুক্তিগত <span class="gold">দক্ষতা</span>', skills_proficiency:'দক্ষতার মাত্রা', skills_tools:'টুলস ও প্রযুক্তি',
    services_tag:'আমি যা অফার করি', services_title:'প্রিমিয়াম <span class="gold">সেবাসমূহ</span>',
    projects_tag:'আমার কাজ', projects_title:'বিশেষ <span class="gold">প্রকল্প</span>',
    filter_all:'সব', filter_web:'ওয়েব ডেভ', filter_design:'UI/UX', filter_ai:'AI',
    stat_projects:'প্রকল্প সম্পন্ন', stat_clients:'সন্তুষ্ট ক্লায়েন্ট', stat_years:'বছরের অভিজ্ঞতা', stat_success:'সাফল্যের হার',
    testimonials_tag:'ক্লায়েন্ট রিভিউ', testimonials_title:'ক্লায়েন্টরা কী <span class="gold">বলেন</span>',
    test_1:'আবির আমার প্রত্যাশার চেয়েও অনেক সুন্দর ওয়েবসাইট তৈরি করেছে। তার বিস্তারিত মনোযোগ, সৃজনশীলতা এবং পেশাদারিত্ব অতুলনীয়। অত্যন্ত সুপারিশ করি!',
    test_2:'আবিরের সাথে কাজ করা আমার ব্যবসার জন্য গেম-চেঞ্জার ছিল। সে একটি প্রিমিয়াম ই-কমার্স প্ল্যাটফর্ম তৈরি করেছে যা আমার বিক্রি ২০০% বাড়িয়েছে। অসাধারণ কাজ!',
    test_3:'অবিশ্বাস্য প্রতিভা! আবির আমাদের পুরো ওয়েবসাইট পুনরায় ডিজাইন করেছে এবং ফলাফল ছিল অসাধারণ। দ্রুত ডেলিভারি, চমৎকার ডিজাইন এবং পুরো সময় জুড়ে দুর্দান্ত যোগাযোগ।',
    test_4:'Fiverr-এ আমি যে সেরা ডেভেলপার হায়ার করেছি! সে আমাদের প্ল্যাটফর্মের জন্য যে AI চ্যাটবট তৈরি করেছে তা কাস্টমার সাপোর্ট খরচে হাজার হাজার টাকা সাশ্রয় করেছে। একেবারেই দারুণ!',
    blog_tag:'সর্বশেষ আর্টিকেল', blog_title:'আমার <span class="gold">ব্লগ</span>',
    faq_tag:'প্রশ্ন', faq_title:'প্রায়শই জিজ্ঞাসিত <span class="gold">প্রশ্ন</span>',
    faq_q1:'একটি ওয়েবসাইট প্রকল্প কত সময় লাগে?', faq_q2:'আপনি কোন প্রযুক্তিতে বিশেষজ্ঞ?', faq_q3:'ডেলিভারির পরে কি সাপোর্ট দেন?',
    faq_q4:'আপনার ওয়েবসাইট কি মোবাইল-রেসপন্সিভ?', faq_q5:'আপনি কোন পেমেন্ট পদ্ধতি গ্রহণ করেন?', faq_q6:'আপনি কি আমার বিদ্যমান ওয়েবসাইট পুনরায় ডিজাইন করতে পারবেন?',
    contact_tag:'যোগাযোগ করুন', contact_title:'আমার সাথে <span class="gold">যোগাযোগ</span>',
    contact_subtitle:"চলুন কিছু <span class='gold'>অসাধারণ</span> তৈরি করি",
    contact_desc:'আপনার ডিজিটাল উপস্থিতিকে পরবর্তী স্তরে নিতে প্রস্তুত? আমি ফ্রিল্যান্স প্রকল্প, ফুল-টাইম সুযোগ এবং সহযোগিতার জন্য প্রস্তুত। চলুন একসাথে কিছু অসাধারণ তৈরি করি!',
    label_gmail:'জিমেইল', label_whatsapp:'হোয়াটসঅ্যাপ', label_telegram:'টেলিগ্রাম', label_phone:'ফোন', label_location2:'অবস্থান',
    form_name:'আপনার নাম', form_email:'আপনার ইমেইল', form_subject:'বিষয়', form_budget:'বাজেট', form_select_budget:'বাজেট নির্বাচন করুন',
    form_message:'বার্তা', form_message_placeholder:'আমার প্রকল্প সম্পর্কে বলুন...', form_submit:'বার্তা পাঠান',
    footer_desc:'ওয়েব ডেভেলপার, প্রোগ্রামার ও সৃজনশীল চিন্তাবিদ - স্থায়ী ছাপ রাখে এমন প্রিমিয়াম ডিজিটাল অভিজ্ঞতা তৈরি করি।',
    footer_quick:'দ্রুত লিংক', footer_services:'সেবাসমূহ', footer_hire:'এখানে হায়ার করুন'
  },
  ar: {
    nav_home:'الرئيسية', nav_about:'عن', nav_skills:'المهارات', nav_services:'الخدمات', nav_projects:'المشاريع', nav_blog:'المدونة', nav_contact:'اتصل', nav_hire:'وظفني',
    hero_badge:'متاح للعمل الحر', hero_role_prefix:'أنا ', hero_desc:'أصنع تجارب رقمية تجمع بين الجمال الجمالي والتميز التقني. أبني حلول ويب متميزة تحقق النتائج وتترك انطباعات دائمة.',
    btn_hire_me:'وظفني', btn_view_work:'شاهد أعمالي', btn_download_cv:'تحميل السيرة الذاتية', btn_lets_talk:'لنتحدث',
    stat_projects_label:'مشاريع', stat_clients_label:'عملاء', stat_exp_label:'سنوات خبرة', scroll_down:'مرر للأسفل',
    about_tag:'تعرف علي', about_title:'عن <span class="gold">نفس</span>', premium_dev:'مطور متميز', years_exp:'سنوات<br>التميز',
    about_subtitle:'تحويل الأفكار إلى <span class="gold">واقع رقمي</span>',
    about_text_1:'مرحباً! أنا <strong>Md. Mehedi Hasan Abir</strong>، مطور ويب شغوف ومبركر ومفكر إبداعي من بنغلاديش. أتخصص في إنشاء تجارب رقمية متميزة تجمع بين التكنولوجيا المتقدمة وجماليات التصميم المذهلة.',
    about_text_2:'بخبرة تمتد عبر تطوير الفول ستاك وتصميم UI/UX وتكامل الذكاء الاصطناعي، أقدم حلولاً لا تبدو استثنائية فحسب بل تعمل بشكل لا تشوبه شائبة. كل مشروع أتعهد به يحظى بتفانيي الكامل لصنع شيء مميز حقاً.',
    label_name:'الاسم:', label_email:'البريد:', label_location:'الموقع:', label_status:'الحالة:', available:'متاح',
    timeline_title:'<span class="gold">رحلتي</span>',
    tl_1_title:'بدأت رحلة البرمجة', tl_1_desc:'بدأت تعلم HTML وCSS وJavaScript، وقعت في حب فن البناء للويب.',
    tl_2_title:'أول مشروع حر', tl_2_desc:'حصلت على أول عميل على Fiverr، قدمت موقع أعمال متميز حصل على تقييمات 5 نجوم.',
    tl_3_title:'إتقان React وNode.js', tl_3_desc:'توسعت في تطوير الفول ستاك، بناء تطبيقات ويب معقدة بتقنيات حديثة.',
    tl_4_title:'حلول AI والمتقدمة', tl_4_desc:'دمجت أدوات AI وهندسة الأوامر في المشاريع، أقدم حلول رقمية من الجيل التالي.',
    tl_5_title:'نمو محفظة متميزة', tl_5_desc:'توسيع الأعمال مع 50+ مشروع مكتمل، خدمة العملاء عالمياً بعمل متميز.',
    skills_tag:'خبرتي', skills_title:'المهارات <span class="gold">التقنية</span>', skills_proficiency:'مستويات الكفاءة', skills_tools:'الأدوات والتقنيات',
    services_tag:'ما أقدمه', services_title:'خدمات <span class="gold">متميزة</span>',
    projects_tag:'أعمالي', projects_title:'مشاريع <span class="gold">مميزة</span>',
    filter_all:'الكل', filter_web:'تطوير ويب', filter_design:'UI/UX', filter_ai:'ذكاء اصطناعي',
    stat_projects:'مشاريع مكتملة', stat_clients:'عملاء سعداء', stat_years:'سنوات خبرة', stat_success:'معدل النجاح',
    testimonials_tag:'آراء العملاء', testimonials_title:'ماذا يقول <span class="gold">العملاء</span>',
    test_1:'قدم أبير موقعاً مذهلاً يفوق توقعاتي. اهتمامه بالتفاصيل وإبداعه واحترافيته لا مثيل لها. أوصي بشدة!',
    test_2:'العمل مع أبير كان نقطة تحول لنشاطي التجاري. بنى منصة تجارة إلكترونية متميزة زادت مبيعاتي بنسبة 200%. عمل استثنائي!',
    test_3:'موهبة لا تصدق! أعاد أبير تصميم موقعنا بالكامل وكانت النتائج مذهلة. تسليم سريع، تصميم مذهل، وتواصل ممتاز طوال الوقت.',
    test_4:'أفضل مطور وظفته على Fiverr! روبوت الدردشة الذكي الذي بناه لمنصتنا وفر لنا آلاف التكاليف. رائع تماماً!',
    blog_tag:'أحدث المقالات', blog_title:'<span class="gold">مدونتي</span>',
    faq_tag:'أسئلة', faq_title:'الأسئلة <span class="gold">الشائعة</span>',
    faq_q1:'كم يستغرق مشروع موقع؟', faq_q2:'ما التقنيات التي تتخصص فيها؟', faq_q3:'هل تقدم دعماً بعد التسليم؟',
    faq_q4:'هل مواقعك متجاوبة مع الجوال؟', faq_q5:'ما طرق الدفع التي تقبلها؟', faq_q6:'هل يمكنك إعادة تصميم موقعي الحالي؟',
    contact_tag:'تواصل معي', contact_title:'اتصل <span class="gold">بي</span>',
    contact_subtitle:"لنصنع شيئاً <span class='gold'>رائعاً</span>",
    contact_desc:'مستعد لنقل حضورك الرقمي إلى المستوى التالي؟ أنا متاح للمشاريع الحرة والفرص الدائمة والتعاونات. لنبنِ شيئاً استثنائياً معاً!',
    label_gmail:'جيميل', label_whatsapp:'واتساب', label_telegram:'تيليجرام', label_phone:'هاتف', label_location2:'الموقع',
    form_name:'اسمك', form_email:'بريدك الإلكتروني', form_subject:'الموضوع', form_budget:'الميزانية', form_select_budget:'اختر الميزانية',
    form_message:'الرسالة', form_message_placeholder:'أخبرني عن مشروعك...', form_submit:'إرسال الرسالة',
    footer_desc:'مطور ويب ومبركر ومفكر إبداعي يصنع تجارب رقمية متميزة تترك انطباعاً دائماً.',
    footer_quick:'روابط سريعة', footer_services:'الخدمات', footer_hire:'وظفني على'
  }
};

function initLanguage() {
  const html = document.documentElement;
  const btns = document.querySelectorAll('.lang-btn');
  const saved = localStorage.getItem('lang') || 'en';
  setLanguage(saved);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      localStorage.setItem('lang', lang);
    });
  });
}

function setLanguage(lang) {
  const t = translations[lang];
  if (!t) return;
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Translate all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // Update typed words
  if (lang === 'bn') {
    updateTypedWords(['ওয়েব ডেভেলপার', 'প্রোগ্রামার', 'সৃজনশীল চিন্তাবিদ', 'ফ্রিল্যান্সার']);
  } else if (lang === 'ar') {
    updateTypedWords(['مطور ويب', 'مبرمج', 'مفكر إبداعي', 'عامل حر']);
  } else {
    updateTypedWords(['Web Developer', 'Programmer', 'Creative Thinker', 'Freelancer']);
  }
}

function updateTypedWords(words) {
  const typedEl = document.getElementById('typedText');
  if (typedEl && typedEl._updateWords) {
    typedEl._updateWords(words);
  }
}

// Patch initTyped to support word updates
(function() {
  const origInitTyped = typeof initTyped !== 'undefined' ? initTyped : null;
  // Words are managed via the global typedWords variable
  window.typedWords = ['Web Developer', 'Programmer', 'Creative Thinker', 'Freelancer', 'UI/UX Designer', 'AI Enthusiast'];
})();
