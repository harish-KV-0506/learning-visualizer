export const ALGORITHMS = {
  bubble: {
    category: 'Sorting',
    name: 'Bubble Sort',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    code: [
      'for each pass through the array:',
      '  for each adjacent pair:',
      '    compare the two values',
      '    if left > right: swap them',
      '    otherwise, keep their order',
      '  mark the last value sorted',
    ],
  },
  insertion: {
    category: 'Sorting',
    name: 'Insertion Sort',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    code: [
      'for each value from left to right:',
      '  save the current value as key',
      '  compare key with values to its left',
      '  shift larger values one position right',
      '  insert key into the open position',
    ],
  },
  quick: {
    category: 'Sorting',
    name: 'Quick Sort',
    complexity: { time: 'O(n log n) avg.', space: 'O(log n)' },
    code: [
      'choose the last value as pivot',
      'set the boundary before the range',
      'for each value before the pivot:',
      '  if value <= pivot, move boundary',
      '  swap value with boundary value',
      'place pivot at the boundary',
      'repeat for the left and right ranges',
    ],
  },
  binary: {
    category: 'Searching',
    name: 'Binary Search',
    complexity: { time: 'O(log n)', space: 'O(1)' },
    code: [
      'low = first index; high = last index',
      'while low is not greater than high:',
      '  mid = middle of the range',
      '  if value[mid] equals target: found',
      '  if value[mid] is smaller: move low',
      '  otherwise: move high',
    ],
  },
  fcfs: {
    category: 'Operating systems',
    name: 'FCFS Scheduling',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    code: [
      'sort processes by arrival time',
      'time = 0',
      'for each process in queue:',
      '  if CPU is idle, jump to arrival',
      '  run process until it finishes',
      '  record completion time',
    ],
  },
  tcp: {
    category: 'Networking',
    name: 'TCP Handshake',
    complexity: { time: '1 round trip', space: '3 messages' },
    code: [
      'client → server: SYN',
      'server records client sequence number',
      'server → client: SYN-ACK',
      'client acknowledges server sequence',
      'client → server: ACK',
      'connection is ready for data',
    ],
  },
};

const message = (en, ta) => ({ en, ta });

function snapshot(frame) {
  return {
    ...frame,
    values: frame.values ? [...frame.values] : undefined,
    active: frame.active ? [...frame.active] : [],
    sorted: frame.sorted ? [...frame.sorted] : [],
    schedule: frame.schedule ? frame.schedule.map((item) => ({ ...item })) : undefined,
    network: frame.network ? { ...frame.network } : undefined,
  };
}

function frame(values, line, explanation, extra = {}) {
  return snapshot({ values, line, explanation, comparisons: 0, swaps: 0, ...extra });
}

function bubbleSort(values) {
  const steps = [frame(values, 0, message('Start with the input values.', 'உள்ளீட்டு மதிப்புகளுடன் தொடங்குங்கள்.'))];
  const sorted = [];
  let comparisons = 0;
  let swaps = 0;
  for (let end = values.length - 1; end > 0; end -= 1) {
    for (let index = 0; index < end; index += 1) {
      comparisons += 1;
      steps.push(frame(values, 2, message(
        `Compare ${values[index]} and ${values[index + 1]}.`,
        `${values[index]} மற்றும் ${values[index + 1]} ஐ ஒப்பிடுங்கள்.`,
      ), { active: [index, index + 1], sorted, comparisons, swaps }));
      if (values[index] > values[index + 1]) {
        [values[index], values[index + 1]] = [values[index + 1], values[index]];
        swaps += 1;
        steps.push(frame(values, 3, message(
          `${values[index + 1]} is larger, so swap the pair.`,
          `${values[index + 1]} பெரியது; ஆகவே இவற்றை இடமாற்றுங்கள்.`,
        ), { active: [index, index + 1], sorted, comparisons, swaps }));
      } else {
        steps.push(frame(values, 4, message(
          'They are already in order, so leave them as they are.',
          'அவை ஏற்கனவே சரியான வரிசையில் உள்ளன; மாற்ற வேண்டாம்.',
        ), { active: [index, index + 1], sorted, comparisons, swaps }));
      }
    }
    sorted.push(end);
    steps.push(frame(values, 5, message(
      `${values[end]} is now in its final position.`,
      `${values[end]} இப்போது அதன் இறுதி இடத்தில் உள்ளது.`,
    ), { active: [end], sorted, comparisons, swaps }));
  }
  sorted.push(0);
  steps.push(frame(values, 5, message('The array is sorted.', 'வரிசை ஒழுங்குபடுத்தப்பட்டது.'), {
    sorted, comparisons, swaps, done: true,
  }));
  return steps;
}

