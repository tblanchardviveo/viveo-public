(function() {
  const script = document.currentScript;
  const cabinetId = script.getAttribute('data-cabinet') || 'demo';
  const primaryColor = script.getAttribute('data-color') || '#A67C52';
  const position = script.getAttribute('data-position') || 'bottom-right';

  const container = document.createElement('div');
  container.id = 'viveo-contact-container';
  container.style.cssText = `
    position: fixed;
    ${position.includes('right') ? 'right: 20px' : 'left: 20px'};
    bottom: 90px;
    z-index: 999998;
    display: flex; flex-direction: column;
    align-items: ${position.includes('right') ? 'flex-end' : 'flex-start'};
  `;

  const bubble = document.createElement('div');
  bubble.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
  bubble.style.cssText = `
    width: 50px; height: 50px; border-radius: 50%;
    background: ${primaryColor}; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    transition: transform 0.2s;
  `;
  bubble.title = 'Nous contacter';
  bubble.onmouseover = () => { bubble.style.transform = 'scale(1.08)'; };
  bubble.onmouseout  = () => { bubble.style.transform = 'scale(1)'; };

  const iframe = document.createElement('iframe');
  const baseUrl = 'https://viveo-patrimoine.fr';
  iframe.src = `${baseUrl}/widget/contact?cabinet=${cabinetId}&color=${encodeURIComponent(primaryColor)}`;
  iframe.style.cssText = `
    width: 340px; height: 420px; border: none; border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    display: none; margin-bottom: 10px; background: white;
  `;

  let isOpen = false;
  bubble.onclick = () => {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? 'block' : 'none';
    bubble.innerHTML = isOpen
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
  };

  container.appendChild(iframe);
  container.appendChild(bubble);
  document.body.appendChild(container);
})();
