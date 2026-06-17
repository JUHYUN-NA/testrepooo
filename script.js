// ===== Smooth Scroll Function =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        'section, .about-card, .contact-card, .stat-card, .timeline-item, .product-showcase'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    // ===== Mobile Menu Toggle (if needed) =====
    setupNavigation();

    // ===== Parallax Effect =====
    setupParallax();

    // ===== Counter Animation =====
    animateCounters();
});

// ===== Navigation Setup =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ===== Parallax Effect =====
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = counter.getAttribute('data-target') || counter.textContent;
                    
                    // Only animate if it's a number
                    const numMatch = counter.textContent.match(/\d+/);
                    if (numMatch) {
                        animateCounter(counter, parseInt(numMatch[0]));
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.impact');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 50);
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            element.textContent = current;
        }
    }, 30);
}

// ===== Button Click Handlers =====
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-button');
    const contactButtons = document.querySelectorAll('.contact-btn');

    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAClick);
    });

    contactButtons.forEach(button => {
        button.addEventListener('click', handleContactClick);
    });
});

function handleCTAClick(e) {
    const target = e.target;
    const text = target.textContent;

    if (text === 'Re:Leash 알아보기' || text === '지금 구매하기') {
        alert('감사합니다! 곧 쇼핑 기능이 활성화됩니다. 이메일로 먼저 구매 안내를 받으실 수 있습니다.');
    }
}

function handleContactClick(e) {
    const target = e.target;
    const text = target.textContent;

    if (text === '쇼핑하기') {
        alert('Re:Ocean 쇼핑몰을 준비 중입니다. 곧 만나요!');
    } else if (text === '제휴 문의') {
        alert('비즈니스 제휴 문의: contact@reocean.com\n또는 위의 소셜 미디어로 연락주세요!');
    } else if (text === '뉴스레터 구독') {
        subscribeNewsletter();
    }
}

function subscribeNewsletter() {
    const email = prompt('이메일을 입력해주세요:');
    if (email) {
        if (validateEmail(email)) {
            alert(`감사합니다! ${email}로 Re:Ocean의 최신 소식을 보내드리겠습니다.\n바다를 살리는 우리의 여정을 함께해주세요!`);
        } else {
            alert('올바른 이메일 주소를 입력해주세요.');
        }
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Active Navigation Link =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.borderBottom = '2px solid white';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});

// ===== Easter Egg =====
document.addEventListener('keydown', (e) => {
    // Konami Code: 화살표 ↑↑↓↓←→←→BA 입력하면 메시지
    if (e.key === '?') {
        showEasterEgg();
    }
});

function showEasterEgg() {
    alert('🌊 Re:Ocean에 방문해주셔서 감사합니다!\n\n우리는 믿습니다:\n"폐어망이 바다에서 사람을 해치는 쓰레기가 아닌,\n바다에서 사람을 보호하는 수호자로 재탄생할 수 있다"\n\n함께 바다를 살려봅시다! 🌍♻️');
}

// ===== Dynamic Content Loading =====
function loadDynamicContent() {
    // 실시간 환경 통계를 업데이트할 수 있는 함수
    // 나중에 API 연결 가능
    console.log('Re:Ocean 웹사이트가 준비되었습니다!');
}

// Initialize
loadDynamicContent();

// ===== Console Message =====
console.log('%c🌊 Re:Ocean에 오신 것을 환영합니다!', 'color: #0099ff; font-size: 20px; font-weight: bold;');
console.log('%c폐어망을 수호자로 되살리는 브랜드', 'color: #004466; font-size: 14px;');
console.log('%c함께 바다를 살려봅시다!', 'color: #2ecc71; font-size: 14px; font-weight: bold;');