function insertionSort(values) {
  const steps = [frame(values, 0, message('Start with the input values.', 'உள்ளீட்டு மதிப்புகளுடன் தொடங்குங்கள்.'))];
  let comparisons = 0;
  let swaps = 0;
  for (let index = 1; index < values.length; index += 1) {
    const key = values[index];
    steps.push(frame(values, 1, message(
      `Take ${key} as the value to insert.`,
      `செருக வேண்டிய மதிப்பாக ${key} ஐ எடுத்துக்கொள்ளுங்கள்.`,
    ), { active: [index], comparisons, swaps }));
    let cursor = index - 1;
    while (cursor >= 0) {
      comparisons += 1;
      steps.push(frame(values, 2, message(
        `Compare ${key} with ${values[cursor]}.`,
        `${key} ஐ ${values[cursor]} உடன் ஒப்பிடுங்கள்.`,
      ), { active: [cursor, cursor + 1], comparisons, swaps }));
      if (values[cursor] <= key) break;
      values[cursor + 1] = values[cursor];
      swaps += 1;
      steps.push(frame(values, 3, message(
        `${values[cursor]} is larger, so shift it one place right.`,
        `${values[cursor]} பெரியது; அதை ஒரு இடம் வலப்புறம் நகர்த்துங்கள்.`,
      ), { active: [cursor, cursor + 1], comparisons, swaps }));
      cursor -= 1;
    }
    values[cursor + 1] = key;
    steps.push(frame(values, 4, message(
      `Insert ${key} into position ${cursor + 1}.`,
      `${key} ஐ ${cursor + 1} ஆம் இடத்தில் செருகுங்கள்.`,
    ), { active: [cursor + 1], comparisons, swaps }));
  }
  steps.push(frame(values, 4, message('The array is sorted.', 'வரிசை ஒழுங்குபடுத்தப்பட்டது.'), {
    sorted: values.map((_, index) => index), comparisons, swaps, done: true,
  }));
  return steps;
}

function quickSort(values) {
  const steps = [frame(values, 0, message('Start with the input values.', 'உள்ளீட்டு மதிப்புகளுடன் தொடங்குங்கள்.'))];
  const sorted = [];
  let comparisons = 0;
  let swaps = 0;
  function partition(low, high) {
    const pivot = values[high];
    let boundary = low - 1;
    steps.push(frame(values, 1, message(
      `Choose ${pivot} as the pivot.`,
      `${pivot} ஐ மைய மதிப்பாகத் தேர்ந்தெடுங்கள்.`,
    ), { active: [high], pivot: high, sorted, comparisons, swaps }));
    for (let index = low; index < high; index += 1) {
      comparisons += 1;
      steps.push(frame(values, 2, message(
        `Compare ${values[index]} with pivot ${pivot}.`,
        `${values[index]} ஐ மைய மதிப்பு ${pivot} உடன் ஒப்பிடுங்கள்.`,
      ), { active: [index], pivot: high, sorted, comparisons, swaps }));
      if (values[index] <= pivot) {
        boundary += 1;
        if (boundary !== index) {
          [values[boundary], values[index]] = [values[index], values[boundary]];
          swaps += 1;
          steps.push(frame(values, 4, message(
            `${values[boundary]} belongs before the pivot; move it left.`,
            `${values[boundary]} மைய மதிப்புக்கு முன் வரவேண்டும்; அதை இடப்புறம் நகர்த்துங்கள்.`,
          ), { active: [boundary, index], pivot: high, sorted, comparisons, swaps }));
        }
      }
    }
    const pivotIndex = boundary + 1;
    if (pivotIndex !== high) {
      [values[pivotIndex], values[high]] = [values[high], values[pivotIndex]];
      swaps += 1;
      steps.push(frame(values, 5, message(
        `Place pivot ${pivot} at index ${pivotIndex}.`,
        `மைய மதிப்பு ${pivot} ஐ ${pivotIndex} ஆம் குறியீட்டில் வையுங்கள்.`,
      ), { active: [pivotIndex], pivot: pivotIndex, sorted, comparisons, swaps }));
    }
    sorted.push(pivotIndex);
    steps.push(frame(values, 5, message(
      `${pivot} is now in its final position.`,
      `${pivot} இப்போது அதன் இறுதி இடத்தில் உள்ளது.`,
    ), { active: [pivotIndex], sorted, comparisons, swaps }));
    return pivotIndex;
  }
  function sort(low, high) {
    if (low >= high) {
      if (low === high) sorted.push(low);
      return;
    }
    const pivotIndex = partition(low, high);
    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  }
  sort(0, values.length - 1);
  steps.push(frame(values, 6, message('The array is sorted.', 'வரிசை ஒழுங்குபடுத்தப்பட்டது.'), {
    sorted: values.map((_, index) => index), comparisons, swaps, done: true,
  }));
  return steps;
}

