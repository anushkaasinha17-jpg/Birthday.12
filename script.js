/* =========================================================
   HAPPY BIRTHDAY, MAYANK — SCRIPT
   Vanilla JS, ES6+, no dependencies.
========================================================= */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = matchMedia('(hover: none)').matches;

  /* ---------------------------------------------------------
     UTILITIES
  --------------------------------------------------------- */
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const PALETTE = ['#e07a92', '#eec179', '#f3c9d4', '#c85a78', '#f7dfae'];

  /* ---------------------------------------------------------
     1. CURSOR GLOW + TRAIL
  --------------------------------------------------------- */
  (function initCursor() {
    if (isTouch) return;
    const glow = $('#cursor-glow');
    const trailPool = [];
    let last = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener('pointermove', (e) => {
      last = { x: e.clientX, y: e.clientY };
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;

      if (!prefersReducedMotion && Math.random() < 0.35) {
        spawnTrailDot(e.clientX, e.clientY);
      }
    });

    function spawnTrailDot(x, y) {
      const dot = document.createElement('div');
      dot.id = 'cursor-trail';
      dot.style.position = 'fixed';
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.borderRadius = '50%';
      dot.style.background = pick(PALETTE);
      dot.style.boxShadow = `0 0 8px 2px ${pick(PALETTE)}`;
      dot.style.pointerEvents = 'none';
      dot.style.zIndex = '3';
      dot.style.transform = 'translate(-50%,-50%)';
      dot.style.transition = 'opacity .6s ease, transform .6s ease';
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'translate(-50%,-50%) scale(2)';
      });
      setTimeout(() => dot.remove(), 650);
    }
  })();

  /* ---------------------------------------------------------
     2. AMBIENT FIREFLIES (canvas, full page)
  --------------------------------------------------------- */
  (function initFireflies() {
    const canvas = $('#ambient-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, fireflies = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.documentElement.scrollHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COUNT = prefersReducedMotion ? 12 : 30;
    for (let i = 0; i < COUNT; i++) {
      fireflies.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(1, 2.6),
        speedX: rand(-0.15, 0.15),
        speedY: rand(-0.2, -0.05),
        phase: rand(0, Math.PI * 2),
        alphaSpeed: rand(0.01, 0.03),
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      fireflies.forEach((f) => {
        f.phase += f.alphaSpeed;
        f.x += f.speedX;
        f.y += f.speedY;
        if (f.y < -10) f.y = h + 10;
        if (f.x < -10) f.x = w + 10;
        if (f.x > w + 10) f.x = -10;

        const alpha = (Math.sin(f.phase) + 1) / 2 * 0.8 + 0.15;
        ctx.beginPath();
        ctx.fillStyle = `rgba(238, 193, 121, ${alpha})`;
        ctx.shadowColor = 'rgba(238,193,121,0.9)';
        ctx.shadowBlur = 8;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();

    // resize canvas height when new content loads (images/fonts)
    window.addEventListener('load', resize);
  })();

  /* ---------------------------------------------------------
     3. FLOATING HEARTS (global, gentle, occasional)
  --------------------------------------------------------- */
  (function initFloatingHearts() {
    if (prefersReducedMotion) return;
    const symbols = ['❤', '💗', '✨'];

    function spawnHeart() {
      const el = document.createElement('div');
      el.className = 'float-particle';
      el.textContent = pick(symbols);
      el.style.left = rand(2, 98) + 'vw';
      el.style.fontSize = rand(12, 22) + 'px';
      el.style.color = pick(PALETTE);
      el.style.opacity = rand(0.3, 0.75);
      el.style.transition = `transform ${rand(9, 16)}s linear, opacity 3s ease`;
      document.body.appendChild(el);

      requestAnimationFrame(() => {
        el.style.transform = `translateY(-${window.innerHeight + document.documentElement.scrollHeight * 0}px) translateX(${rand(-40, 40)}px) rotate(${rand(-40, 40)}deg)`;
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 17000);
    }

    setInterval(spawnHeart, 1400);
  })();

  /* ---------------------------------------------------------
     4. SCROLL PROGRESS BAR
  --------------------------------------------------------- */
  (function initScrollProgress() {
    const bar = $('#scroll-progress-bar');
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  })();

  /* ---------------------------------------------------------
     5. RIPPLE BUTTON + OPEN GIFT (audio unlock + transition)
  --------------------------------------------------------- */
  (function initRippleAndOpenGift() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.ripple-btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.4;
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });

    const openBtn = $('#open-gift-btn');
    const audio = $('#bday-audio');
    const audioPlayer = $('#audio-player');
    const audioToggle = $('#audio-toggle');

    openBtn.addEventListener('click', () => {
      // Reveal + enable audio player
      audioToggle.disabled = false;
      audioPlayer.classList.add('visible');
      audio.volume = 0.55;
      audio.play().then(() => {
        audioPlayer.classList.add('playing');
        toggleIcons(true);
      }).catch(() => {
        // Autoplay might still be blocked; user can press the button manually
      });

      // Smooth scroll to the cake section (main experience)
      const cake = $('#cake');
      cake.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    function toggleIcons(playing) {
      $('#icon-play').classList.toggle('hidden', playing);
      $('#icon-pause').classList.toggle('hidden', !playing);
    }

    audioToggle.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {});
        audioPlayer.classList.add('playing');
        toggleIcons(true);
      } else {
        audio.pause();
        audioPlayer.classList.remove('playing');
        toggleIcons(false);
      }
    });
  })();

  /* ---------------------------------------------------------
     6. SECRET KEY LISTENER ("mayank")
  --------------------------------------------------------- */
  (function initSecretListener() {
    const SECRET_WORD = 'mayank';
    let buffer = '';
    const modal = $('#secret-modal');
    const closeBtn = $('#secret-close');

    window.addEventListener('keydown', (e) => {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-SECRET_WORD.length);
      if (buffer === SECRET_WORD) {
        triggerSecret();
        buffer = '';
      }
    });

    function triggerSecret() {
      modal.classList.add('visible');
      modal.setAttribute('aria-hidden', 'false');
      heartExplosion(window.innerWidth / 2, window.innerHeight / 2, 60);
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    function closeModal() {
      modal.classList.remove('visible');
      modal.setAttribute('aria-hidden', 'true');
    }

    window.heartExplosion = heartExplosion;
    function heartExplosion(cx, cy, count = 40) {
      for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'explosion-heart';
        heart.textContent = pick(['❤️', '💗', '💖', '✨']);
        heart.style.left = cx + 'px';
        heart.style.top = cy + 'px';
        heart.style.fontSize = rand(14, 30) + 'px';
        const angle = rand(0, Math.PI * 2);
        const dist = rand(80, 320);
        heart.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        heart.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
        heart.style.animationDelay = rand(0, 0.15) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1600);
      }
    }
  })();

  /* ---------------------------------------------------------
     7. CAKE + CANDLES + CONFETTI
  --------------------------------------------------------- */
  (function initCake() {
    const candles = $$('.candle');
    const hint = $('#cake-hint');
    const confettiCanvas = $('#confetti-canvas');
    const ctx = confettiCanvas.getContext('2d');
    let confettiParticles = [];
    let animating = false;

    function resizeConfettiCanvas() {
      const cakeSection = $('#cake');
      confettiCanvas.width = cakeSection.offsetWidth;
      confettiCanvas.height = cakeSection.offsetHeight;
    }
    resizeConfettiCanvas();
    window.addEventListener('resize', resizeConfettiCanvas);

    let blownCount = 0;
    candles.forEach((candle) => {
      candle.addEventListener('click', () => {
        if (candle.dataset.lit === 'false') return;
        candle.dataset.lit = 'false';
        blownCount++;
        launchConfetti();
        if (blownCount === candles.length) {
          hint.textContent = 'wish made ✨ happy birthday, my love';
        }
      }, { once: false });
    });

    function launchConfetti() {
      const w = confettiCanvas.width, h = confettiCanvas.height;
      const burstX = w / 2;
      const burstY = h * 0.28;
      for (let i = 0; i < 60; i++) {
        confettiParticles.push({
          x: burstX,
          y: burstY,
          vx: rand(-4, 4),
          vy: rand(-7, -2),
          size: rand(4, 9),
          color: pick(PALETTE),
          rotation: rand(0, 360),
          rotSpeed: rand(-8, 8),
          life: 0,
          maxLife: rand(60, 110),
        });
      }
      if (!animating) {
        animating = true;
        requestAnimationFrame(tick);
      }
    }

    function tick() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      confettiParticles.forEach((p) => {
        p.vy += 0.12;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.life++;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      confettiParticles = confettiParticles.filter((p) => p.life < p.maxLife);
      if (confettiParticles.length > 0) {
        requestAnimationFrame(tick);
      } else {
        animating = false;
      }
    }
  })();

  /* ---------------------------------------------------------
     8. BLOOMING FLOWERS SECTION (field + petals + butterflies)
  --------------------------------------------------------- */
  (function initBloomSection() {
    const field = $('#bloom-field');
    const FLOWER_COUNT = 12;
    for (let i = 0; i < FLOWER_COUNT; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'bloom';
      const flower = document.createElement('div');
      flower.className = 'bloom-flower';
      flower.style.animationDelay = rand(0, 4) + 's';
      const color = pick(PALETTE);
      const petalCount = 6;
      for (let p = 0; p < petalCount; p++) {
        const petal = document.createElement('div');
        petal.className = 'petal-el';
        petal.style.background = `linear-gradient(135deg, #fff, ${color})`;
        petal.style.transform = `rotate(${(360 / petalCount) * p}deg)`;
        flower.appendChild(petal);
      }
      const center = document.createElement('div');
      center.className = 'bloom-center';
      flower.appendChild(center);
      wrap.appendChild(flower);
      field.appendChild(wrap);
    }

    // Falling petals
    if (!prefersReducedMotion) {
      const petalsLayer = $('#petals-layer');
      const PETAL_COUNT = 18;
      for (let i = 0; i < PETAL_COUNT; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = rand(0, 100) + '%';
        petal.style.animationDuration = rand(8, 16) + 's';
        petal.style.animationDelay = rand(0, 10) + 's';
        petal.style.background = `radial-gradient(circle at 30% 30%, #fff, ${pick(PALETTE)} 60%, ${pick(PALETTE)} 100%)`;
        petalsLayer.appendChild(petal);
      }

      // Butterflies
      const butterfliesLayer = $('#butterflies-layer');
      const BUTTERFLY_COUNT = 3;
      for (let i = 0; i < BUTTERFLY_COUNT; i++) {
        const b = document.createElement('div');
        b.className = 'butterfly';
        b.style.top = rand(10, 80) + '%';
        b.style.animationDuration = rand(14, 22) + 's';
        b.style.animationDelay = rand(0, 8) + 's';
        butterfliesLayer.appendChild(b);
      }
    }
  })();

  /* ---------------------------------------------------------
     9. TIMELINE SCROLL REVEAL
  --------------------------------------------------------- */
  (function initTimelineReveal() {
    const cards = $$('.timeline-card');
    if (!('IntersectionObserver' in window)) {
      cards.forEach((c) => c.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    cards.forEach((c) => observer.observe(c));
  })();

  /* ---------------------------------------------------------
     10. 30 REASONS I LOVE YOU (flip cards)
  --------------------------------------------------------- */
  (function initReasons() {
    const reasons = [
      "The way you say my name when you're happy to see me.",
      "You remember the tiny things I mention only once.",
      "Your laugh — the real one, not the polite one.",
      "How you make hard days feel survivable.",
      "You're endlessly curious about the world.",
      "The way you care for people quietly, without needing credit.",
      "Your patience with me on my worst days.",
      "How safe I feel just talking to you.",
      "The way you get excited about small wins.",
      "You never make me feel silly for caring too much.",
      "Your honesty, even when it's inconvenient.",
      "The way your voice softens when I'm upset.",
      "You believe in my dreams as much as I do.",
      "Your weird, specific sense of humor.",
      "How you show up, even on tired days.",
      "The way you think before you speak.",
      "You make ordinary plans feel exciting.",
      "Your quiet strength during hard times.",
      "How you never stop trying to grow.",
      "The way you protect the people you love.",
      "Your calm in the middle of chaos.",
      "How you say exactly what I need to hear.",
      "The little rituals we've built together.",
      "You make me want to be a better person.",
      "The way you look at the future with hope.",
      "How you never let me feel alone in anything.",
      "Your loyalty — steady, unwavering, real.",
      "The comfort of your presence, even in silence.",
      "How you choose me, over and over.",
      "Simply — you. Exactly as you are.",
    ];

    const grid = $('#reasons-grid');
    reasons.forEach((text, i) => {
      const card = document.createElement('div');
      card.className = 'reason-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Reason ${i + 1}, tap to reveal`);

      const inner = document.createElement('div');
      inner.className = 'reason-inner';

      const front = document.createElement('div');
      front.className = 'reason-face reason-front';
      front.innerHTML = `<span class="reason-number">${String(i + 1).padStart(2, '0')}</span><span class="reason-icon">🌷</span>`;

      const back = document.createElement('div');
      back.className = 'reason-face reason-back';
      back.textContent = text;

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      grid.appendChild(card);

      const flip = () => card.classList.toggle('flipped');
      card.addEventListener('click', flip);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flip();
        }
      });
    });
  })();

  /* ---------------------------------------------------------
     11. INTERACTIVE GARDEN (click to grow flowers)
  --------------------------------------------------------- */
  (function initInteractiveGarden() {
    const gardenField = $('#garden-field');
    const emptyHint = $('#garden-empty-hint');
    let planted = 0;

    gardenField.addEventListener('click', (e) => {
      if (e.target === emptyHint) return;
      const rect = gardenField.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      plantFlower(x, y);
      planted++;
      if (planted === 1) {
        emptyHint.style.opacity = '0';
      }
    });

    function plantFlower(x, y) {
      const size = rand(30, 60);
      const color = pick(PALETTE);
      const petalCount = Math.floor(rand(5, 8));

      const flower = document.createElement('div');
      flower.className = 'grown-flower';
      flower.style.left = x + 'px';
      flower.style.top = y + 'px';
      flower.style.width = size + 'px';
      flower.style.height = size + 'px';

      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'g-petal';
        petal.style.width = size * 0.5 + 'px';
        petal.style.height = size * 0.5 + 'px';
        petal.style.top = '0';
        petal.style.left = size * 0.25 + 'px';
        petal.style.background = `linear-gradient(135deg, #fff, ${color})`;
        petal.style.transformOrigin = '0% 100%';
        petal.style.transform = `rotate(${(360 / petalCount) * i}deg)`;
        flower.appendChild(petal);
      }
      const center = document.createElement('div');
      center.className = 'g-center';
      center.style.width = size * 0.32 + 'px';
      center.style.height = size * 0.32 + 'px';
      center.style.top = size * 0.34 + 'px';
      center.style.left = size * 0.34 + 'px';
      center.style.background = pick(['#eec179', '#f7dfae']);
      center.style.boxShadow = '0 0 10px rgba(238,193,121,.7)';
      flower.appendChild(center);

      gardenField.appendChild(flower);
    }
  })();

  /* ---------------------------------------------------------
     12. NIGHT SKY (stars, moon, shooting stars, click hearts)
  --------------------------------------------------------- */
  (function initNightSky() {
    const canvas = $('#sky-canvas');
    const ctx = canvas.getContext('2d');
    const section = $('#night-sky');
    let w, h, stars = [], shootingStars = [];

    function resize() {
      w = canvas.width = section.offsetWidth;
      h = canvas.height = section.offsetHeight;
      stars = [];
      const STAR_COUNT = Math.floor((w * h) / 9000);
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: rand(0, w),
          y: rand(0, h),
          r: rand(0.6, 1.8),
          phase: rand(0, Math.PI * 2),
          speed: rand(0.01, 0.03),
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function maybeSpawnShootingStar() {
      if (Math.random() < 0.006 && shootingStars.length < 2) {
        const startX = rand(w * 0.1, w * 0.7);
        shootingStars.push({
          x: startX,
          y: rand(0, h * 0.3),
          vx: rand(4, 7),
          vy: rand(2, 3.5),
          life: 0,
          maxLife: 40,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // stars
      stars.forEach((s) => {
        s.phase += s.speed;
        const alpha = (Math.sin(s.phase) + 1) / 2 * 0.7 + 0.3;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // shooting stars
      if (!prefersReducedMotion) maybeSpawnShootingStar();
      shootingStars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const alpha = Math.max(0, 1 - s.life / s.maxLife);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(238,193,121,${alpha})`;
        ctx.lineWidth = 2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 5, s.y - s.vy * 5);
        ctx.stroke();
      });
      shootingStars = shootingStars.filter((s) => s.life < s.maxLife);

      requestAnimationFrame(draw);
    }
    draw();

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // find nearest star, or just use click point
      const heart = document.createElement('div');
      heart.className = 'rising-heart';
      heart.textContent = pick(['❤️', '💗', '✨']);
      heart.style.left = x + 'px';
      heart.style.top = y + 'px';
      heart.style.fontSize = rand(14, 22) + 'px';
      section.appendChild(heart);
      setTimeout(() => heart.remove(), 2700);
    });
  })();

  /* ---------------------------------------------------------
     13. FINAL STATEMENT — ambient hearts
  --------------------------------------------------------- */
  (function initFinalHearts() {
    if (prefersReducedMotion) return;
    const container = $('#final-hearts');
    let started = false;

    function spawn() {
      const heart = document.createElement('div');
      heart.textContent = pick(['❤️', '💗', '🌸']);
      heart.style.position = 'absolute';
      heart.style.bottom = '-5%';
      heart.style.left = rand(2, 98) + '%';
      heart.style.fontSize = rand(12, 22) + 'px';
      heart.style.opacity = rand(0.4, 0.85);
      heart.style.transition = `transform ${rand(6, 10)}s ease-out, opacity ${rand(6, 10)}s ease-out`;
      container.appendChild(heart);
      requestAnimationFrame(() => {
        heart.style.transform = `translateY(-${rand(300, 500)}px) translateX(${rand(-30, 30)}px)`;
        heart.style.opacity = '0';
      });
      setTimeout(() => heart.remove(), 10500);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          setInterval(spawn, 900);
        }
      });
    }, { threshold: 0.2 });
    observer.observe($('#final'));
  })();

})();
