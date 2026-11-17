# Learning Visualizer

**Big ideas, made visible.** A small, bilingual learning lab for watching algorithms, operating-system scheduling, and network protocols run step by step.

- Play, pause, step forward and back, reset, and adjust playback speed
- Explore Bubble, Insertion, and Quick Sort; Binary Search; FCFS scheduling; and the TCP handshake
- Enter custom arrays, search targets, or process arrival/burst times
- Follow highlighted pseudocode and concise English or Tamil explanations
- Share an input-specific link; switch between light and dark themes
- Responsive layout, no framework or runtime dependencies

## Run locally

Requires Node.js 20 or newer. From this folder:

```sh
npm start
```

Open [http://localhost:8080](http://localhost:8080).

## Test and build

```sh
npm test
npm run build
```

The static site is written to `dist/`. GitHub Actions runs the tests and publishes that folder to GitHub Pages.

## Contribute an algorithm

Start with [`docs/adding-an-algorithm.md`](docs/adding-an-algorithm.md). Algorithm code should create replayable frames, not draw or animate the interface directly. This lets the player move both forward and backward and keeps the core logic testable.

## License

MIT. See [`LICENSE`](LICENSE).
