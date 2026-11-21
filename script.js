/* 9 meses de nós • Feliphe para Ana Júlia • a partir do projeto original */
'use strict';

const inicio = new Date(2026, 1, 21, 0, 0, 0); // horário local do celular; fevereiro começa em 1
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollMode = motionReduced ? 'auto' : 'smooth';

function atualizarContador() {
  const agora = new Date();
  const campos = ['meses', 'dias', 'horas', 'minutos', 'segundos'];
  if (agora < inicio) { campos.forEach(id => document.getElementById(id).textContent = '0'); return; }
  // Meses completos desde 21/02/2026. O resto é calculado a partir do último aniversário mensal.
  let totalMeses = (agora.getFullYear() - inicio.getFullYear()) * 12 + agora.getMonth() - inicio.getMonth();
  const marco = (n) => {
    const y = inicio.getFullYear() + Math.floor((inicio.getMonth() + n) / 12);
    const m = (inicio.getMonth() + n) % 12;
    const ultimoDia = new Date(y, m + 1, 0).getDate();
    return new Date(y, m, Math.min(inicio.getDate(), ultimoDia), inicio.getHours(), inicio.getMinutes(), inicio.getSeconds());
  };
  if (marco(totalMeses) > agora) totalMeses -= 1;
  let segundosRestantes = Math.floor((agora - marco(totalMeses)) / 1000);
  const dias = Math.floor(segundosRestantes / 86400); segundosRestantes %= 86400;
  const horas = Math.floor(segundosRestantes / 3600); segundosRestantes %= 3600;
  const minutos = Math.floor(segundosRestantes / 60); const segundos = segundosRestantes % 60;
  [totalMeses, dias, horas, minutos, segundos].forEach((valor, index) => {
    document.getElementById(campos[index]).textContent = String(valor).padStart(2, '0');
  });
}
atualizarContador();
setInterval(atualizarContador, 1000);

function irPara(id) { document.getElementById(id)?.scrollIntoView({behavior: scrollMode, block: 'start'}); }
document.getElementById('enterButton').addEventListener('click', () => irPara('app'));
document.getElementById('restartButton').addEventListener('click', () => irPara('inicio'));
const navigationButtons = document.querySelectorAll('.bottom-nav button');
navigationButtons.forEach(button => button.addEventListener('click', () => irPara(button.dataset.target)));
const sections = document.querySelectorAll('#home, #historia, #fotos, #carta, #surpresa');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navigationButtons.forEach(button => button.classList.toggle('active', button.dataset.target === entry.target.id));
    }
  }, {rootMargin: '-25% 0px -55% 0px'});
  sections.forEach(section => observer.observe(section));
}

// A reprodução começa apenas com o toque no botão (restrição dos navegadores mobile).
const musicButton = document.getElementById('musicButton');
const music = document.getElementById('backgroundMusic');
const musicIcon = musicButton.querySelector('.music-icon');
const musicSubtitle = musicButton.querySelector('.music-info small');
const liveStatus = document.getElementById('liveStatus');
function setPlaying(tocando) {
  musicButton.classList.toggle('playing', tocando);
  musicButton.setAttribute('aria-pressed', String(tocando));
  musicButton.setAttribute('aria-label', tocando ? 'Pausar nossa música' : 'Tocar nossa música');
  musicIcon.textContent = tocando ? 'Ⅱ' : '▶';
  musicSubtitle.textContent = tocando ? 'Tocando agora ♪' : 'Toque para ouvir ♪';
}
musicButton.addEventListener('click', async () => {
  if (!music.paused) { music.pause(); return; }
  try { await music.play(); setPlaying(true); }
  catch (e) { setPlaying(false); liveStatus.textContent = 'Não foi possível tocar a música. Verifique a conexão ou o arquivo de áudio.'; console.warn('Áudio indisponível:', e); }
});
music.addEventListener('play', () => setPlaying(true));
music.addEventListener('pause', () => setPlaying(false));
music.addEventListener('error', () => { setPlaying(false); liveStatus.textContent = 'A música não carregou. Verifique musica/musica.mp3.'; });

// Ampliar fotos e fechar com toque fora, botão X ou tecla Escape.
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightboxButton = document.getElementById('closeLightbox');
let oldFocus = null;
document.querySelectorAll('.photo-card').forEach(button => button.addEventListener('click', () => {
  const image = button.querySelector('img');
  oldFocus = document.activeElement;
  lightboxImage.src = image.src; lightboxImage.alt = image.alt;
  lightbox.classList.add('active'); lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; closeLightboxButton.focus();
}));
function fecharLightbox() {
  if (!lightbox.classList.contains('active')) return;
  lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; lightboxImage.removeAttribute('src'); oldFocus?.focus();
}
closeLightboxButton.addEventListener('click', fecharLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) fecharLightbox(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') fecharLightbox();
  if (event.key === 'Tab' && lightbox.classList.contains('active')) { event.preventDefault(); closeLightboxButton.focus(); }
});

// Surpresa final: não aparece até o clique dela.
const surpriseButton = document.getElementById('surpriseButton');
const surpriseMessage = document.getElementById('surpriseMessage');
surpriseButton.addEventListener('click', () => {
  const revelar = surpriseMessage.hidden;
  surpriseMessage.hidden = !revelar;
  surpriseButton.setAttribute('aria-expanded', String(revelar));
  surpriseButton.innerHTML = revelar ? 'Guardar a surpresa <span aria-hidden="true">♡</span>' : 'Descobrir minha surpresa <span aria-hidden="true">♡</span>';
  if (revelar) { criarChuvinhaDeCoracoes(); setTimeout(() => surpriseMessage.scrollIntoView({behavior: scrollMode, block: 'nearest'}), 50); }
});

// Corações suaves apenas em momentos especiais; evita animação constante no celular.
const heartsContainer = document.querySelector('.floating-hearts');
function criarChuvinhaDeCoracoes() {
  if (motionReduced) return;
  for (let i = 0; i < 23; i++) {
    const heart = document.createElement('span'); heart.className = 'heart';
    heart.textContent = i % 2 ? '♡' : '♥';
    heart.style.left = (Math.random() * 100) + 'vw';
    heart.style.fontSize = (12 + Math.random() * 23) + 'px';
    heart.style.animationDuration = (3.5 + Math.random() * 2) + 's';
    heart.style.animationDelay = (Math.random() * .7) + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6500);
  }
}

// Manifesto + worker para instalar como atalho no celular, com cache do conteúdo essencial.
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(error => console.warn('PWA indisponível:', error)));
}
