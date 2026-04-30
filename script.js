document.addEventListener('DOMContentLoaded', () => {
    // --- Configurações WhatsApp ---
    const WHATSAPP_NUM = "5541996942720"; // Coloque o número aqui
    const MESSAGE = "Olá Dr. Rodrigo, gostaria de solicitar uma análise técnica do meu contrato bancário para verificar juros abusivos.";

    // Seleciona links específicos e botões de CTA (como o "Consultar Especialista" e botões principais)
    document.querySelectorAll('.whatsapp-link, .cta-main, .cta-footer, .btn-nav').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(MESSAGE)}`;
            window.open(url, '_blank');
        });
    });

    // --- Lógica do Carrossel (Consolidada) ---
    const track = document.getElementById('reviewsTrack');
    const cards = document.querySelectorAll('.review-card');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let autoSlide;
    let touchStartX = 0;
    let touchEndX = 0;

    // Criar pontos (dots)
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 20; // largura + gap
        const maxIndex = window.innerWidth > 900 ? cards.length - 3 : cards.length - 1;
        
        if (currentIndex > maxIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndex;

        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
            // Esconde as bolinhas que ultrapassam o limite de navegação atual
            dot.style.display = i > maxIndex ? 'none' : 'block';
        });
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            currentIndex++;
            updateCarousel();
        }, 5000);
    }

    nextBtn?.addEventListener('click', () => { currentIndex++; updateCarousel(); resetAutoSlide(); });
    prevBtn?.addEventListener('click', () => { currentIndex--; updateCarousel(); resetAutoSlide(); });

    // Suporte para deslizar no celular (Touch)
    track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    }, {passive: true});

    function handleGesture() {
        if (touchStartX - touchEndX > 50) { currentIndex++; updateCarousel(); resetAutoSlide(); }
        if (touchEndX - touchStartX > 50) { currentIndex--; updateCarousel(); resetAutoSlide(); }
    }

    window.addEventListener('resize', updateCarousel);
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', resetAutoSlide);

    resetAutoSlide();
});