document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('input[type="text"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const messageInput = form.querySelector('textarea');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !phone || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }

    const waNumber = '2348188854699';
    const text = `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
    form.reset();
  });
  
    /* Gallery lightbox */
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <div class="lightbox-images">
                <img class="lb-before" src="" alt="Before">
                <img class="lb-after" src="" alt="After">
            </div>
            <p class="lightbox-caption"></p>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lb = document.getElementById('lightbox');
    const lbOverlay = lb.querySelector('.lightbox-overlay');
    const lbClose = lb.querySelector('.lightbox-close');
    const lbBefore = lb.querySelector('.lb-before');
    const lbAfter = lb.querySelector('.lb-after');
    const lbCaption = lb.querySelector('.lightbox-caption');

    function openLightbox(beforeSrc, afterSrc, caption) {
        lbBefore.src = beforeSrc;
        lbAfter.src = afterSrc;
        lbCaption.textContent = caption || '';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
        lbBefore.src = '';
        lbAfter.src = '';
    }

    // Attach click handlers to gallery images
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
        const imgs = card.querySelectorAll('.image-pair img');
        card.addEventListener('click', () => {
            const beforeSrc = imgs[0] ? imgs[0].dataset.full || imgs[0].src : '';
            const afterSrc = imgs[1] ? imgs[1].dataset.full || imgs[1].src : '';
            const caption = card.querySelector('h4') ? card.querySelector('h4').textContent : '';
            openLightbox(beforeSrc, afterSrc, caption);
        });
    });

    lbOverlay.addEventListener('click', closeLightbox);
    lbClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // --- Sticky Header Shadow on Scroll ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

});