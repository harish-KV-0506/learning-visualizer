import { ALGORITHMS, generateFrames, parseNumberList, parseProcesses } from './core.js';

const $ = (selector) => document.querySelector(selector);
const languageCopy = {
  en: {
    ready: 'READY TO EXPLORE', eyebrow: 'INTERACTIVE LEARNING LAB', titleOne: 'Big ideas,', titleTwo: 'made visible.',
    introText: 'Follow each step. See what changes. Learn at your own pace.', explore: 'EXPLORE', chooseAlgorithm: 'Choose an algorithm',
    time: 'TIME', space: 'SPACE', yourInput: 'YOUR INPUT', arrayLabel: 'Array values',
    arrayHint: '2–16 whole numbers, separated by commas.', targetLabel: 'Search for',
    sortedHint: 'Binary Search needs an ascending array.', processLabel: 'Process : CPU burst @ arrival',
    processHint: 'Example: P1:4@0, P2:2@1 (arrival is optional).', applyInput: 'Apply input',
    share: 'Share this visual', visualization: 'VISUALIZATION', step: 'STEP', comparing: 'Comparing',
    sorted: 'Sorted', pivot: 'Pivot', play: 'Play', pause: 'Pause', speed: 'SPEED',
    comparisons: 'Comparisons', swaps: 'Swaps', underTheHood: 'UNDER THE HOOD', keyIdea: 'KEY IDEA',
    codeNote: 'The highlighted line is what the algorithm is doing right now.',
    footer: 'Built for curious minds.', arrayStage: 'Array in motion', scheduleStage: 'Process timeline',
    networkStage: 'Connection setup', networkHeading: 'TCP THREE-WAY HANDSHAKE',
    scheduleTitle: 'CPU timeline', scheduleHead: 'PROCESS SCHEDULE',
    ganttHint: 'Each block shows when a process gets the CPU.', idle: 'Idle',
    ideas: {
      bubble: 'Small, repeated comparisons make the order emerge.',
      insertion: 'Build a sorted section one value at a time.',
      quick: 'A pivot divides the work into smaller ranges.',
      binary: 'Each comparison removes half of the remaining choices.',
      fcfs: 'The first process to arrive is the first one served.',
      tcp: 'Three messages establish shared intent and a reliable connection.',
    },
    categories: { Sorting: 'SORTING', Searching: 'SEARCHING', 'Operating systems': 'OPERATING SYSTEMS', Networking: 'NETWORKING' },
    names: { bubble: 'Bubble Sort', insertion: 'Insertion Sort', quick: 'Quick Sort', binary: 'Binary Search', fcfs: 'FCFS Scheduling', tcp: 'TCP Handshake' },
    descriptions: {
      bubble: 'Repeatedly compare neighbors and move larger values toward the end.',
      insertion: 'Grow a sorted section by inserting each new value in its place.',
      quick: 'Partition around a pivot, then repeat on smaller ranges.',
      binary: 'Compare the middle value and eliminate half the search range.',
      fcfs: 'Give the CPU to processes in the order they arrive.',
      tcp: 'See how a client and server establish a reliable connection.',
    },
  },
  ta: {
    ready: 'கற்கத் தயார்', eyebrow: 'ஊடாடும் கற்றல் ஆய்வகம்', titleOne: 'பெரிய கருத்துகள்,', titleTwo: 'எளிய காட்சியில்.',
    introText: 'ஒவ்வொரு படியையும் கவனியுங்கள். என்ன மாறுகிறது எனப் பாருங்கள். உங்கள் வேகத்தில் கற்றுக்கொள்ளுங்கள்.',
    explore: 'ஆராயுங்கள்', chooseAlgorithm: 'அல்காரிதத்தைத் தேர்ந்தெடுக்கவும்', time: 'நேரம்', space: 'இடம்',
    yourInput: 'உங்கள் உள்ளீடு', arrayLabel: 'வரிசை மதிப்புகள்', arrayHint: 'கமாவால் பிரிக்கப்பட்ட 2–16 முழு எண்கள்.',
    targetLabel: 'தேட வேண்டியது', sortedHint: 'இருமத் தேடலுக்கு ஏறுவரிசை தேவை.',
    processLabel: 'செயல்முறை : CPU நேரம் @ வருகை', processHint: 'எடுத்துக்காட்டு: P1:4@0, P2:2@1 (வருகை விருப்பமானது).',
    applyInput: 'உள்ளீட்டைப் பயன்படுத்து', share: 'பகிர்', visualization: 'காட்சி', step: 'படி',
    comparing: 'ஒப்பிடுதல்', sorted: 'வரிசைப்படுத்தப்பட்டது', pivot: 'மைய மதிப்பு',
    play: 'தொடங்கு', pause: 'நிறுத்து', speed: 'வேகம்', comparisons: 'ஒப்பீடுகள்', swaps: 'இடமாற்றங்கள்',
    underTheHood: 'உள்ளே என்ன நடக்கிறது', keyIdea: 'முக்கியக் கருத்து',
    codeNote: 'தற்போது அல்காரிதம் செயல்படுத்தும் வரி வண்ணமிடப்பட்டுள்ளது.',
    footer: 'ஆர்வமுள்ள மனங்களுக்காக.', arrayStage: 'வரிசையின் நகர்வு', scheduleStage: 'செயல்முறை காலவரிசை',
    networkStage: 'இணைப்பு அமைப்பு', networkHeading: 'TCP மூன்று-படி இணைப்பு',
    scheduleTitle: 'CPU காலவரிசை', scheduleHead: 'செயல்முறை அட்டவணை',
    ganttHint: 'ஒவ்வொரு பகுதியும் செயல்முறை CPU-ஐப் பயன்படுத்தும் நேரத்தைக் காட்டுகிறது.', idle: 'செயலற்றது',
    ideas: {
      bubble: 'மீண்டும் மீண்டும் செய்யும் சிறிய ஒப்பீடுகள் வரிசையை உருவாக்குகின்றன.',
      insertion: 'ஒவ்வொரு மதிப்பாகச் சேர்த்து வரிசைப்படுத்தப்பட்ட பகுதியை உருவாக்குங்கள்.',
      quick: 'மைய மதிப்பு வேலையைச் சிறிய பகுதிகளாகப் பிரிக்கிறது.',
      binary: 'ஒவ்வொரு ஒப்பீடும் மீதமுள்ள தேர்வுகளில் பாதியை நீக்குகிறது.',
      fcfs: 'முதலில் வரும் செயல்முறைக்கு முதலில் CPU வழங்கப்படும்.',
      tcp: 'மூன்று செய்திகள் நம்பகமான இணைப்பை நிறுவுகின்றன.',
    },
    categories: { Sorting: 'வரிசைப்படுத்துதல்', Searching: 'தேடல்', 'Operating systems': 'இயக்க முறைமை', Networking: 'வலையமைப்பு' },
    names: { bubble: 'குமிழி வரிசை', insertion: 'செருகல் வரிசை', quick: 'விரைவு வரிசை', binary: 'இருமத் தேடல்', fcfs: 'FCFS அட்டவணை', tcp: 'TCP கை குலுக்கல்' },
    descriptions: {
      bubble: 'அருகிலுள்ள மதிப்புகளை ஒப்பிட்டு பெரியவற்றை இறுதிக்கு நகர்த்துங்கள்.',
      insertion: 'ஒவ்வொரு புதிய மதிப்பையும் சரியான இடத்தில் சேர்த்து வரிசையை வளருங்கள்.',
      quick: 'மைய மதிப்பை வைத்து பிரித்து, சிறிய பகுதிகளில் மீண்டும் செய்யுங்கள்.',
      binary: 'நடுவிலுள்ள மதிப்பை ஒப்பிட்டு தேடல் பகுதியை பாதியாகக் குறையுங்கள்.',
      fcfs: 'வருகை வரிசையில் செயல்முறைகளுக்கு CPU வழங்குங்கள்.',
      tcp: 'வாடிக்கையாளரும் சேவையகமும் நம்பகமான இணைப்பை அமைப்பதைப் பாருங்கள்.',
    },
  },
};

