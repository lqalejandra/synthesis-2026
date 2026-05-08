import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dir = join(__dirname, '../src/data/students-chunks')
const files = readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .sort()

const merged = []
for (const f of files) {
  const chunk = JSON.parse(readFileSync(join(dir, f), 'utf8'))
  if (!Array.isArray(chunk)) throw new Error(`${f} must be a JSON array`)
  merged.push(...chunk)
}

writeFileSync(
  join(__dirname, '../src/data/students.json'),
  `${JSON.stringify(merged, null, 2)}\n`,
)

console.error(`Wrote ${merged.length} students to src/data/students.json`)
