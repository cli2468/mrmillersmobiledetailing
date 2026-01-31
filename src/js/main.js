import '../css/style.css'

// Mobile Menu Logic
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Navbar Scroll Effect + Smart Color Change
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero-section');
  const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 600;

  // Add scrolled class when scrolled down
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Switch to light navbar when past the hero section
  if (window.scrollY > heroBottom - 100) {
    navbar.classList.add('light-section');
  } else {
    navbar.classList.remove('light-section');
  }
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Smooth Scroll for Anchor Links (Optional if CSS scroll-behavior is set, but good for older browsers or custom offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 60;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Image Comparison Slider Logic
function initComparisons() {
  const x = document.getElementsByClassName("img-comp-overlay");
  for (let i = 0; i < x.length; i++) {
    compareImages(x[i]);
  }

  function compareImages(img) {
    let slider, clicked = 0, w, h;
    w = img.offsetWidth;
    h = img.offsetHeight;

    img.style.width = (w / 2) + "px";

    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    // Inject the icon directly to avoid font code mapping issues
    // Inject custom SVG: Slightly Shorter Wide Aspect Ratio
    slider.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 30 20" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><path d="M1 10h28M1 10l6-6m-6 6l6 6M29 10l-6-6m6 6l-6 6"/></svg>`;
    img.parentElement.insertBefore(slider, img);

    // slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px"; // Let CSS handle vertical centering
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      clicked = 0;
    }

    function slideMove(e) {
      let pos;
      if (clicked == 0) return false;
      pos = getCursorPos(e);
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }

    function getCursorPos(e) {
      let a, x = 0;
      e = (e.changedTouches) ? e.changedTouches[0] : e;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}

// Initialize on window load (after images are loaded)
window.addEventListener('load', initComparisons);

// Package Tab Switching
const packages = {
  essential: {
    category: 'EXTERIOR DETAIL',
    name: 'Exterior Detail',
    basePrice: '80', // For "Starting at $80"
    image: 'assets/gallery-silver-suv.jpg',
    objectPosition: 'center 15%',
    desc: 'Top-tier exterior care for a showroom shine. Includes wash, clay bar, and wax.',
    pricing: [
      { type: 'Sedan / Coupe', cost: '$80' },
      { type: 'Small SUV / Truck', cost: '$100' },
      { type: 'Large SUV / Minivan', cost: '$120' }
    ],
    features: [
      { title: 'Exterior Detailing', desc: 'Thorough hand wash, pre-rinse, foam treatment, and door jamb cleaning.' },
      { title: 'Wheel Treatment', desc: 'Deep cleaning of wheels, inner barrels, and wheel wells for a renewed look.' },
      { title: 'Decontamination', desc: 'Clay bar and iron removal to smooth out paint roughness.' },
      { title: 'Protection', desc: 'Spray wax sealant applied for months of hydrophobic protection and shine.' },
      { title: 'Dressing', desc: 'Tires and trim dressed for a non-greasy, satin factory finish.' },
      { title: 'Glass', desc: 'Streak-free cleaning of all exterior windows and mirrors.' }
    ]
  },
  premium: {
    category: 'INTERIOR DETAIL',
    name: 'Interior Detail',
    basePrice: '120',
    image: 'assets/interior-detail-v2.jpg',
    objectPosition: 'center 67%', // Nudges interior details UP
    desc: 'Deep cleaning for every surface inside your car. From steam cleaning to leather care.',
    pricing: [
      { type: 'Sedan / Coupe', cost: '$120' },
      { type: 'Small SUV / Truck', cost: '$140' },
      { type: 'Large SUV / Minivan', cost: '$160' }
    ],
    features: [
      { title: 'Deep Cleaning', desc: 'Steam cleaning and hot water extraction for carpets and upholstery.' },
      { title: 'Leather Care', desc: 'Gentle scrubbing and conditioning to restore leather softness.' },
      { title: 'Interior Surface', desc: 'Deep clean of dashboard, console, door panels, and cup holders.' },
      { title: 'Vacuuming', desc: 'Compreshensive vacuuming including trunk and hard-to-reach crevices.' },
      { title: 'Windows', desc: 'Crystal clear cleaning of all interior glass and sunroof.' }
    ]
  },
  ultimate: {
    category: 'FULL DETAIL',
    name: 'Full Detail',
    basePrice: '250',
    image: 'assets/gallery-camaro.jpg',
    objectPosition: 'center 15%', // Nudges car DOWN
    desc: 'The complete package. A total revival of both interior and exterior to like-new condition.',
    pricing: [
      { type: 'Sedan / Coupe', cost: '$250' },
      { type: 'Small SUV / Truck', cost: '$280' },
      { type: 'Large SUV / Minivan', cost: '$320' }
    ],
    features: [
      { title: 'Complete Restoration', desc: 'Includes everything from both Interior and Exterior packages.' },
      { title: 'Engine Bay', desc: 'Safe degreasing and dressing of engine bay plastics.' },
      { title: 'Headlights', desc: 'Light restoration to improve visibility and clarity.' },
      { title: 'Premium Protection', desc: 'Upgraded 6-month silica sealant for superior gloss.' },
      { title: 'Pet Hair', desc: 'Thorough removal of pet hair from all fabric surfaces.' }
    ]
  }
};

// -- HELPER: Animate Marker on Intersection --
const markerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const marker = entry.target.querySelector('.marker-text');
      if (marker) {
        marker.classList.remove('animate');
        void marker.offsetWidth; // trigger reflow
        marker.classList.add('animate');
      }
    }
  });
}, { threshold: 0.2 });

