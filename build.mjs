import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const output = join(root, 'dist');

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'core.js']) {
  if (!existsSync(join(root, file))) throw new Error(`Build input is missing: ${file}`);
  cpSync(join(root, file), join(output, file));
}
console.log(`Built Learning Visualizer into ${output}`);
