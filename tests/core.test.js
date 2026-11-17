import test from 'node:test';
import assert from 'node:assert/strict';
import { ALGORITHMS, generateFrames, parseNumberList, parseProcesses } from '../core.js';

const last = (frames) => frames.at(-1);

test('all sorting visualizers produce a sorted final frame without mutating input', () => {
  const input = [9, 4, 7, 2, 8, 1];
  for (const id of ['bubble', 'insertion', 'quick']) {
    const frames = generateFrames(id, { values: input });
    assert.deepEqual(last(frames).values, [1, 2, 4, 7, 8, 9], id);
    assert.equal(last(frames).done, true, id);
    assert.deepEqual(input, [9, 4, 7, 2, 8, 1], `${id} must not mutate its input`);
    assert.ok(frames.every((step) => step.explanation.en && step.explanation.ta), `${id} has bilingual explanations`);
  }
});

test('sorting frames are independent snapshots', () => {
  const frames = generateFrames('bubble', { values: [2, 1] });
  const firstFrame = frames[0].values;
  frames[1].values[0] = 100;
  assert.deepEqual(firstFrame, [2, 1]);
});

test('binary search reports a match and an absent value', () => {
  const found = generateFrames('binary', { values: [2, 5, 8, 12, 18, 24], target: 18 });
  assert.equal(last(found).result, 'Found at index 4');
  assert.equal(last(found).comparisons, 2);

  const absent = generateFrames('binary', { values: [2, 5, 8, 12, 18, 24], target: 7 });
  assert.equal(last(absent).result, 'Not found');
  assert.ok(last(absent).comparisons > 0);
});

test('binary search rejects unsorted input', () => {
  assert.throws(() => generateFrames('binary', { values: [2, 9, 4], target: 4 }), /sorted/);
});

test('FCFS records process completion and idle time', () => {
  const processes = parseProcesses('P1:3@2, P2:2@0');
  const frames = generateFrames('fcfs', { processes });
  const finished = last(frames).schedule;
  assert.deepEqual(finished.map(({ id, start, end }) => [id, start, end]), [
    ['P2', 0, 2],
    ['P1', 2, 5],
  ]);
  assert.equal(last(frames).done, true);

  const idleStart = generateFrames('fcfs', { processes: parseProcesses('P1:1@3, P2:1@4') })[1];
  assert.match(idleStart.explanation.en, /idle until time 3/);
});

test('TCP handshake has the three expected messages and ends connected', () => {
  const frames = generateFrames('tcp');
  assert.deepEqual(frames.slice(1, 4).map(({ network }) => network.message), ['SYN →', '← SYN-ACK', 'ACK →']);
  assert.equal(last(frames).network.client, 'established');
  assert.equal(last(frames).network.server, 'established');
});

test('input parsers validate values, limits, and unique process identifiers', () => {
  assert.deepEqual(parseNumberList('4, -2 9'), [4, -2, 9]);
  assert.throws(() => parseNumberList('1, 2.5'), /whole numbers/);
  assert.throws(() => parseNumberList('1000, 1'), /between -999 and 999/);
  assert.throws(() => parseProcesses('P1:2, p1:4'), /unique/);
  assert.throws(() => parseProcesses('P1:2'), /2–8 processes/);
});

test('metadata is available for every selectable visualizer', () => {
  assert.deepEqual(Object.keys(ALGORITHMS), ['bubble', 'insertion', 'quick', 'binary', 'fcfs', 'tcp']);
  for (const info of Object.values(ALGORITHMS)) {
    assert.ok(info.code.length > 0);
    assert.ok(info.complexity.time && info.complexity.space);
  }
});
