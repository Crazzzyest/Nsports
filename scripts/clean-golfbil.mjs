import sharp from "sharp"

const input = "public/bilder/produkter/golfbil.jpg"
const output = "public/bilder/produkter/golfbil.png"

const img = sharp(input)
const { width, height } = await img.metadata()
const { data } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true })

const idx = (x, y) => (y * width + x) * 4

// A pixel counts as background if it's bright and near-neutral (gray/white),
// which matches the soft shadow and paper backdrop but not the car.
const isBackground = (i) => {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return min > 170 && max - min < 28
}

const visited = new Uint8Array(width * height)
const stack = []

const pushIfBg = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return
  const p = y * width + x
  if (visited[p]) return
  visited[p] = 1
  if (isBackground(idx(x, y))) stack.push(x, y)
}

// Seed from every border pixel.
for (let x = 0; x < width; x++) {
  pushIfBg(x, 0)
  pushIfBg(x, height - 1)
}
for (let y = 0; y < height; y++) {
  pushIfBg(0, y)
  pushIfBg(width - 1, y)
}

while (stack.length) {
  const y = stack.pop()
  const x = stack.pop()
  const i = idx(x, y)
  data[i] = 255
  data[i + 1] = 255
  data[i + 2] = 255
  pushIfBg(x + 1, y)
  pushIfBg(x - 1, y)
  pushIfBg(x, y + 1)
  pushIfBg(x, y - 1)
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .png()
  // Trim the surrounding white so the car fills the frame, keeping a small margin.
  .trim({ background: "#ffffff", threshold: 12 })
  .extend({ top: 24, bottom: 24, left: 24, right: 24, background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .toFile(output)

console.log(`[v0] wrote ${output} (${width}x${height})`)
