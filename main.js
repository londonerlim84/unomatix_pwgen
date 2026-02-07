// ===== i18n Translations =====
const i18n = {
  ko: {
    appTitle: 'Unomatix PwGen',
    tabPassword: '비밀번호',
    tabPassphrase: '패스프레이즈',
    placeholder: '생성 버튼을 눌러주세요',
    copyTooltip: '복사',
    length: '길이',
    charTypes: '문자 유형',
    uppercase: '대문자 (A-Z)',
    lowercase: '소문자 (a-z)',
    numbers: '숫자 (0-9)',
    symbols: '특수문자 (!@#$...)',
    count: '생성 개수',
    generate: '생성하기',
    history: '히스토리',
    clearAll: '전체 삭제',
    historyEmpty: '아직 생성된 비밀번호가 없습니다.',
    wordCount: '단어 개수',
    separator: '구분자',
    space: '공백',
    options: '옵션',
    capitalizeWords: '단어 첫글자 대문자',
    addNumber: '숫자 추가',
    copied: '복사됨!',
    strengthNone: '-',
    strengthVeryWeak: '매우 약함',
    strengthWeak: '약함',
    strengthFair: '보통',
    strengthStrong: '강함',
    strengthVeryStrong: '매우 강함',
    historyCleared: '히스토리가 삭제되었습니다.',
    noCharType: '최소 하나의 문자 유형을 선택해주세요.',
  },
  en: {
    appTitle: 'Unomatix PwGen',
    tabPassword: 'Password',
    tabPassphrase: 'Passphrase',
    placeholder: 'Click generate to create a password',
    copyTooltip: 'Copy',
    length: 'Length',
    charTypes: 'Character Types',
    uppercase: 'Uppercase (A-Z)',
    lowercase: 'Lowercase (a-z)',
    numbers: 'Numbers (0-9)',
    symbols: 'Symbols (!@#$...)',
    count: 'Count',
    generate: 'Generate',
    history: 'History',
    clearAll: 'Clear All',
    historyEmpty: 'No passwords generated yet.',
    wordCount: 'Word Count',
    separator: 'Separator',
    space: 'Space',
    options: 'Options',
    capitalizeWords: 'Capitalize Words',
    addNumber: 'Add Number',
    copied: 'Copied!',
    strengthNone: '-',
    strengthVeryWeak: 'Very Weak',
    strengthWeak: 'Weak',
    strengthFair: 'Fair',
    strengthStrong: 'Strong',
    strengthVeryStrong: 'Very Strong',
    historyCleared: 'History cleared.',
    noCharType: 'Select at least one character type.',
  }
};

// ===== Word List for Passphrase =====
const WORD_LIST = [
  'apple','arrow','beach','bird','bloom','brave','bright','brook','calm','canyon',
  'castle','cedar','chair','charm','chase','chess','cliff','cloud','coral','crane',
  'creek','crown','dance','dawn','delta','dream','drift','eagle','earth','ember',
  'faith','falcon','field','flame','flash','flora','forest','frost','garden','gentle',
  'ghost','glass','globe','grace','grain','grape','green','grove','happy','harbor',
  'haven','heart','honey','horse','ivory','jade','jewel','journey','jungle','karma',
  'lake','lantern','lemon','light','lily','linen','lotus','lucky','maple','marble',
  'meadow','melody','mist','moon','mountain','music','nature','night','noble','north',
  'ocean','olive','orbit','orchid','palm','paper','path','peace','pearl','petal',
  'pilot','pine','pixel','plain','planet','plaza','plum','poem','pond','power',
  'pride','prism','pulse','purple','quest','quiet','rain','rainbow','raven','reef',
  'ridge','river','robin','rocket','rose','royal','ruby','sage','sand','scarf',
  'shell','shore','silver','sky','slate','smile','solar','spark','spice','spirit',
  'spring','star','steam','stone','storm','story','stream','sugar','summer','sunny',
  'swan','swift','table','tempo','thorn','thunder','tiger','timber','tower','trail',
  'tree','tulip','valley','velvet','violet','vivid','water','wave','whisper','willow',
  'wind','winter','wisdom','wolf','wonder','woods','world','yacht','young','zebra',
  'anchor','atlas','badge','baker','banner','barrel','basket','beacon','blanket','blaze',
  'bonus','breeze','bridge','bronze','bubble','butter','cabin','cactus','camel','candle',
  'canvas','carbon','carpet','cellar','cherry','cider','circle','clover','comet','copper',
  'cotton','coyote','crystal','curtain','daisy','desert','dinner','dolphin','dragon','echo',
  'fabric','feather','ferry','finger','flower','flute','fossil','fountain','galaxy','ginger',
  'glacier','golden','hammer','helmet','horizon','island','jasmine','kitten','ladder','legend',
  'locket','magnet','mango','mirror','napkin','nectar','oasis','paddle','panther','parrot',
  'pepper','phantom','picnic','pigeon','pocket','pollen','pumpkin','puzzle','quartz','rabbit'
];

