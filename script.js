  /* --- Navbar scroll --- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* --- Mobile nav toggle --- */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  function closeMobileNav() {
    navMobile.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* --- Scroll reveal --- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay for grids
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        const isGrid = entry.target.parentElement.classList.contains('areas-grid')
                    || entry.target.parentElement.classList.contains('dif-grid');
        entry.target.style.transitionDelay = isGrid ? `${(idx % 4) * 80}ms` : '0ms';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* --- WhatsApp form builder --- */
  function enviarWhatsApp() {
    const nome     = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email    = document.getElementById('email').value.trim();
    const area     = document.getElementById('area').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome) { alert('Por favor, informe seu nome.'); return; }

    let texto = `Olá, Dr. Rodrigo! Me chamo *${nome}*`;
    if (area)     texto += `.\n📌 Área de interesse: *${area}*`;
    if (telefone) texto += `\n📞 Telefone: ${telefone}`;
    if (email)    texto += `\n📧 E-mail: ${email}`;
    if (mensagem) texto += `\n\n💬 Mensagem:\n${mensagem}`;

    const url = `https://wa.me/5500000000000?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /* --- Smooth anchor links (iOS fallback) --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMobileNav();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
