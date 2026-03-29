(function() {
  const script = document.currentScript;
  const cabinetId = script.getAttribute('data-cabinet') || 'demo';
  const primaryColor = script.getAttribute('data-color') || '#A67C52';
  const btnLabel = script.getAttribute('data-label') || 'Diagnostic patrimonial gratuit';

  // Bouton déclencheur
  const btn = document.createElement('button');
  btn.textContent = btnLabel;
  btn.style.cssText = `
    display: inline-block; padding: 14px 28px; border-radius: 8px;
    background: ${primaryColor}; color: #fff; border: none;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15); transition: opacity 0.2s;
  `;
  btn.onmouseover = () => { btn.style.opacity = '0.85'; };
  btn.onmouseout  = () => { btn.style.opacity = '1'; };
  script.parentNode.insertBefore(btn, script.nextSibling);

  // Modal overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    display: none; position: fixed; inset: 0; z-index: 999999;
    background: rgba(0,0,0,0.6); align-items: center; justify-content: center; padding: 16px;
  `;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    width: 100%; max-width: 600px; height: 80vh; border-radius: 16px; overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.3);
  `;

  const iframe = document.createElement('iframe');
  const baseUrl = 'https://viveo-patrimoine.fr';
  iframe.src = `${baseUrl}/widget/diagnostic?cabinet=${cabinetId}&color=${encodeURIComponent(primaryColor)}`;
  iframe.style.cssText = 'width: 100%; height: 100%; border: none; background: white;';

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = `
    position: absolute; top: 12px; right: 16px; background: rgba(255,255,255,0.2);
    border: none; color: #fff; font-size: 18px; width: 32px; height: 32px;
    border-radius: 50%; cursor: pointer; z-index: 1;
  `;

  const relative = document.createElement('div');
  relative.style.cssText = 'position: relative; width: 100%; max-width: 600px; height: 80vh;';

  closeBtn.onclick = () => { overlay.style.display = 'none'; };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.style.display = 'none'; };
  btn.onclick = () => { overlay.style.display = 'flex'; };

  relative.appendChild(iframe);
  relative.appendChild(closeBtn);
  overlay.appendChild(relative);
  document.body.appendChild(overlay);
})();
