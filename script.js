// Sticky Navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Mobile Dropdown Toggles
document.querySelectorAll('.nav-link-wrapper > a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = link.parentElement;
            parent.classList.toggle('mobile-open');
            
            // Toggle dropdown visibility
            const dropdown = parent.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.style.display = parent.classList.contains('mobile-open') ? 'block' : 'none';
                dropdown.style.opacity = parent.classList.contains('mobile-open') ? '1' : '0';
                dropdown.style.visibility = parent.classList.contains('mobile-open') ? 'visible' : 'hidden';
                dropdown.style.transform = parent.classList.contains('mobile-open') ? 'translateY(0)' : 'translateY(10px)';
            }
        }
    });
});

// Highlight Active Link
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Clear any existing active classes
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        const linkPath = href.split('#')[0];
        
        // Exact match for the page
        if (linkPath === currentPath) {
            link.classList.add('active');
            
            // If it's in a dropdown, highlight the parent too, but only if they are for the same page
            const dropdownParent = link.closest('.nav-link-wrapper');
            if (dropdownParent) {
                const parentLink = dropdownParent.querySelector(':scope > a');
                if (parentLink) {
                    const parentPath = parentLink.getAttribute('href').split('#')[0];
                    if (parentPath === linkPath) {
                        parentLink.classList.add('active');
                    }
                }
            }
        }
    });
});

// Close Mobile Menu on Link Click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});
// Search Toggle
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.getElementById('search-bar');

if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('active');
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        const originalBtnText = submitBtn.innerText;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        formStatus.innerHTML = '';

        const formData = new FormData(contactForm);

        try {
            console.log("Submitting form to Formspree...");
            const response = await fetch('https://formspree.io/f/xyknlkjj', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = `<div style="padding: 15px; background: #e7f5ee; color: #2e7d32; border-radius: 4px; margin-bottom: 20px;">
                    <i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. We will get back to you soon.
                </div>`;
                contactForm.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    formStatus.innerHTML = `<div style="padding: 15px; background: #feebee; color: #c62828; border-radius: 4px; margin-bottom: 20px;">
                        ${data.errors.map(error => error.message).join(", ")}
                    </div>`;
                } else {
                    throw new Error('Submission failed');
                }
            }
        } catch (error) {
            formStatus.innerHTML = `<div style="padding: 15px; background: #feebee; color: #c62828; border-radius: 4px; margin-bottom: 20px;">
                <i class="fa-solid fa-circle-exclamation"></i> Oops! There was a problem submitting your form. Please try again later.
            </div>`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    });
}

// Global Search Functionality
const SITE_INDEX = [
    { title: "Home", text: "Branding Whizz, Roots to grow, branding activities in Botswana", link: "index.html" },
    { title: "Who We Are", text: "Our Story, Mandate, Vision, Mission, Values, Leadership, Botswana branding", link: "who-we-are.html" },
    { title: "Services", text: "What we do, Creative Design, Marketing, Advertising, Printing, Production, Digital Media", link: "services.html" },
    { title: "Opportunities", text: "Careers, Tender Notices, Supplier Registration, join our team", link: "opportunities.html" },
    { title: "Our Ecosystem", text: "Departments, 4B's Core Values, Organizational Structure, Khudu, Lengau", link: "ecosystem.html" },
    { title: "Projects", text: "Gallery, Corporate Identity, Tech Launch, Eco-Packaging, branding portfolio", link: "projects.html" },
    { title: "Contact Us", text: "Get in touch, Gaborone location, email, phone, contact form", link: "contact.html" },
    { title: "Our Mandate", text: "Branding Whizz mandate, economic growth, strategic brand development", link: "who-we-are.html#mandate" },
    { title: "Wosei Trust", text: "Social impact, community engagement, women empowerment", link: "ecosystem.html#wosei" }
];

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }

        const filteredResults = SITE_INDEX.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.text.toLowerCase().includes(query)
        );

        displaySearchResults(filteredResults);
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            searchResults.classList.remove('active');
        }
    });

    // Handle form submission (Enter key)
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.toLowerCase().trim();
            const firstResult = SITE_INDEX.find(item => 
                item.title.toLowerCase().includes(query) || 
                item.text.toLowerCase().includes(query)
            );
            if (firstResult) {
                window.location.href = firstResult.link;
            }
        }
    });
}

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <a href="${result.link}" class="search-result-item">
                <h4>${result.title}</h4>
                <p>${truncateText(result.text, 60)}</p>
            </a>
        `).join('');
    }
    searchResults.classList.add('active');
}

function truncateText(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}



// Hero Slideshow
function startHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slides .slide');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, slideInterval);
}

// Animated Counters for Real Results
function initCounters() {
    const resultsSection = document.querySelector('.results-section');
    if (!resultsSection) return;

    const counters = document.querySelectorAll('.result-item .number');
    const speed = 200; // The lower the slower

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target + (target === 100 ? '%' : ''); // Add % for brand success
        }
    };

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(resultsSection);
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    startHeroSlideshow();
    initCounters();
});
