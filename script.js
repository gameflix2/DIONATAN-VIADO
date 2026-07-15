/**
 * Central da Sorte — interações da página
 * 1) Revela os cards de benefícios suavemente conforme entram na tela.
 * 2) Registra cliques nos botões de WhatsApp (útil para plugar
 *    analytics no futuro, sem alterar o restante do código).
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1) Scroll reveal para os cards de benefícios ---------------------
  const revealTargets = document.querySelectorAll('.card');

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // pequeno atraso escalonado para os cards aparecerem em sequência
          const delay = index * 80;
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealTargets.forEach((el) => observer.observe(el));
  }

  // --- 2) Log simples de cliques nos botões de WhatsApp ------------------
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
    link.addEventListener('click', () => {
      console.log('[Central da Sorte] Clique no WhatsApp:', link.className || 'link');
    });
  });

});