const state = { algorithm: 'bubble', frames: [], cursor: 0, language: 'en', playing: false, timer: null };
const algorithmSelect = $('#algorithm-select');
const arrayInput = $('#array-input');
const targetInput = $('#target-input');
const processInput = $('#process-input');
const timeline = $('#timeline');
let toastTimer;

function showToast(text) {
  const toast = $('#toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function copyPageText(en, ta) {
  return state.language === 'ta' ? ta : en;
}

function renderStaticCopy() {
  const copy = languageCopy[state.language];
  document.documentElement.lang = state.language === 'ta' ? 'ta' : 'en';
  document.querySelectorAll('[data-copy]').forEach((element) => {
    element.textContent = copy[element.dataset.copy];
  });
  $('#language-button').textContent = state.language === 'en' ? 'தமிழ்' : 'English';
  $('#language-button').setAttribute('aria-label', state.language === 'en' ? 'Switch to Tamil' : 'Switch to English');
  $('#algorithm-select').setAttribute('aria-label', copy.chooseAlgorithm);
  $('#reset-button').setAttribute('aria-label', state.language === 'ta' ? 'மீட்டமை' : 'Reset');
  $('#previous-button').setAttribute('aria-label', state.language === 'ta' ? 'முந்தைய படி' : 'Previous step');
  $('#next-button').setAttribute('aria-label', state.language === 'ta' ? 'அடுத்த படி' : 'Next step');
  $('#timeline').setAttribute('aria-label', state.language === 'ta' ? 'படிக் காலவரிசை' : 'Step timeline');
  for (const group of algorithmSelect.querySelectorAll('optgroup')) {
    group.label = copy.categories[group.dataset.category];
  }
  const selected = algorithmSelect.value;
  for (const option of algorithmSelect.querySelectorAll('option')) {
    option.textContent = copy.names[option.value];
  }
  algorithmSelect.value = selected;
  renderAlgorithmInfo();
  renderFrame();
}

function renderAlgorithmInfo() {
  const info = ALGORITHMS[state.algorithm];
  const copy = languageCopy[state.language];
  $('#category-pill').textContent = copy.categories[info.category];
  $('#algorithm-title').textContent = copy.names[state.algorithm];
  $('#algorithm-description').textContent = copy.descriptions[state.algorithm];
  $('#time-complexity').textContent = info.complexity.time;
  $('#space-complexity').textContent = info.complexity.space;
  $('#key-idea').textContent = copy.ideas[state.algorithm];
  $('#stage-title').textContent = state.algorithm === 'fcfs' ? copy.scheduleStage
    : state.algorithm === 'tcp' ? copy.networkStage : copy.arrayStage;
  $('#array-fields').hidden = !['bubble', 'insertion', 'quick', 'binary'].includes(state.algorithm);
  $('#target-field').hidden = state.algorithm !== 'binary';
  $('#process-field').hidden = state.algorithm !== 'fcfs';
  $('#apply-button').hidden = state.algorithm === 'tcp';
  $('#input-section').hidden = state.algorithm === 'tcp';
  $('#array-legend').hidden = !['bubble', 'insertion', 'quick'].includes(state.algorithm);
  $('#pivot-legend').hidden = state.algorithm !== 'quick';
  $('#array-visual').hidden = !['bubble', 'insertion', 'quick', 'binary'].includes(state.algorithm);
  $('#schedule-visual').hidden = state.algorithm !== 'fcfs';
  $('#network-visual').hidden = state.algorithm !== 'tcp';
  $('.stats').hidden = !['bubble', 'insertion', 'quick', 'binary'].includes(state.algorithm);
  $('#swap-count').parentElement.hidden = state.algorithm === 'binary';
  $('#code-lines').replaceChildren(...info.code.map((line, index) => {
    const row = document.createElement('div');
    row.className = 'code-line';
    const lineNumber = document.createElement('span');
    lineNumber.className = 'code-line-number';
    lineNumber.textContent = String(index + 1).padStart(2, '0');
    const text = document.createElement('span');
    text.className = 'code-line-text';
    text.textContent = line;
    row.append(lineNumber, text);
    return row;
  }));
}

function collectInput() {
  if (['bubble', 'insertion', 'quick', 'binary'].includes(state.algorithm)) {
    const values = parseNumberList(arrayInput.value);
    if (state.algorithm === 'binary') {
      const target = Number(targetInput.value);
      if (!targetInput.value || !Number.isSafeInteger(target)) throw new Error('Enter a whole number to search for.');
      return { values, target };
    }
    return { values };
  }
  if (state.algorithm === 'fcfs') return { processes: parseProcesses(processInput.value) };
  return {};
}

function applyInput() {
  stopPlayback();
  try {
    state.frames = generateFrames(state.algorithm, collectInput());
    state.cursor = 0;
    $('#input-error').hidden = true;
    timeline.max = String(Math.max(0, state.frames.length - 1));
    timeline.value = '0';
    renderFrame();
  } catch (error) {
    $('#input-error').textContent = error.message;
    $('#input-error').hidden = false;
  }
}

function renderArray(frame) {
  const root = $('#array-visual');
  root.replaceChildren();
  const values = frame.values || [];
  if (!values.length) return;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = max - min || 1;
  const items = values.map((value, index) => {
    const item = document.createElement('div');
    item.className = 'array-item';
    const markers = document.createElement('div');
    markers.className = 'array-markers';
    if (index === frame.low) markers.append(makeMarker('L'));
    if (index === frame.middle) markers.append(makeMarker('M'));
    if (index === frame.high) markers.append(makeMarker('H'));
    if (index === frame.pivot) markers.append(makeMarker('P', 'pivot'));

    const bar = document.createElement('div');
    bar.className = 'array-bar';
    bar.style.height = `${Math.max(14, 25 + ((value - min) / spread) * 70)}%`;
    const valueLabel = document.createElement('span');
    valueLabel.textContent = String(value);
    bar.append(valueLabel);

    const indexLabel = document.createElement('div');
    indexLabel.className = 'array-labels';
    indexLabel.textContent = String(index);
    item.append(markers, bar, indexLabel);
    if (frame.active?.includes(index)) item.classList.add('active');
    if (frame.sorted?.includes(index)) item.classList.add('sorted');
    if (frame.pivot === index) item.classList.add('pivot-item');
    if (frame.low !== undefined && frame.high !== undefined && (index < frame.low || index > frame.high)) item.classList.add('out-of-range');
    return item;
  });
  root.append(...items);
}

function makeMarker(label, variant = '') {
  const marker = document.createElement('span');
  marker.className = `array-marker ${variant}`;
  marker.textContent = label;
  return marker;
}

function renderSchedule(frame) {
  const root = $('#schedule-visual');
  root.replaceChildren();
  const heading = document.createElement('h3');
  heading.textContent = languageCopy[state.language].scheduleTitle;
  const schedule = frame.schedule || [];
  const maxTime = Math.max(1, ...schedule.map((segment) => segment.end));
  const gantt = document.createElement('div');
  gantt.className = 'gantt';
  if (!schedule.length) {
    const placeholder = document.createElement('p');
    placeholder.className = 'input-hint';
    placeholder.textContent = languageCopy[state.language].ganttHint;
    root.append(heading, placeholder);
    return;
  }
  let end = 0;
  const segments = [];
  for (const process of schedule) {
    if (process.start > end) segments.push({ id: languageCopy[state.language].idle, start: end, end: process.start, idle: true });
    segments.push(process);
    end = process.end;
  }
  for (const segment of segments) {
    const block = document.createElement('div');
    block.className = `gantt-segment${segment.id === frame.current ? ' current' : ''}`;
    block.style.flex = `${segment.end - segment.start}`;
    const name = document.createElement('strong');
    name.textContent = segment.id;
    const time = document.createElement('span');
    time.textContent = `${segment.start}–${segment.end}`;
    block.append(name, time);
    gantt.append(block);
  }
  const axis = document.createElement('div');
  axis.className = 'gantt-axis';
  const axisStart = document.createElement('span');
  axisStart.textContent = '0';
  const axisEnd = document.createElement('span');
  axisEnd.textContent = String(maxTime);
  axis.append(axisStart, axisEnd);
  const table = document.createElement('div');
  table.className = 'schedule-table';
  for (const segment of schedule) {
    const cell = document.createElement('div');
    cell.className = 'schedule-cell';
    const label = document.createElement('span');
    label.textContent = `${segment.id} · ${state.language === 'ta' ? 'முடிவு' : 'FINISH'}`;
    const time = document.createElement('strong');
    time.textContent = String(segment.end);
    cell.append(label, time);
    table.append(cell);
  }
  const caption = document.createElement('p');
  caption.className = 'input-hint';
  caption.textContent = languageCopy[state.language].ganttHint;
  root.append(heading, gantt, axis, table, caption);
}

function renderNetwork(frame) {
  const root = $('#network-visual');
  const network = frame.network || {};
  root.replaceChildren();
  const heading = document.createElement('h3');
  heading.textContent = languageCopy[state.language].networkHeading;
  const diagram = document.createElement('div');
  diagram.className = 'network-diagram';
  const lane = document.createElement('div');
  lane.className = 'packet-lane';
  const label = document.createElement('div');
  label.className = 'packet-label';
  label.textContent = network.message || 'TCP';
  const client = makeNetworkNode('client', state.language === 'ta' ? 'வாடிக்கையாளர்' : 'CLIENT', network.client === 'established');
  const server = makeNetworkNode('server', state.language === 'ta' ? 'சேவையகம்' : 'SERVER', network.server === 'established');
  diagram.append(lane, label, client, server);
  const status = document.createElement('p');
  status.className = 'network-message';
  status.textContent = network.client === 'established' && network.server === 'established'
    ? (state.language === 'ta' ? 'இணைப்பு நிறுவப்பட்டது' : 'CONNECTION ESTABLISHED')
    : (network.message || (state.language === 'ta' ? 'செய்திக்காகக் காத்திருக்கிறது' : 'WAITING FOR A MESSAGE'));
  root.append(heading, diagram, status);
}

function makeNetworkNode(kind, title, connected) {
  const node = document.createElement('div');
  node.className = `network-node ${kind}${connected ? ' connected' : ''}`;
  const icon = document.createElement('span');
  icon.className = 'node-icon';
  const label = document.createElement('span');
  label.textContent = title;
  node.append(icon, label);
  return node;
}

function renderFrame() {
  if (!state.frames.length) return;
  const frame = state.frames[state.cursor];
  const copy = languageCopy[state.language];
  $('#step-number').textContent = String(state.cursor + 1).padStart(2, '0');
  $('#step-total').textContent = String(state.frames.length).padStart(2, '0');
  $('#explanation-index').textContent = String(state.cursor + 1).padStart(2, '0');
  $('#explanation-text').textContent = frame.explanation?.[state.language] || '';
  $('#comparison-count').textContent = String(frame.comparisons || 0);
  $('#swap-count').textContent = String(frame.swaps || 0);
  timeline.value = String(state.cursor);
  for (const [index, line] of Array.from($('#code-lines').children).entries()) {
    line.classList.toggle('active', index === frame.line);
  }
  if (state.algorithm === 'fcfs') renderSchedule(frame);
  else if (state.algorithm === 'tcp') renderNetwork(frame);
  else renderArray(frame);
  $('#visual-stage').setAttribute('aria-label', frame.explanation?.[state.language] || 'Algorithm visualization');
  $('#play-button').innerHTML = state.playing
    ? `<span aria-hidden="true">Ⅱ</span><span>${copy.pause}</span>`
    : `<span aria-hidden="true">▶</span><span>${copy.play}</span>`;
  $('#previous-button').disabled = state.cursor === 0;
  $('#next-button').disabled = state.cursor >= state.frames.length - 1;
}

function stopPlayback() {
  state.playing = false;
  clearInterval(state.timer);
  state.timer = null;
}

function advance() {
  if (state.cursor >= state.frames.length - 1) {
    stopPlayback();
    renderFrame();
    return;
  }
  state.cursor += 1;
  renderFrame();
  if (state.cursor >= state.frames.length - 1) stopPlayback();
}

function togglePlayback() {
  if (state.playing) {
    stopPlayback();
    renderFrame();
    return;
  }
  if (state.cursor >= state.frames.length - 1) state.cursor = 0;
  state.playing = true;
  const delay = [1800, 1300, 900, 550, 300][Number($('#speed-input').value) - 1];
  state.timer = setInterval(advance, delay);
  renderFrame();
}

function updateAlgorithm() {
  state.algorithm = algorithmSelect.value;
  renderAlgorithmInfo();
  applyInput();
}

function initializeFromUrl() {
  const params = new URLSearchParams(location.search);
  const algorithm = params.get('a');
  if (ALGORITHMS[algorithm]) algorithmSelect.value = algorithm;
  if (params.has('v')) arrayInput.value = params.get('v');
  if (params.has('t')) targetInput.value = params.get('t');
  if (params.has('p')) processInput.value = params.get('p');
}

async function share() {
  const url = new URL(location.href);
  url.search = '';
  url.searchParams.set('a', state.algorithm);
  if (['bubble', 'insertion', 'quick', 'binary'].includes(state.algorithm)) {
    url.searchParams.set('v', arrayInput.value);
    if (state.algorithm === 'binary') url.searchParams.set('t', targetInput.value);
  } else if (state.algorithm === 'fcfs') {
    url.searchParams.set('p', processInput.value);
  }
  try {
    await navigator.clipboard.writeText(url.href);
    showToast(copyPageText('Share link copied', 'பகிர்வு இணைப்பு நகலெடுக்கப்பட்டது'));
  } catch {
    showToast(copyPageText('Could not copy link; copy it from the address bar.', 'இணைப்பை நகலெடுக்க முடியவில்லை; முகவரிப் பட்டியிலிருந்து நகலெடுக்கவும்.'));
  }
}

algorithmSelect.addEventListener('change', updateAlgorithm);
$('#apply-button').addEventListener('click', applyInput);
$('#reset-button').addEventListener('click', applyInput);
$('#previous-button').addEventListener('click', () => {
  stopPlayback();
  state.cursor = Math.max(0, state.cursor - 1);
  renderFrame();
});
$('#next-button').addEventListener('click', () => {
  stopPlayback();
  advance();
});
$('#play-button').addEventListener('click', togglePlayback);
timeline.addEventListener('input', () => {
  stopPlayback();
  state.cursor = Number(timeline.value);
  renderFrame();
});
$('#speed-input').addEventListener('input', () => {
  $('#speed-value').textContent = `${[0.5, 0.75, 1, 1.5, 2][Number($('#speed-input').value) - 1]}×`;
  if (state.playing) {
    stopPlayback();
    togglePlayback();
  }
});
$('#language-button').addEventListener('click', () => {
  state.language = state.language === 'en' ? 'ta' : 'en';
  renderStaticCopy();
});
$('#theme-button').addEventListener('click', () => {
  const root = document.documentElement;
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('lv-theme', root.dataset.theme); } catch {}
});
$('#share-button').addEventListener('click', share);
document.addEventListener('keydown', (event) => {
  if (event.target.matches('input, select, textarea, button')) return;
  if (event.key === 'ArrowLeft') $('#previous-button').click();
  if (event.key === 'ArrowRight') $('#next-button').click();
  if (event.code === 'Space') {
    event.preventDefault();
    togglePlayback();
  }
});

initializeFromUrl();
renderStaticCopy();
applyInput();