function binarySearch(values, target) {
  const steps = [frame(values, 0, message(
    `Search for ${target} in the sorted array.`,
    `ஒழுங்குபடுத்தப்பட்ட வரிசையில் ${target} ஐத் தேடுங்கள்.`,
  ))];
  let low = 0;
  let high = values.length - 1;
  let comparisons = 0;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    comparisons += 1;
    steps.push(frame(values, 2, message(
      `The middle of indexes ${low}–${high} is ${middle}.`,
      `${low}–${high} குறியீடுகளின் நடுப்பகுதி ${middle}.`,
    ), { active: [middle], low, high, middle, comparisons }));
    if (values[middle] === target) {
      steps.push(frame(values, 3, message(
        `Found ${target} at index ${middle}.`,
        `${target} ஐ ${middle} ஆம் குறியீட்டில் கண்டுபிடித்தோம்.`,
      ), { active: [middle], low, high, middle, comparisons, result: `Found at index ${middle}`, done: true }));
      return steps;
    }
    if (values[middle] < target) {
      low = middle + 1;
      steps.push(frame(values, 4, message(
        `${values[middle]} is smaller than ${target}; discard the left half.`,
        `${values[middle]} என்பது ${target} ஐவிடச் சிறியது; இடப்பாதியை நீக்குங்கள்.`,
      ), { active: [middle], low, high, middle, comparisons }));
    } else {
      high = middle - 1;
      steps.push(frame(values, 5, message(
        `${values[middle]} is larger than ${target}; discard the right half.`,
        `${values[middle]} என்பது ${target} ஐவிடப் பெரியது; வலப்பாதியை நீக்குங்கள்.`,
      ), { active: [middle], low, high, middle, comparisons }));
    }
  }
  steps.push(frame(values, 5, message(
    `${target} is not in this array.`,
    `இந்த வரிசையில் ${target} இல்லை.`,
  ), { low, high, comparisons, result: 'Not found', done: true }));
  return steps;
}

function fcfsScheduling(processes) {
  const queue = [...processes].sort((a, b) => a.arrival - b.arrival || a.id.localeCompare(b.id));
  const steps = [snapshot({
    line: 0, explanation: message('Order the processes by arrival time.', 'வருகை நேரத்தின்படி செயல்முறைகளை வரிசைப்படுத்துங்கள்.'),
    schedule: [], current: null,
  })];
  let time = 0;
  const schedule = [];
  queue.forEach((process) => {
    if (time < process.arrival) {
      steps.push(snapshot({
        line: 3, explanation: message(
          `The CPU is idle until time ${process.arrival}.`,
          `நேரம் ${process.arrival} வரை CPU செயலற்ற நிலையில் இருக்கும்.`,
        ), schedule: [...schedule], current: null,
      }));
      time = process.arrival;
    }
    const start = time;
    time += process.duration;
    const segment = { ...process, start, end: time };
    schedule.push(segment);
    steps.push(snapshot({
      line: 4, explanation: message(
        `${process.id} runs from ${start} to ${time} and then finishes.`,
        `${process.id} செயல்முறை ${start} முதல் ${time} வரை இயங்கி முடிகிறது.`,
      ), schedule: [...schedule], current: process.id,
    }));
  });
  steps.push(snapshot({
    line: 5, explanation: message('All processes have completed.', 'அனைத்து செயல்முறைகளும் முடிந்துவிட்டன.'),
    schedule: [...schedule], current: null, done: true,
  }));
  return steps;
}

