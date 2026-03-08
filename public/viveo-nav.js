(function(){
  const SITE = 'https://viveopromotion-t3jrcqwfw3.live-website.com';
  const PUB = '';

  const css = `
    .vn-bar{position:fixed;top:0;left:0;right:0;z-index:9999;background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(26,39,68,0.06);transition:box-shadow .3s}
    .vn-bar.vn-shadow{box-shadow:0 2px 24px rgba(26,39,68,0.08)}
    .vn-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 32px;height:72px}
    .vn-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
    .vn-logo-text{font-family:'Playfair Display',serif;font-size:22px;font-weight:600;color:#1A2744;letter-spacing:0.02em}
    .vn-logo-text span{color:#A67C52}
    .vn-logo-sub{font-family:'Raleway',sans-serif;font-size:9px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#A67C52;margin-top:-2px}
    .vn-nav{display:flex;align-items:center;gap:4px;list-style:none}
    .vn-item{position:relative}
    .vn-link{font-family:'Raleway',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#1A2744;text-decoration:none;padding:8px 14px;border-radius:6px;transition:all .2s;display:flex;align-items:center;gap:4px}
    .vn-link:hover{color:#A67C52;background:rgba(166,124,82,0.06)}
    .vn-arrow{font-size:8px;opacity:.4;transition:transform .2s}
    .vn-item:hover .vn-arrow{transform:rotate(180deg)}
    .vn-drop{position:absolute;top:100%;left:0;min-width:220px;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(26,39,68,0.12);padding:8px 0;opacity:0;visibility:hidden;transform:translateY(8px);transition:all .25s cubic-bezier(.4,0,.2,1)}
    .vn-item:hover .vn-drop{opacity:1;visibility:visible;transform:translateY(0)}
    .vn-drop a{display:block;padding:10px 20px;font-family:'Raleway',sans-serif;font-size:13px;font-weight:500;color:#1A2744;text-decoration:none;transition:all .15s}
    .vn-drop a:hover{color:#A67C52;background:rgba(166,124,82,0.05);padding-left:24px}
    .vn-cta{font-family:'Raleway',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#fff;background:linear-gradient(135deg,#A67C52,#C4976A);text-decoration:none;padding:10px 22px;border-radius:50px;transition:all .3s}
    .vn-cta:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(166,124,82,0.35)}
    .vn-burger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;background:none;border:none}
    .vn-burger span{display:block;width:22px;height:2px;background:#1A2744;border-radius:2px;transition:all .3s}
    .vn-spacer{height:72px}
    @media(max-width:1024px){
      .vn-nav{display:none;position:fixed;top:72px;left:0;right:0;bottom:0;background:#fff;flex-direction:column;align-items:stretch;padding:24px;gap:0;overflow-y:auto}
      .vn-nav.vn-open{display:flex}
      .vn-link{padding:14px 0;font-size:13px;border-bottom:1px solid rgba(26,39,68,0.06);border-radius:0}
      .vn-drop{position:static;box-shadow:none;opacity:1;visibility:visible;transform:none;padding:0 0 0 16px}
      .vn-drop a{padding:10px 0;font-size:12px;border-bottom:1px solid rgba(26,39,68,0.03)}
      .vn-burger{display:flex}
      .vn-cta{display:inline-block;text-align:center;margin-top:16px;padding:14px 24px}
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const nav = document.createElement('div');
  nav.innerHTML = `
    <header class="vn-bar" id="vnBar">
      <div class="vn-inner">
        <a href="${SITE}/" class="vn-logo">
          <div>
            <div class="vn-logo-text">VIVEO<span>.</span></div>
            <div class="vn-logo-sub">Patrimoine</div>
          </div>
        </a>
        <ul class="vn-nav" id="vnNav">
          <li class="vn-item"><a href="${SITE}/" class="vn-link">Accueil</a></li>
          <li class="vn-item">
            <a href="#" class="vn-link">Se Loger <span class="vn-arrow">\u25BC</span></a>
            <div class="vn-drop">
              <a href="${PUB}/residence-principale-viveo.html">R\u00e9sidence Principale</a>
              <a href="${PUB}/residence-secondaire-viveo.html">R\u00e9sidence Secondaire</a>
            </div>
          </li>
          <li class="vn-item">
            <a href="${SITE}/investir-avec-viveo-patrimoine/" class="vn-link">Investir <span class="vn-arrow">\u25BC</span></a>
            <div class="vn-drop">
              <a href="${SITE}/nue-propriete/">Nue-propri\u00e9t\u00e9</a>
              <a href="${SITE}/monuments-historiques/">Monuments Historiques</a>
              <a href="${SITE}/loi-malraux/">Loi Malraux</a>
              <a href="${SITE}/deficit-foncier/">D\u00e9ficit Foncier</a>
              <a href="${SITE}/lmnp-loueur-meuble-non-professionnel/">LMNP</a>
              <a href="${SITE}/loi-jeanbrun/">Loi Jeanbrun</a>
              <a href="${SITE}/loi-denormandie/">Loi Denormandie</a>
            </div>
          </li>
          <li class="vn-item">
            <a href="${SITE}/approche-viveo/" class="vn-link">L'Approche <span class="vn-arrow">\u25BC</span></a>
            <div class="vn-drop">
              <a href="${SITE}/approche-viveo/">Notre ADN</a>
              <a href="${SITE}/parcours-client/">Le Parcours Client</a>
            </div>
          </li>
          <li class="vn-item"><a href="${SITE}/blog/" class="vn-link">Actualit\u00e9s</a></li>
          <li class="vn-item"><a href="${SITE}/contact/" class="vn-link">Contact</a></li>
          <li class="vn-item"><a href="${SITE}/rdv-decouverte/" class="vn-cta">RDV D\u00e9couverte</a></li>
        </ul>
        <button class="vn-burger" id="vnBurger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <div class="vn-spacer"></div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  // Shadow on scroll
  window.addEventListener('scroll', function(){
    document.getElementById('vnBar').classList.toggle('vn-shadow', window.scrollY > 10);
  });

  // Burger toggle
  document.getElementById('vnBurger').addEventListener('click', function(){
    document.getElementById('vnNav').classList.toggle('vn-open');
  });
})();
