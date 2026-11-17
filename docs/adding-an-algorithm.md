# Add an algorithm

The visualizer keeps algorithm logic separate from the page. A module creates immutable frame snapshots; the player selects a snapshot, and the renderer draws it.

## 1. Add a frame generator

In `core.js`, add metadata to `ALGORITHMS` and a pure generator that returns an array of frames. A frame can include:

- `values`, `active`, `sorted`, and `pivot` for array visualizations
- `line` for the zero-based pseudocode line to highlight
- `explanation: { en, ta }` for accessible, bilingual step descriptions
- `comparisons`, `swaps`, and `done` for playback statistics

Copy input arrays before changing them. Use the existing `frame` or `snapshot` helpers so each step preserves its own state.

## 2. Connect and render it

Add the option to `index.html`, then route its ID in `generateFrames` in `core.js`. For a new visualization shape, add a renderer in `app.js` and show it from `renderAlgorithmInfo` and `renderFrame`. Keep values and messages in DOM text nodes rather than inserting user input as HTML.

## 3. Add a test

Add tests in `tests/core.test.js` for the final result, representative intermediate frames, invalid inputs, and any frame data your renderer relies on.

Run `npm test` and `npm run build` before opening a pull request.
