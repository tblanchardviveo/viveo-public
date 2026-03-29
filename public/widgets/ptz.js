(function() {
  const script = document.currentScript;
  const cabinetId = script.getAttribute('data-cabinet') || 'demo';
  const primaryColor = script.getAttribute('data-color') || '#A67C52';
  const position = script.getAttribute('data-position') || 'bottom-left';

  const bar = document.createElement('div');
  bar.id = 'viveo-ptz-bar';
  bar.style.cssText = `
    position: fixed;
    ${position.includes('right') ? 'right: 0' : 'left: 0'};
    bottom: 0; z-index: 999997;
    background: ${primaryColor}; color: #fff;
    padding: 12px 24px; cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px; font-weight: 700;
    border-radius: ${position.includes('right') ? '12px 0 0 0' : '0 12px 0 0'};
    box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
    display: flex; align-items: center; gap: 8px;
    transition: opacity 0.2s;
  `;
  bar.innerHTML = `<span>🏠</span><span>Calculer mon PTZ</span>`;
  bar.onmouseover = () => { bar.style.opacity = '0.88'; };
  bar.onmouseout  = () => { bar.style.opacity = '1'; };

  // Overlay modal
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    display: none; position: fixed; inset: 0; z-index: 999999;
    background: rgba(0,0,0,0.6); align-items: center; justify-content: center; padding: 16px;
  `;

  const relative = document.createElement('div');
  relative.style.cssText = 'position: relative; width: 100%; max-width: 520px; height: 85vh;';

  const iframe = document.createElement('iframe');
  const baseUrl = 'https://viveo-patrimoine.fr';
  iframe.src = `${baseUrl}/widget/ptz?cabinet=${cabinetId}&color=${encodeURIComponent(primaryColor)}`;
  iframe.style.cssText = 'width: 100%; height: 100%; border: none; border-radius: 16px; background: white;';

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = `
    position: absolute; top: -14px; right: -14px; background: #111C33;
    border: none; color: #fff; font-size: 16px; width: 32px; height: 32px;
    border-radius: 50%; cursor: pointer; z-index: 1;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  `;
  closeBtn.onclick = () => { overlay.style.display = 'none'; };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.style.display = 'none'; };
  bar.onclick = () => { overlay.style.display = 'flex'; };

  relative.appendChild(iframe);
  relative.appendChild(closeBtn);
  overlay.appendChild(relative);
  document.body.appendChild(bar);
  document.body.appendChild(overlay);
})();