// -- HELPER: Smooth Accordion Animation --
function initAccordions(container) {
  const details = container.querySelectorAll('.pkg-accordion');
  details.forEach(el => {
    const summary = el.querySelector('summary');
    summary.addEventListener('click', (e) => {
      if (el.open) {
        e.preventDefault();
        el.classList.add('closing');
        setTimeout(() => {
          el.open = false;
          el.classList.remove('closing');
        }, 300); // Match CSS transition
      }
    });
  });
}

const packageTabs = document.querySelectorAll('.package-tab');
const packageCard = document.querySelector('.package-card');

if (packageTabs.length && packageCard) {
  // Observe the initial card
  markerObserver.observe(packageCard);
  initAccordions(packageCard);

  packageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      packageTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      // Get package data
      const packageKey = tab.dataset.package;
      const pkg = packages[packageKey];

      // Trigger "Returning" (retract) animation
      const marker = packageCard.querySelector('.marker-text');
      if (marker) {
        marker.classList.remove('animate');
        void marker.offsetWidth;
        marker.classList.add('retract');
      }

      // Smooth transition for "returning" animation
      packageCard.style.opacity = '0.4';
      packageCard.style.transform = 'translateY(5px)';
      packageCard.style.transition = 'all 0.15s ease';

      setTimeout(() => {
        // Update card content - ACCORDION LAYOUT
        packageCard.innerHTML = `
          <div class="pkg-image-header">
              <img src="${pkg.image}" alt="${pkg.name}" class="pkg-header-img" style="object-position: ${pkg.objectPosition}">
          </div>
          <div class="pkg-body">
              <h3 class="pkg-title">${pkg.name}</h3>
              <p class="pkg-desc">${pkg.desc}</p>
              
              <div class="pkg-marker-price">
                Starting at <span class="marker-text animate">$${pkg.basePrice}</span>
              </div>
              
              <div class="pkg-accordions">
                <!-- Pricing Dropdown -->
                <details class="pkg-accordion">
                  <summary>Pricing <i class='bx bx-chevron-down'></i></summary>
                  <div class="accordion-content">
                    <div class="accordion-inner">
                      <table class="pricing-table">
                        ${pkg.pricing.map(p => `<tr><td>${p.type}</td><td class="price-col">${p.cost}</td></tr>`).join('')}
                      </table>
                    </div>
                  </div>
                </details>

                <!-- What's Included Dropdown -->
                <details class="pkg-accordion">
                  <summary>What's Included <i class='bx bx-chevron-down'></i></summary>
                  <div class="accordion-content">
                    <div class="accordion-inner">
                      <ul class="package-features-list">
                        ${pkg.features.map(f => `
                          <li>
                            <strong class="feature-title">${f.title}:</strong> 
                            <span class="feature-desc">${f.desc}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  </div>
                </details>
              </div>
              
              <div class="pkg-actions">
                <a href="tel:5551234567" class="btn btn-dark btn-full">Call Now</a>
                <a href="#contact" class="btn btn-outline-dark btn-full">Book Now</a>
              </div>
          </div>
        `;

        // Reset Styles
        packageCard.style.opacity = '1';
        packageCard.style.transform = 'translateY(0)';

        // Re-init stuff for new HTML
        initAccordions(packageCard);

        // Trigger Marker Animation Restart
        const marker = packageCard.querySelector('.marker-text');
        if (marker) {
          marker.classList.remove('animate');
          void marker.offsetWidth; // trigger reflow
          marker.classList.add('animate');
        }
      }, 150);
    });
  });
}

// Scroll Animation Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      // Optionally stop observing after animation
      // animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale').forEach(el => {
  animationObserver.observe(el);
});

// Add animation classes to sections and elements
document.querySelectorAll('.section-title').forEach(el => el.classList.add('animate-on-scroll'));
document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.classList.add('animate-scale', `delay-${(i % 4) + 1}`);
  animationObserver.observe(el);
});
document.querySelectorAll('.polaroid').forEach((el, i) => {
  el.classList.add('animate-on-scroll', `delay-${(i % 4) + 1}`);
  animationObserver.observe(el);
});
document.querySelectorAll('.package-card, .comparison-container, .contact-form').forEach(el => {
  el.classList.add('animate-on-scroll');
  animationObserver.observe(el);
});
document.querySelectorAll('.about-content').forEach(el => {
  el.classList.add('animate-left');
  animationObserver.observe(el);
});
document.querySelectorAll('.about-stats').forEach(el => {
  el.classList.add('animate-right');
  animationObserver.observe(el);
});
document.querySelectorAll('h2.layered-title').forEach(el => {
  markerObserver.observe(el);
});

// -- Contact Form Logic --
const contactForm = document.getElementById('contactForm');
const phoneInput = document.getElementById('phoneInput');
const phoneError = document.getElementById('phoneError');
const emailError = document.getElementById('emailError');

if (phoneInput) {
  // Phone Masking (XXX) XXX-XXXX
  phoneInput.addEventListener('input', (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  });

  // Phone Validation on Blur
  phoneInput.addEventListener('blur', () => {
    // Check if length is correct (14 chars for (555) 555-5555)
    if (phoneInput.value.length > 0 && phoneInput.value.length < 14) {
      phoneError.classList.add('visible');
    } else {
      phoneError.classList.remove('visible');
    }
  });

  // Clear error on input
  phoneInput.addEventListener('input', () => {
    phoneError.classList.remove('visible');
  });
}

if (contactForm) {
  const emailInput = contactForm.querySelector('input[type="email"]');

  // Validate Email on Blur
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      if (emailInput.value && !emailInput.value.includes('@')) {
        emailError.classList.add('visible');
      } else {
        emailError.classList.remove('visible');
      }
    });

    // Clear error on input
    emailInput.addEventListener('input', () => {
      emailError.classList.remove('visible');
    });
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // Submit Validation - Email
    if (emailInput && !emailInput.value.includes('@')) {
      emailError.classList.add('visible');
      hasError = true;
    }

    // Submit Validation - Phone
    if (phoneInput && phoneInput.value.length < 14) {
      phoneError.classList.add('visible');
      hasError = true;
    }

    if (hasError) {
      return; // Stop submission
    }

    // Success
    alert('Thank you! We will contact you soon.');
    contactForm.reset();
  });
}


// Gallery Lightbox Logic
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

if (galleryItems.length > 0 && lightbox) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      lightbox.classList.add('active');
      lightboxImg.src = item.src;
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}
