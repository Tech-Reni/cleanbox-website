/* ========================================
   GALLERY DATA - All images from folder
   ======================================== */
const galleryImages = [
    // Before & After Projects
    { name: 'Building 1 - Before', src: 'images/before1.jpeg', category: 'before-after' },
    { name: 'Building 1 - After', src: 'images/after1.jpeg', category: 'before-after' },
    { name: 'Building 2 - Before', src: 'images/before2.jpeg', category: 'before-after' },
    { name: 'Building 2 - After', src: 'images/after2.jpeg', category: 'before-after' },
    { name: 'Building 3 - Before', src: 'images/before3.jpeg', category: 'before-after' },
    { name: 'Building 3 - After', src: 'images/after3.jpeg', category: 'before-after' },
    // WhatsApp Images - Completed Work
    { name: 'Project 1', src: 'images/WhatsApp Image 2026-02-12 at 3.43.10 PM.jpeg', category: 'completed' },
    { name: 'Project 2', src: 'images/WhatsApp Image 2026-02-14 at 1.25.38 PM (1).jpeg', category: 'completed' },
    { name: 'Project 3', src: 'images/WhatsApp Image 2026-02-14 at 1.25.38 PM.jpeg', category: 'completed' },
    { name: 'Project 4', src: 'images/WhatsApp Image 2026-02-14 at 1.25.39 PM (1).jpeg', category: 'completed' },
    { name: 'Project 5', src: 'images/WhatsApp Image 2026-02-14 at 1.25.39 PM.jpeg', category: 'completed' },
    { name: 'Project 6', src: 'images/WhatsApp Image 2026-02-14 at 1.25.40 PM.jpeg', category: 'completed' },
    { name: 'Project 7', src: 'images/WhatsApp Image 2026-02-14 at 1.25.41 PM (1).jpeg', category: 'completed' },
    { name: 'Project 8', src: 'images/WhatsApp Image 2026-02-14 at 1.25.41 PM.jpeg', category: 'completed' },
    { name: 'Project 9', src: 'images/WhatsApp Image 2026-02-14 at 1.25.43 PM (1).jpeg', category: 'completed' },
    { name: 'Project 10', src: 'images/WhatsApp Image 2026-02-14 at 1.25.43 PM.jpeg', category: 'completed' },
    { name: 'Project 11', src: 'images/WhatsApp Image 2026-02-14 at 1.25.44 PM.jpeg', category: 'completed' },
    { name: 'Project 12', src: 'images/WhatsApp Image 2026-02-14 at 1.25.45 PM (1).jpeg', category: 'completed' },
    { name: 'Project 13', src: 'images/WhatsApp Image 2026-02-14 at 1.25.45 PM (2).jpeg', category: 'completed' },
    { name: 'Project 14', src: 'images/WhatsApp Image 2026-02-14 at 1.25.45 PM.jpeg', category: 'completed' },
    { name: 'Project 15', src: 'images/WhatsApp Image 2026-02-14 at 1.25.46 PM.jpeg', category: 'completed' },
    { name: 'Project 16', src: 'images/WhatsApp Image 2026-02-14 at 1.25.47 PM (1).jpeg', category: 'completed' },
    { name: 'Project 17', src: 'images/WhatsApp Image 2026-02-14 at 1.25.47 PM.jpeg', category: 'completed' },
    { name: 'Project 18', src: 'images/WhatsApp Image 2026-02-14 at 1.25.48 PM (1).jpeg', category: 'completed' },
    { name: 'Project 19', src: 'images/WhatsApp Image 2026-02-14 at 1.25.48 PM.jpeg', category: 'completed' },
    { name: 'Project 20', src: 'images/WhatsApp Image 2026-02-14 at 1.25.49 PM.jpeg', category: 'completed' },
    { name: 'Project 21', src: 'images/WhatsApp Image 2026-02-14 at 1.25.51 PM (1).jpeg', category: 'completed' },
    { name: 'Project 22', src: 'images/WhatsApp Image 2026-02-14 at 1.25.51 PM.jpeg', category: 'completed' },
    { name: 'Project 23', src: 'images/WhatsApp Image 2026-02-14 at 1.25.52 PM.jpeg', category: 'completed' },
    { name: 'Project 24', src: 'images/WhatsApp Image 2026-02-14 at 1.25.53 PM.jpeg', category: 'completed' },
    { name: 'Project 25', src: 'images/WhatsApp Image 2026-02-14 at 1.25.54 PM.jpeg', category: 'completed' },
    { name: 'Project 26', src: 'images/WhatsApp Image 2026-02-14 at 1.25.55 PM.jpeg', category: 'completed' },
];

