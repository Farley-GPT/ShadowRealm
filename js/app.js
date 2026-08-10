let persona = null;
let isNSFW = false;

async function loadPersona() {
  const personaId = document.body.getAttribute('data-persona');
  if (!personaId) {
    console.error('No data-persona attribute found on body');
    return;
  }

  // Path is relative to the HTML file location
  // From /seal-woman/ or /teresa/ we go up one level
  const jsonPath = `../personas/${personaId}.json`;

  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error('Failed to load persona: ' + jsonPath);
    persona = await res.json();
    renderPersona();
  } catch (err) {
    console.error(err);
    const box = document.getElementById('promptText');
    if (box) box.innerText = 'Error loading persona data.';
  }
}

function renderPersona() {
  if (!persona) return;

  document.title = persona.title || persona.name;

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el && value !== undefined) el.textContent = value;
  };

  set('version', persona.version);
  set('name', persona.name);
  set('location', persona.location);
  set('description', persona.description);
  set('bridge', persona.bridge);

  const img = document.getElementById('charImage');
  if (img && persona.image) {
    img.src = persona.image;
    img.alt = persona.name || 'Lifeform';
  }

  // Apply per-persona theme
  if (persona.theme) {
    const root = document.documentElement;
    if (persona.theme.accent) root.style.setProperty('--accent', persona.theme.accent);
    if (persona.theme.accentHover) root.style.setProperty('--accent-hover', persona.theme.accentHover);
    if (persona.theme.nsfw) root.style.setProperty('--nsfw', persona.theme.nsfw);
    if (persona.theme.nsfwHover) root.style.setProperty('--nsfw-hover', persona.theme.nsfwHover);
  }

  setPrompt();
}

function setPrompt() {
  if (!persona) return;

  const box = document.getElementById('promptText');
  const btn = document.getElementById('copyBtn');
  if (!box || !btn) return;

  if (isNSFW) {
    box.innerText = persona.prompts.nsfw;
    box.classList.add('nsfw-mode');
    btn.classList.add('nsfw');
  } else {
    box.innerText = persona.prompts.normal;
    box.classList.remove('nsfw-mode');
    btn.classList.remove('nsfw');
  }
}

function toggleMode() {
  isNSFW = !isNSFW;
  const toggle = document.getElementById('modeToggle');
  if (toggle) toggle.classList.toggle('active', isNSFW);
  setPrompt();
}

function copyPrompt() {
  const text = document.getElementById('promptText').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyBtn');
    const btnText = document.getElementById('btnText');
    if (btn) btn.classList.add('copied');
    if (btnText) btnText.innerText = 'Copied';
    setTimeout(() => {
      if (btn) btn.classList.remove('copied');
      if (btnText) btnText.innerText = 'Copy System Instructions';
    }, 2000);
  });
}

// Initialize only on persona pages
if (document.body.getAttribute('data-persona')) {
  loadPersona();
}
