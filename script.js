// Initialisation de AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Initialisation de particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Gestion du mode sombre
const initTheme = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Vérifier la préférence sauvegardée
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
    }
    
    // Gérer le changement de thème
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
};

// Animation de la machine à écrire
const typeWriter = () => {
    const text = "Bienvenue sur mon Portfolio";
    const element = document.querySelector('.typewriter');
    let i = 0;
    
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    };
    
    type();
};

// Animation des barres de compétences
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width + '%';
        }, 200);
    });
};

// Gestion du menu de navigation
let lastScroll = 0;
const handleScroll = () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.scrollY;
    
    // Ajouter/retirer l'ombre
    if (currentScroll > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
    
    // Gérer l'affichage/masquage de la barre de navigation
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling vers le bas
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling vers le haut
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
};

// Gestion du formulaire de contact
const handleFormSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
    alert('Message envoyé avec succès !');
    e.target.reset();
};

// Initialisation des événements
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    typeWriter();
    
    // Observer pour les barres de compétences
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const skillsSection = document.querySelector('#apropos');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Événements de défilement
    window.addEventListener('scroll', handleScroll);
    
    // Gestion du formulaire
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
