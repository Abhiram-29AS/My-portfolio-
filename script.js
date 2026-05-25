/**
 * PORTFOLIO CONTROLLER: Abhiramjee Pittu
 * Built with vanilla ES6+ JS
 */

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------
  // 1. SCROLL PROGRESS & STICKY NAVBAR
  // ---------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scrollProgress');

  const handleScroll = () => {
    // Sticky Header class toggler
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Progress bar percentage calculator
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScrollHeight > 0) {
      const scrolledPercentage = (window.scrollY / totalScrollHeight) * 100;
      scrollProgressBar.style.width = `${scrolledPercentage}%`;
    } else {
      scrollProgressBar.style.width = '0%';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initialize once on load
  handleScroll();


  // ---------------------------------------------------------
  // 2. MOUSE radial spotlight backdrop tracker (High performance)
  // ---------------------------------------------------------
  const mouseSpotlight = document.querySelector('.mouse-spotlight');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Interpolate and paint spotlight at 60fps
  const animateSpotlight = () => {
    // Only apply tracking if viewport is desktop to conserve mobile batteries
    if (window.innerWidth > 1024) {
      // Linear interpolation for smooth trailing delay
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      
      document.documentElement.style.setProperty('--mouse-x', `${currentX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${currentY}px`);
    }
    requestAnimationFrame(animateSpotlight);
  };
  
  // Kick off tracking loop
  requestAnimationFrame(animateSpotlight);


  // ---------------------------------------------------------
  // 3. TYPEWRITER EFFECT
  // ---------------------------------------------------------
  const taglineEl = document.getElementById('tagline');
  const taglines = [
    "AI & Data Science Student",
    "ML Engineer",
    "Computer Vision Enthusiast"
  ];
  
  let taglineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typewriterDelay = 100;

  const performTypewriter = () => {
    const currentText = taglines[taglineIndex];
    
    if (isDeleting) {
      // Backspacing characters
      taglineEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typewriterDelay = 50; // Faster deleting speed
    } else {
      // Typing characters
      taglineEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typewriterDelay = 100; // Normal typing speed
    }

    // Handle end-of-string transitions
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at full string before deleting
      typewriterDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next string
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      typewriterDelay = 500; // Pause briefly before writing new string
    }

    setTimeout(performTypewriter, typewriterDelay);
  };

  // Start Typewriter
  if (taglineEl) {
    performTypewriter();
  }


  // ---------------------------------------------------------
  // 4. ACTIVE NAVIGATION LINK scroll highlighter
  // ---------------------------------------------------------
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavActiveSection = () => {
    let currentActiveSectionId = 'home';
    const scrollPos = window.scrollY + 150; // Offset padding for trigger

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentActiveSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavActiveSection, { passive: true });


  // ---------------------------------------------------------
  // 5. INTERSECTION OBSERVER FOR FADE-IN REVEALS
  // ---------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Custom graphic animation trigger inside hero visual on screen entrance
        if (entry.target.classList.contains('hero-art-container')) {
          const bars = entry.target.querySelectorAll('.art-bar');
          bars.forEach((bar, idx) => {
            const heights = ['30%', '55%', '75%', '89%'];
            setTimeout(() => {
              bar.style.height = heights[idx];
            }, 200 + idx * 150);
          });
        }

      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ---------------------------------------------------------
  // 6. RESPONSIVE MOBILE BURGER MENU
  // ---------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navLinksMenu = document.getElementById('navLinks');
  const allNavMenuItems = document.querySelectorAll('.nav-links a');

  const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    navLinksMenu.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    hamburger.classList.remove('active');
    navLinksMenu.classList.remove('active');
  };

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking nav link
  allNavMenuItems.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu when resizing screen back to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  }, { passive: true });


  // ---------------------------------------------------------
  // 7. INTERACTIVE CONTACT FORM SUBMISSION & SUCCESS TOAST
  // ---------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  const triggerSuccessToast = () => {
    toast.classList.add('active');
    
    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  };

  const validateEmail = (emailVal) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailVal);
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formName = document.getElementById('formName');
    const formEmail = document.getElementById('formEmail');
    const formMessage = document.getElementById('formMessage');
    
    let isFormValid = true;

    // Direct client visual feedback logic (Red warning outlines)
    [formName, formEmail, formMessage].forEach(input => {
      input.style.borderColor = '';
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        isFormValid = false;
      }
    });

    if (isFormValid && !validateEmail(formEmail.value.trim())) {
      formEmail.style.borderColor = '#ef4444';
      alert('Please enter a valid email address.');
      isFormValid = false;
    }

    if (isFormValid) {
      // Mock successful email sending pipeline
      console.log('Sending secure contact message:', {
        name: formName.value.trim(),
        email: formEmail.value.trim(),
        message: formMessage.value.trim()
      });

      // Clear all fields
      contactForm.reset();
      
      // Fire visual success feedback
      triggerSuccessToast();
    }
  });


  // ---------------------------------------------------------
  // 8. RESUME WEB PREVIEW MODAL OVERLAY CONTROLLER
  // ---------------------------------------------------------
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');

  const openModal = () => {
    resumeModal.classList.add('active');
    // Lock scrolling on main page behind modal
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    resumeModal.classList.remove('active');
    // Restore scrolling
    document.body.style.overflow = '';
  };

  openResumeBtn.addEventListener('click', openModal);
  closeResumeBtn.addEventListener('click', closeModal);

  // Close modal when clicking on the dark translucent backdrop blur directly
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  // Close modal when pressing ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });

});