function tcpHandshake() {
  const steps = [
    snapshot({ line: 0, network: { client: 'ready', server: 'ready', message: null }, explanation: message('The client wants to open a reliable connection.', 'நம்பகமான இணைப்பைத் தொடங்க வாடிக்கையாளர் முயல்கிறார்.') }),
    snapshot({ line: 0, network: { client: 'syn-sent', server: 'ready', message: 'SYN →' }, explanation: message('The client sends SYN to request a connection.', 'இணைப்பைக் கோர வாடிக்கையாளர் SYN ஐ அனுப்புகிறார்.') }),
    snapshot({ line: 1, network: { client: 'syn-sent', server: 'syn-received', message: '← SYN-ACK' }, explanation: message('The server acknowledges the request and sends its own SYN.', 'சேவையகம் கோரிக்கையை ஏற்று தனது SYN ஐ அனுப்புகிறது.') }),
    snapshot({ line: 3, network: { client: 'established', server: 'syn-received', message: 'ACK →' }, explanation: message('The client acknowledges the server’s SYN.', 'சேவையகத்தின் SYN ஐ வாடிக்கையாளர் உறுதிப்படுத்துகிறார்.') }),
    snapshot({ line: 5, network: { client: 'established', server: 'established', message: 'Connected' }, explanation: message('Both sides are ready to exchange data.', 'இரு தரப்பும் தரவைப் பரிமாறத் தயாராக உள்ளன.'), done: true }),
  ];
  return steps;
}

export function parseNumberList(input) {
  const parts = input.split(/[,\s]+/).filter(Boolean);
  if (parts.length < 2 || parts.length > 16 || parts.some((part) => !/^-?\d+$/.test(part))) {
    throw new Error('Enter 2–16 whole numbers separated by commas or spaces.');
  }
  const values = parts.map(Number);
  if (values.some((value) => !Number.isSafeInteger(value) || Math.abs(value) > 999)) {
    throw new Error('Numbers must be whole values between -999 and 999.');
  }
  return values;
}

export function parseProcesses(input) {
  const rows = input.split(',').map((part) => part.trim()).filter(Boolean);
  if (rows.length < 2 || rows.length > 8) throw new Error('Enter 2–8 processes as P1:duration, P2:duration.');
  const processes = rows.map((row, index) => {
    const match = row.match(/^([A-Za-z][A-Za-z0-9]*):(\d+)(?:@(\d+))?$/);
    if (!match) throw new Error('Use the format P1:duration or P1:duration@arrival, separated by commas.');
    return { id: match[1], duration: Number(match[2]), arrival: Number(match[3] || 0), order: index };
  });
  if (processes.some((process) => process.duration < 1 || process.duration > 20 || process.arrival > 20)) {
    throw new Error('Durations must be 1–20 and arrival times 0–20.');
  }
  if (new Set(processes.map(({ id }) => id.toLowerCase())).size !== processes.length) {
    throw new Error('Process names must be unique.');
  }
  return processes;
}

export function generateFrames(algorithmId, input = {}) {
  if (!ALGORITHMS[algorithmId]) throw new Error(`Unknown algorithm: ${algorithmId}`);
  if (algorithmId === 'tcp') return tcpHandshake();
  if (algorithmId === 'fcfs') return fcfsScheduling(input.processes || []);
  const values = [...(input.values || [])];
  if (values.length < 2 || values.length > 16) throw new Error('Use an array of 2–16 values.');
  if (algorithmId === 'bubble') return bubbleSort(values);
  if (algorithmId === 'insertion') return insertionSort(values);
  if (algorithmId === 'quick') return quickSort(values);
  if (!values.every((value, index) => index === 0 || values[index - 1] <= value)) {
    throw new Error('Binary Search needs an array sorted from smallest to largest.');
  }
  if (!Number.isInteger(input.target)) throw new Error('Enter a whole number to search for.');
  return binarySearch(values, input.target);
}