// ===== State =====
let currentLang = localStorage.getItem('pwgen-lang') || 'ko';
let currentMode = 'password';
let currentPassword = '';

// ===== DOM Elements =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  langToggle: $('#langToggle'),
  langLabel: $('#langLabel'),
  modeTabs: $$('.mode-tab'),
  passwordSettings: $('#passwordSettings'),
  passphraseSettings: $('#passphraseSettings'),
  passwordOutput: $('#passwordOutput'),
  mainCopyBtn: $('#mainCopyBtn'),
  strengthFill: $('#strengthFill'),
  strengthLabel: $('#strengthLabel'),
  entropyLabel: $('#entropyLabel'),
  lengthSlider: $('#lengthSlider'),
  lengthInput: $('#lengthInput'),
  optUppercase: $('#optUppercase'),
  optLowercase: $('#optLowercase'),
  optNumbers: $('#optNumbers'),
  optSymbols: $('#optSymbols'),
  countInput: $('#countInput'),
  wordCountSlider: $('#wordCountSlider'),
  wordCountInput: $('#wordCountInput'),
  optCapitalize: $('#optCapitalize'),
  optAddNumber: $('#optAddNumber'),
  ppCountInput: $('#ppCountInput'),
  generateBtn: $('#generateBtn'),
  resultsList: $('#resultsList'),
  historyList: $('#historyList'),
  clearHistoryBtn: $('#clearHistoryBtn'),
  toast: $('#toast'),
};

// ===== i18n Functions =====
function t(key) {
  return i18n[currentLang][key] || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  dom.langLabel.textContent = currentLang === 'ko' ? 'EN' : '한';

  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang][key] !== undefined) {
      el.textContent = i18n[currentLang][key];
    }
  });

  $$('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (i18n[currentLang][key] !== undefined) {
      el.title = i18n[currentLang][key];
    }
  });

  localStorage.setItem('pwgen-lang', currentLang);
}

function toggleLanguage() {
  currentLang = currentLang === 'ko' ? 'en' : 'ko';
  applyLanguage();
  renderHistory();
}

// ===== Password Generation =====
function getSecureRandom(max) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function generatePassword(length, options) {
  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  };

  let chars = '';
  const required = [];

  if (options.uppercase) {
    chars += charSets.uppercase;
    required.push(charSets.uppercase);
  }
  if (options.lowercase) {
    chars += charSets.lowercase;
    required.push(charSets.lowercase);
  }
  if (options.numbers) {
    chars += charSets.numbers;
    required.push(charSets.numbers);
  }
  if (options.symbols) {
    chars += charSets.symbols;
    required.push(charSets.symbols);
  }

  if (chars.length === 0) return null;

  let password;
  // Retry until we get a password that contains at least one char from each required set
  do {
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    password = Array.from(arr, v => chars[v % chars.length]).join('');
  } while (!required.every(set => [...password].some(c => set.includes(c))) && length >= required.length);

  return password;
}

