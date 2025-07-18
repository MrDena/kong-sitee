document.addEventListener('DOMContentLoaded', () => {


  // --- Модальное окно "О нас" ---
  document.querySelectorAll('.section-fade').forEach(section => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) section.classList.add('visible');
    }, { threshold: 0.2 });
    observer.observe(section);
  });

  const toTopBtn = document.getElementById('to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) toTopBtn.classList.add('visible');
    else toTopBtn.classList.remove('visible');
  });
  toTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  const aboutLink = document.getElementById('about-link');
  const aboutModal = document.getElementById('about-modal');
  const closeBtn = document.querySelector('.close-btn');
  if (aboutLink && aboutModal && closeBtn) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      aboutModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
    closeBtn.addEventListener('click', () => {
      aboutModal.classList.remove('show');
      document.body.style.overflow = '';
    });
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) {
        aboutModal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }
// --- Анимация фраз Доктора Лисви ---
const phraseText = document.getElementById('lisvy-phrase-text');
const phraseImg = document.getElementById('lisvy-phrase-img');
const sequence = [
  { text: 'Слово', img: '', pause: 1500 },
  { text: '', img: '', pause: 400 },
  { text: 'Rom', img: '', pause: 1500 },
  { text: 'И Слово', img: '', pause: 1000 },
  { text: 'Смерть', img: 'assets/Death.png', pause: 1500 },
  { text: '', img: '', pause: 400 },
  { text: '', img: 'assets/Death.png', pause: 1200 },
  { text: 'Rom', img: 'assets/Rom.png', pause: 1200 },
  { text: '', img: '', pause: 400 },
  { text: '', img: 'assets/Rom.png', pause: 1200 },
  { text: 'Для вас означает одно и то же', img: '', pause: 2000 }
];
let idx = 0;
let phraseTimeout = null;

function showPhrase() {
  const step = sequence[idx];

  // Сначала плавно скрываем текст и картинку
  phraseText.classList.remove('visible');
  phraseImg.classList.remove('visible');

  // После transition (0.7-0.8s) меняем содержимое и плавно показываем новое
  setTimeout(() => {
    // Текст
    if (step.text) {
      phraseText.textContent = step.text;
      phraseText.classList.add('visible');
    } else {
      phraseText.textContent = '';
    }
    // Картинка
    if (step.img) {
      phraseImg.src = step.img;
      phraseImg.style.display = '';
      phraseImg.classList.add('visible');
    } else {
      phraseImg.style.display = 'none';
    }
  }, 400); // задержка чуть меньше transition

  // Следующий шаг
  idx = (idx + 1) % sequence.length;
  clearTimeout(phraseTimeout);
  phraseTimeout = setTimeout(showPhrase, step.pause);
}