/* ========================================
   GALLERY INITIALIZATION & MANAGEMENT
   ======================================== */
let currentLightboxIndex = 0;
let filteredGalleryImages = [...galleryImages];

function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Render gallery
    renderGallery(galleryImages);

    // Filter button handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter images
            const filter = btn.dataset.filter;
            if (filter === 'all') {
                filteredGalleryImages = [...galleryImages];
            } else {
                filteredGalleryImages = galleryImages.filter(img => img.category === filter);
            }

            renderGallery(filteredGalleryImages);
        });
    });
}

function renderGallery(images) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    images.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.innerHTML = `
            <img src="${image.src}" alt="${image.name}" class="gallery-item-image" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-overlay-text">
                    <i class="ri-search-eye-line"></i>
                    <p>View Image</p>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            openLightbox(index);
        });

        galleryGrid.appendChild(card);
    });
}

/* ========================================
   LIGHTBOX FUNCTIONALITY
   ======================================== */
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <div class="lightbox-header">
                <h3 class="lightbox-title">Image Title</h3>
                <span class="lightbox-counter"><span class="current">1</span> / <span class="total">1</span></span>
                <button class="lightbox-close" aria-label="Close gallery">&times;</button>
            </div>
            <div class="lightbox-image-container">
                <img src="" alt="Gallery image" class="lightbox-image">
                <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
                    <i class="ri-arrow-left-s-line"></i>
                </button>
                <button class="lightbox-nav lightbox-next" aria-label="Next image">
                    <i class="ri-arrow-right-s-line"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox') || createLightbox();
    const img = lightbox.querySelector('.lightbox-image');
    const title = lightbox.querySelector('.lightbox-title');
    const currentCounter = lightbox.querySelector('.lightbox-counter .current');
    const totalCounter = lightbox.querySelector('.lightbox-counter .total');

    currentLightboxIndex = index;
    updateLightboxImage();

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add event listeners
    const overlay = lightbox.querySelector('.lightbox-overlay');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    overlay.removeEventListener('click', closeLightbox);
    closeBtn.removeEventListener('click', closeLightbox);
    prevBtn.removeEventListener('click', showPreviousImage);
    nextBtn.removeEventListener('click', showNextImage);

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.removeEventListener('keydown', handleKeydown);
    document.addEventListener('keydown', handleKeydown);

    // Touch swipe support
    addTouchSupport();
}

function updateLightboxImage() {
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox-image');
    const title = lightbox.querySelector('.lightbox-title');
    const currentCounter = lightbox.querySelector('.lightbox-counter .current');
    const totalCounter = lightbox.querySelector('.lightbox-counter .total');

    const image = filteredGalleryImages[currentLightboxIndex];
    img.src = image.src;
    title.textContent = image.name;
    currentCounter.textContent = currentLightboxIndex + 1;
    totalCounter.textContent = filteredGalleryImages.length;
}

function showPreviousImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredGalleryImages.length) % filteredGalleryImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredGalleryImages.length;
    updateLightboxImage();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeydown);
    }
}

function handleKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPreviousImage();
    if (e.key === 'ArrowRight') showNextImage();
}

function addTouchSupport() {
    const lightbox = document.getElementById('lightbox');
    const container = lightbox.querySelector('.lightbox-image-container');
    let touchStartX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (diff > 50) {
            showNextImage();
        } else if (diff < -50) {
            showPreviousImage();
        }
    });
}

/* ========================================
   CONTACT FORM HANDLING
   ======================================== */
function initializeContactForm() {
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
}

/* ========================================
   DOM READY - INITIALIZE EVERYTHING
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Gallery
    initializeGallery();

    // Initialize Contact Form
    initializeContactForm();

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
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