function generatePassphrase(wordCount, separator, capitalize, addNumber) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    let word = WORD_LIST[getSecureRandom(WORD_LIST.length)];
    if (capitalize) {
      word = word[0].toUpperCase() + word.slice(1);
    }
    words.push(word);
  }

  let result = words.join(separator);
  if (addNumber) {
    result += separator + getSecureRandom(100);
  }

  return result;
}

// ===== Strength Calculation =====
function calculateEntropy(password) {
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  if (poolSize === 0) return 0;
  return Math.floor(password.length * Math.log2(poolSize));
}

function getStrengthLevel(entropy) {
  if (entropy < 28) return { level: 0, key: 'strengthVeryWeak', color: 'var(--strength-weak)' };
  if (entropy < 36) return { level: 1, key: 'strengthWeak', color: 'var(--strength-fair)' };
  if (entropy < 60) return { level: 2, key: 'strengthFair', color: 'var(--strength-good)' };
  if (entropy < 80) return { level: 3, key: 'strengthStrong', color: 'var(--strength-strong)' };
  return { level: 4, key: 'strengthVeryStrong', color: 'var(--strength-very)' };
}

function updateStrengthMeter(password) {
  if (!password) {
    dom.strengthFill.style.width = '0%';
    dom.strengthFill.style.background = 'transparent';
    dom.strengthLabel.textContent = t('strengthNone');
    dom.strengthLabel.setAttribute('data-i18n', 'strengthNone');
    dom.entropyLabel.textContent = '';
    return;
  }

  const entropy = calculateEntropy(password);
  const strength = getStrengthLevel(entropy);
  const percent = Math.min(100, (strength.level + 1) * 20);

  dom.strengthFill.style.width = percent + '%';
  dom.strengthFill.style.background = strength.color;
  dom.strengthLabel.textContent = t(strength.key);
  dom.strengthLabel.setAttribute('data-i18n', strength.key);
  dom.strengthLabel.style.color = strength.color;
  dom.entropyLabel.textContent = entropy + ' bits';
}

// ===== UI Actions =====
function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.remove('hidden');
  dom.toast.classList.add('show');
  setTimeout(() => {
    dom.toast.classList.remove('show');
  }, 1800);
}

async function copyToClipboard(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1500);
    }
    showToast(t('copied'));
  } catch {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(t('copied'));
  }
}

function displayPassword(password) {
  currentPassword = password;
  dom.passwordOutput.innerHTML = '';
  dom.passwordOutput.textContent = password;
  updateStrengthMeter(password);
}

function handleGenerate() {
  let passwords = [];

  if (currentMode === 'password') {
    const length = parseInt(dom.lengthInput.value) || 16;
    const count = parseInt(dom.countInput.value) || 1;
    const options = {
      uppercase: dom.optUppercase.checked,
      lowercase: dom.optLowercase.checked,
      numbers: dom.optNumbers.checked,
      symbols: dom.optSymbols.checked,
    };

    if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
      showToast(t('noCharType'));
      return;
    }

    for (let i = 0; i < count; i++) {
      const pw = generatePassword(length, options);
      if (pw) passwords.push(pw);
    }
  } else {
    const wordCount = parseInt(dom.wordCountInput.value) || 4;
    const count = parseInt(dom.ppCountInput.value) || 1;
    const sepBtn = document.querySelector('.sep-btn.active');
    const separator = sepBtn ? sepBtn.getAttribute('data-sep') : '-';
    const capitalize = dom.optCapitalize.checked;
    const addNumber = dom.optAddNumber.checked;

    for (let i = 0; i < count; i++) {
      passwords.push(generatePassphrase(wordCount, separator, capitalize, addNumber));
    }
  }

  if (passwords.length === 0) return;

  // Display first password in main output
  displayPassword(passwords[0]);

  // Display results list if multiple
  if (passwords.length > 1) {
    dom.resultsList.classList.remove('hidden');
    dom.resultsList.innerHTML = passwords.map((pw, i) => `
      <div class="result-item">
        <span class="result-text">${escapeHtml(pw)}</span>
        <button class="copy-btn" data-pw="${escapeAttr(pw)}" title="${t('copyTooltip')}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      </div>
    `).join('');
  } else {
    dom.resultsList.classList.add('hidden');
    dom.resultsList.innerHTML = '';
  }

  // Save to history
  passwords.forEach(pw => addToHistory(pw));
}