if (phraseText && phraseImg) showPhrase();


  // --- Метеоры ---
  const contactsSection = document.querySelector('.contacts');
  let meteorsStarted = false;
  function createMeteors() {
    const meteorCount = 25; // уменьшено для плавности
    const meteorColors = [
      'rgba(88,101,242,0.9)',
      'rgba(230, 57, 70, 0.9)',
      'rgba(255, 255, 255, 0.8)',
    ];
    for (let i = 0; i < meteorCount; i++) {
      const meteor = document.createElement('span');
      meteor.classList.add('meteor');
      meteor.style.left = `${(i / meteorCount) * 100 + Math.random() * (100 / meteorCount)}%`;
      const duration = 2 + Math.random() * 1.5;
      meteor.style.setProperty('--duration', `${duration}s`);
      meteor.style.setProperty('--tail-length', `${80 + (3.5 - duration) * 40}px`);
      meteor.style.setProperty('--meteor-color', meteorColors[Math.floor(Math.random() * meteorColors.length)]);
      const controlX = 30 + Math.random() * 40;
      const controlY = 180 + Math.random() * 150;
      const endX = 80 + Math.random() * 40;
      const endY = 350 + Math.random() * 100;
      meteor.style.offsetPath = `path('M 0 0 Q ${controlX} ${controlY} ${endX} ${endY}')`;
      const delay = Math.random() * duration * meteorCount * 0.05;
      meteor.style.animationDelay = `${delay}s`;
      contactsSection.appendChild(meteor);
    }
  }
  function clearMeteors() {
    const meteors = contactsSection.querySelectorAll('.meteor');
    meteors.forEach(m => m.remove());
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!meteorsStarted) {
          meteorsStarted = true;
          createMeteors();
        }
      } else {
        meteorsStarted = false;
        clearMeteors();
      }
    });
  }, { threshold: 0.1 });
  observer.observe(contactsSection);

  // --- Частицы для карточек ---
  const particleColors = {
    discord: 'rgba(88,101,242,0.7)',
    email: 'rgba(30,30,30,0.5)',
    apply: 'rgba(230, 57, 70, 0.7)',
  };
  const spawnIntervals = new WeakMap();
  function varyColor(color) {
    const rgba = color.match(/rgba?\((\d+), (\d+), (\d+), ([\d.]+)\)/);
    if (!rgba) return color;
    let r = parseInt(rgba[1]);
    let g = parseInt(rgba[2]);
    let b = parseInt(rgba[3]);
    let a = parseFloat(rgba[4]);
    const variation = 20;
    r = Math.min(255, Math.max(0, r + (Math.random() * variation - variation / 2)));
    g = Math.min(255, Math.max(0, g + (Math.random() * variation - variation / 2)));
    b = Math.min(255, Math.max(0, b + (Math.random() * variation - variation / 2)));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  function spawnParticles(card) {
    if (spawnIntervals.get(card)) return;
    spawnIntervals.set(card, true);
    const type = card.classList.contains('discord') ? 'discord' :
                 card.classList.contains('email') ? 'email' :
                 card.classList.contains('apply') ? 'apply' : null;
    if (!type) return;
    const baseColor = particleColors[type];
    const count = 15 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.classList.add('particle');
      const size = 2 + Math.random() * 4;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.backgroundColor = varyColor(baseColor);
      const x = Math.random() * card.clientWidth;
      const y = Math.random() * card.clientHeight;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      card.appendChild(p);
      const angle = Math.random() * 2 * Math.PI;
      const distance = 20 + Math.random() * 20;
      const duration = 1300;
      p.style.transition = `transform ${duration}ms ease-out`;
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5)`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), duration);
    }
    setTimeout(() => spawnIntervals.delete(card), 300);
  }
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      spawnParticles(card);
    });
  });



// --- Звук ---
const smokeSound = document.getElementById("audio-smoke");
const sparkSound = document.getElementById("audio-spark");
const metalSounds = [
  document.getElementById("metal-hit-1"),
  document.getElementById("metal-hit-2"),
  document.getElementById("metal-hit-3"),
  document.getElementById("metal-hit-4")
];
const toggleBtn = document.getElementById("toggle-sound");
const welcomeBtn = document.getElementById("welcome-close-btn");
let isMuted = localStorage.getItem("sound-muted") === "true";
let soundStarted = false;

// Громкости
smokeSound.volume = 0.5;
sparkSound.volume = 0.6;
metalSounds.forEach((sound, i) => {
  sound.volume = (i === 3) ? 0.15 : 0.9;
});

// Функция показа тоста
function showToast(message, duration = 4000) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-message show";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, duration);

  toast.addEventListener("animationend", (e) => {
    if (e.animationName === "toastOut") toast.remove();
  });
}

// Функция запуска звуков
function startSounds() {
  if (soundStarted || isMuted) return;
  smokeSound.loop = true;
  smokeSound.play().catch(() => {});
  soundStarted = true;

  setInterval(() => {
    if (isMuted) return;
    sparkSound.currentTime = 0;
    sparkSound.play().catch(() => {});
  }, Math.random() * 3000 + 3000);

  setInterval(() => {
    if (isMuted) return;
    const rand = Math.floor(Math.random() * metalSounds.length);
    metalSounds[rand].currentTime = 0;
    metalSounds[rand].play().catch(() => {});
  }, Math.random() * 4000 + 4000);

  showToast("🔊 Звуки включены. Добро пожаловать в KONG.", 5000);
}

// Переключатель звука (кнопка 🔇/🔊)
toggleBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  smokeSound.muted = isMuted;
  sparkSound.muted = isMuted;
  metalSounds.forEach((s) => (s.muted = isMuted));
  toggleBtn.textContent = isMuted ? "🔇" : "🔊";
  localStorage.setItem("sound-muted", isMuted);

  showToast(isMuted ? "🔇 Звук отключён" : "🔊 Звук включён", 3500);

  if (isMuted) {
    localStorage.setItem("sound-reminder-date", new Date().toISOString().slice(0, 10));
  } else {
    localStorage.removeItem("sound-reminder-date");
  }
  // 💡 ВАЖНО: запустить звуки, если они ещё не стартовали
  if (!soundStarted && !isMuted) {
    startSounds();
  }
});

// Применить начальное состояние
smokeSound.muted = isMuted;
sparkSound.muted = isMuted;
metalSounds.forEach((s) => (s.muted = isMuted));
toggleBtn.textContent = isMuted ? "🔇" : "🔊";

// Напоминание о звуке
const lastReminded = localStorage.getItem("sound-reminder-date");
const today = new Date().toISOString().slice(0, 10);
if (isMuted && lastReminded !== today) {
  showToast("🔇 Звук отключён. Нажмите 🔊 внизу, чтобы включить.", 6000);
  localStorage.setItem("sound-reminder-date", today);
}

  // Функция запуска звуков
  function tryStartSounds() {
    if (!isMuted && !soundStarted) {
      startSounds();
    }
  }
  // --- Ограниченный показ модалки + запуск печатной анимации и звука ---
const welcomeModal = document.getElementById("welcome-modal");

if (welcomeModal && welcomeBtn) {
  const today = new Date().toISOString().slice(0, 10);
  const shownData = JSON.parse(localStorage.getItem("welcome-shown") || "{}");
  const shownCount = shownData.date === today ? shownData.count || 0 : 0;

  if (shownCount < 3) {
    // Показать модалку
    welcomeModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Блокируем кнопку "Понял" на 15 секунд
    let countdown = 15;
    welcomeBtn.textContent = `Понял (${countdown})`;
    welcomeBtn.disabled = true;

    const interval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(interval);
        welcomeBtn.disabled = false;
        welcomeBtn.textContent = "Понял";
      } else {
        welcomeBtn.textContent = `Понял (${countdown})`;
      }
    }, 1000);

    // Обновляем счётчик показов
    localStorage.setItem("welcome-shown", JSON.stringify({ date: today, count: shownCount + 1 }));

    // ⌨️ Запуск анимации и звука — только при показе
    const textContainer = document.getElementById("typewriter-text");
    const typingSound = new Audio("audio/keyboard.mp3");
    typingSound.volume = 0.9;

    const rawHtml = `Мы не дефолтный клан, нацеленный на топ ПВП или рейтинг.<br> 
    У нас тёплая атмосфера, почти круглосуточный онлайн и всегда можно найти, с кем поиграть в STALCRAFT.<br><br> 
    ГП — это не весь клан, а лишь его часть, отобранная для КВ. Мы ищем тех, кто онлайн 7/7 и хорошо понимает игру.<br><br> 
    Наши гильзы стабильны: от 5000 в неделю. <br><br> 
    Хочешь к нам? Просто заходи в дискорд и оставляй тикет, или играй с нами вне ГП. <br><br> 
    <b>P.S.</b> ЧСВшников и токсиков из клан-ньюс сразу лесом 🚫`;

    const parts = [];
    const regex = /(<[^>]+>)|([^<])/g;
    let match;
    while ((match = regex.exec(rawHtml))) {
      if (match[1]) parts.push(match[1]);
      else if (match[2]) parts.push(match[2]);
    }

    const totalDuration = 15000;
    const delay = totalDuration / parts.length;
    let i = 0;

    function type() {
      if (i === 0) {
        typingSound.currentTime = 0;
        typingSound.src = "audio/keyboard.mp3";
        typingSound.play().catch(() => {});
      }

      if (i < parts.length) {
        textContainer.innerHTML += parts[i++];
        setTimeout(type, delay);
      } else {
        typingSound.pause();
        typingSound.currentTime = 0;
        typingSound.src = "";
      }
    }

    if (textContainer) {
      textContainer.innerHTML = "";
      type();
    }

    // Закрытие модалки
    welcomeBtn.addEventListener("click", () => {
      welcomeModal.classList.add("hidden");
      document.body.style.overflow = "";
      
    });
  }
}

  // Проверяем, показывается ли модалка

// В обработчике кнопки "Понял"
welcomeBtn.addEventListener("click", () => {
  welcomeModal.classList.add("hidden");
  document.body.style.overflow = "";

  if (!isMuted && !soundStarted) {
    startSounds();
  }
});

// Проверяем показ модалки и запускаем звук, если модалки нет
if (!welcomeModal.classList.contains("hidden")) {
  // Модалка видна — ждём нажатия кнопки
} else {
  tryStartSounds(); // Если модалки нет — запускаем звуки сразу
}













});
document.querySelectorAll('.achievement-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Снимаем active со всех карточек
    document.querySelectorAll('.achievement-card.active').forEach(c => c.classList.remove('active'));
    // Делаем текущую активной
    this.classList.add('active');
  });
  // Если нужно возвращать прозрачность при уходе мыши:
  card.addEventListener('mouseleave', function(e) {
    this.classList.remove('active');
  });
});
  // Эффект "раздачи карт" при наведении на секцию достижений
  const achievementsGrid = document.querySelector('.achievements-grid');
  const achievementsSection = document.querySelector('.achievements');
  if (achievementsGrid && achievementsSection) {
    achievementsSection.addEventListener('mouseenter', () => {
      achievementsGrid.classList.add('reveal');
    });
    achievementsSection.addEventListener('mouseleave', () => {
      achievementsGrid.classList.remove('reveal');
    });
  }
  // --- Анимация стрелки для карточек контактов ---
const cards = document.querySelectorAll('.contact-card');
let index = 0;
let arrowInterval = null;

function setActiveCard(idx) {
  cards.forEach((card, i) => {
    if (i === idx) card.classList.add('active');
    else card.classList.remove('active');
  });
}

function startArrowAnimation() {
  if (arrowInterval) clearInterval(arrowInterval);

  if (window.innerWidth > 2000) {
    index = 0; // всегда начинаем с первой карточки при запуске на десктопе
    setActiveCard(index);
    arrowInterval = setInterval(() => {
      index = (index + 1) % cards.length;
      setActiveCard(index);
    }, 3000);
  } else {
    index = 0;
    setActiveCard(0);
  }
}

startArrowAnimation();
window.addEventListener('resize', startArrowAnimation);