document.addEventListener('DOMContentLoaded', () => {
    initMenuHamburguer();
    initCarousel();
    initProjectLinks();
});

/**
 * Ativa o menu hamburguer para navegação mobile
 */
function initMenuHamburguer() {
    const hamburguer = document.querySelector('.hamburguer');
    const navList = document.querySelector('.nav-list');

    if (hamburguer && navList) {
        hamburguer.addEventListener('click', () => {
            navList.classList.toggle('active');
            hamburguer.classList.toggle('active');
        });
    }
}

/**
 * Inicializa o carrossel horizontal de habilidades
 */
function initCarousel() {
    const carousel = document.querySelector('.skills-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const scrollAmount = 300;

    if (carousel && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
}

/**
 * Força todos os links de projetos a abrirem em nova aba
 */
function initProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
}