// ===== History =====
function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('pwgen-history') || '[]');
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem('pwgen-history', JSON.stringify(history));
}

function addToHistory(password) {
  const history = getHistory();
  history.unshift({
    pw: password,
    ts: Date.now(),
  });
  // Keep max 20
  if (history.length > 20) history.length = 20;
  saveHistory(history);
  renderHistory();
}

function renderHistory() {
  const history = getHistory();

  if (history.length === 0) {
    dom.historyList.innerHTML = `<p class="history-empty" data-i18n="historyEmpty">${t('historyEmpty')}</p>`;
    return;
  }

  dom.historyList.innerHTML = history.map(item => {
    const date = new Date(item.ts);
    const timeStr = date.toLocaleTimeString(currentLang === 'ko' ? 'ko-KR' : 'en-US', {
      hour: '2-digit', minute: '2-digit'
    });
    return `
      <div class="history-item">
        <span class="history-pw">${escapeHtml(item.pw)}</span>
        <span class="history-meta">${timeStr}</span>
        <button class="copy-btn" data-pw="${escapeAttr(item.pw)}" title="${t('copyTooltip')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      </div>
    `;
  }).join('');
}

function clearHistory() {
  localStorage.removeItem('pwgen-history');
  renderHistory();
  showToast(t('historyCleared'));
}

// ===== Utilities =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===== Event Listeners =====
function init() {
  // Language toggle
  dom.langToggle.addEventListener('click', toggleLanguage);

  // Mode tabs
  dom.modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dom.modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentMode = tab.getAttribute('data-mode');

      if (currentMode === 'password') {
        dom.passwordSettings.classList.remove('hidden');
        dom.passphraseSettings.classList.add('hidden');
      } else {
        dom.passwordSettings.classList.add('hidden');
        dom.passphraseSettings.classList.remove('hidden');
      }
    });
  });

  // Length slider <-> input sync
  dom.lengthSlider.addEventListener('input', () => {
    dom.lengthInput.value = dom.lengthSlider.value;
  });
  dom.lengthInput.addEventListener('input', () => {
    let val = parseInt(dom.lengthInput.value);
    if (val < 4) val = 4;
    if (val > 128) val = 128;
    dom.lengthSlider.value = val;
  });

  // Word count slider <-> input sync
  dom.wordCountSlider.addEventListener('input', () => {
    dom.wordCountInput.value = dom.wordCountSlider.value;
  });
  dom.wordCountInput.addEventListener('input', () => {
    let val = parseInt(dom.wordCountInput.value);
    if (val < 3) val = 3;
    if (val > 8) val = 8;
    dom.wordCountSlider.value = val;
  });

  // Separator buttons
  document.querySelectorAll('.sep-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sep-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Generate button
  dom.generateBtn.addEventListener('click', handleGenerate);

  // Main copy button
  dom.mainCopyBtn.addEventListener('click', () => {
    if (currentPassword) {
      copyToClipboard(currentPassword, dom.mainCopyBtn);
    }
  });

  // Delegated copy buttons for results and history
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-btn[data-pw]');
    if (copyBtn) {
      copyToClipboard(copyBtn.getAttribute('data-pw'), copyBtn);
    }
  });

  // Clear history
  dom.clearHistoryBtn.addEventListener('click', clearHistory);

  // Apply saved language
  applyLanguage();

  // Render history
  renderHistory();
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
