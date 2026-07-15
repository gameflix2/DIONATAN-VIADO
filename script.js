/* ============================================================
   CENTRAL DA SORTE — INTERAÇÕES
   - Efeito ripple ao clicar no botão do WhatsApp
   - Smooth scroll para links internos (ex: topbar -> CTA)
   - Pequeno "boost" de flutuação ao passar o mouse (opcional, sutil)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initRippleEffect();
  initSmoothScroll();
});

/**
 * Cria o efeito "ripple" (onda) ao clicar no botão do WhatsApp,
 * como o padrão usado em botões premium / Material Design.
 */
function initRippleEffect() {
  const button = document.getElementById('whatsappButton');
  if (!button) return;

  const content = button.querySelector('.cta-button__content');
  if (!content) return;

  button.addEventListener('click', (event) => {
    const rect = content.getBoundingClientRect();

    // Tamanho do ripple baseado na maior dimensão do botão,
    // garantindo que cubra todo o elemento.
    const size = Math.max(rect.width, rect.height) * 1.2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    content.appendChild(ripple);

    // Remove o elemento após a animação para não acumular nós no DOM
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

/**
 * Habilita rolagem suave para qualquer link interno marcado
 * com o atributo [data-smooth-scroll] (ex.: botão "Falar agora" do topo).
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('[data-smooth-scroll]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}
