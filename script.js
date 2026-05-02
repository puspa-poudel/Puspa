document.addEventListener('DOMContentLoaded', () => {
  // ─── CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  // Hover effects
  const interactiveElements = document.querySelectorAll('button, a, input, .toc-btn, .btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.borderColor = 'rgba(184, 146, 42, 0.7)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(184, 146, 42, 0.4)';
    });
  });

  // Click effect on dot
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // ─── SCROLL NAVIGATION
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const showChapter = (id) => {
    document.querySelectorAll('.book-section').forEach(section => {
      section.classList.add('hidden');
      section.classList.remove('active');
    });
    const target = document.getElementById(id);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('active');
      scrollToId(id);
    }
  };

  document.querySelectorAll('[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-scroll');
      if (key === 'top') scrollToId('top');
      if (key === 'toc') scrollToId('toc');
    });
  });

  document.querySelectorAll('[data-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-target');
      if (id) {
        if (btn.classList.contains('next-chapter-btn') || btn.classList.contains('prev-chapter-btn')) {
          showChapter(id);
        } else if (btn.classList.contains('toc-btn')) {
          const targetEl = document.getElementById(id);
          if (targetEl && targetEl.classList.contains('book-section')) {
            showChapter(id);
          } else {
            scrollToId(id);
          }
        } else {
          scrollToId(id);
        }
      }
    });
  });
});