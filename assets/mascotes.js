/* Mascotes animados do Xodó — WebM VP9 com canal alpha.
 *
 * Nem todo navegador decodifica o alpha do VP9: quando não decodifica, ele
 * pinta o fundo de PRETO (aconteceu num iPhone, 30/07/2026). Detectar por
 * user-agent não funciona — no iOS TODOS os navegadores usam WebKit, então
 * Chrome/Edge/Firefox de iPhone falham igual ao Safari, mas o UA deles diz
 * "CriOS"/"EdgiOS"/"FxiOS".
 *
 * Por isso aqui o teste é de CAPACIDADE, não de marca: o primeiro quadro do
 * vídeo é desenhado num canvas e o canto é medido. Se o canto vier opaco, o
 * alpha não sobreviveu à decodificação e o <video> é trocado pelo PNG do
 * poster. Trocamos também quando o usuário pede menos movimento.
 */
(function () {
  'use strict';

  function trocarPorImagem(v) {
    if (!v.parentNode) return;
    var img = document.createElement('img');
    img.src = v.getAttribute('poster');
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.className = v.className;
    img.width = v.width || 240;
    img.height = v.height || 240;
    v.parentNode.replaceChild(img, v);
  }

  function alphaSobreviveu(v) {
    try {
      var c = document.createElement('canvas');
      c.width = c.height = 8;
      var ctx = c.getContext('2d', { willReadFrequently: true });
      if (!ctx) return true;
      ctx.clearRect(0, 0, 8, 8);
      ctx.drawImage(v, 0, 0, 8, 8);
      // canto superior esquerdo: nos nossos loops é sempre área vazia
      var p = ctx.getImageData(0, 0, 1, 1).data;
      return p[3] < 250;
    } catch (e) {
      return true; // na dúvida mantém o vídeo; o teste é só uma rede de segurança
    }
  }

  function cuidar(v) {
    if (v.hasAttribute('data-solid')) return; // vídeo com fundo próprio, não usa alpha

    var jaResolvido = false;
    function verificar() {
      if (jaResolvido) return;
      jaResolvido = true;
      if (!alphaSobreviveu(v)) trocarPorImagem(v);
    }

    if (v.readyState >= 2) {
      verificar();
    } else {
      v.addEventListener('loadeddata', verificar, { once: true });
      v.addEventListener('error', function () { trocarPorImagem(v); }, { once: true });
    }
    // se o vídeo nunca carregar (formato não suportado), cai pro PNG
    setTimeout(function () {
      if (!jaResolvido && v.readyState < 2) { jaResolvido = true; trocarPorImagem(v); }
    }, 2500);
  }

  var videos = Array.prototype.slice.call(document.querySelectorAll('video.mascote-anim'));
  if (!videos.length) return;

  var probe = document.createElement('video');
  var podeWebm = !!(probe.canPlayType && probe.canPlayType('video/webm; codecs="vp9"'));
  var menosMovimento = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!podeWebm || menosMovimento) {
    videos.forEach(function (v) {
      if (menosMovimento || !v.hasAttribute('data-solid')) trocarPorImagem(v);
    });
    return;
  }
  videos.forEach(cuidar);
})();
