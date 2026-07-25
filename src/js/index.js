document.addEventListener('DOMContentLoaded', () => {
  // WhatsApp Integration
  const WA_NUMBER = "5551990117123";
  const WA_URL = `https://wa.me/${WA_NUMBER}`;
  
  function sendWA(msg) {
    window.open(`${WA_URL}?text=${encodeURIComponent(msg || "Olá, vim pelo site da Lavacar Tarragô e gostaria de mais informações.")}`, '_blank');
  }

  document.querySelectorAll('[data-wa]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      sendWA(btn.getAttribute('data-wa'));
    });
  });

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileBtn');
  const nav = document.querySelector('.nav');

  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('active');
      const icon = mobileBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = nav.classList.contains('active') ? 'close' : 'menu';
      }
    });

    // Close menu when clicking link or action button
    nav.querySelectorAll('.nav-link, .btn-mobile-nav').forEach(item => {
      item.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = mobileBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileBtn.contains(e.target)) {
        nav.classList.remove('active');
        const icon = mobileBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      }
    });
  }

  // Header scroll background effect
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Results Carousel
  const track = document.getElementById('carrosselTrack');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');

  if (track) {
    const slides = track.querySelectorAll('.slide');
    let idx = 0;
    const total = slides.length;

    function updateCarousel() {
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((dot, i) => {
        if (i === idx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      idx = (idx + 1) % total;
      updateCarousel();
    }

    function prevSlide() {
      idx = (idx - 1 + total) % total;
      updateCarousel();
    }

    if (prev) prev.addEventListener('click', prevSlide);
    if (next) next.addEventListener('click', nextSlide);

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        idx = parseInt(dot.dataset.idx, 10);
        updateCarousel();
      });
    });
  }

  // Icon data attribute fix
  document.querySelectorAll('.ico-service').forEach(el => {
    const name = el.textContent?.trim();
    if (name) {
      el.setAttribute('data-icon', name);
      el.textContent = '';
    }
  });
});
