import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, access, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { build } from 'vite'
import CleanBuild from 'vite-plugin-clean-build'

async function fixture(t) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'clean-build-test-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  const root = path.join(dir, 'app')
  await mkdir(path.join(root, 'public/images'), { recursive: true })
  await writeFile(path.join(root, 'index.html'), '<html><body>Test</body></html>')
  for (const name of ['images/logo.png', 'images/remove.png', '.remove']) {
    await writeFile(path.join(root, 'public', name), 'fixture')
  }
  return { dir, root }
}

const exists = async file => {
  try { await access(file); return true } catch (error) {
    if (error.code === 'ENOENT') return false
    throw error
  }
}

for (const outDir of ['dist', 'release', 'absolute']) {
  test(`cleans resolved ${outDir} output and preserves exclusions`, async t => {
    const { dir, root } = await fixture(t)
    const output = outDir === 'absolute' ? path.join(dir, 'output') : outDir
    await build({
      configFile: false, root, logLevel: 'silent',
      build: { outDir: output, emptyOutDir: true },
      plugins: [CleanBuild({ patterns: ['images/**', '!images', '!images/logo.png', '.remove'] })],
    })
    const target = path.resolve(root, output)
    assert.equal(await exists(path.join(target, 'images/remove.png')), false)
    assert.equal(await exists(path.join(target, '.remove')), false)
    assert.equal(await exists(path.join(target, 'images/logo.png')), true)
    assert.equal(await exists(path.join(target, 'index.html')), true)
  })
}

for (const absolute of [false, true]) {
  test(`explicit ${absolute ? 'absolute' : 'relative'} outputDir keeps its meaning`, async t => {
    const { dir, root } = await fixture(t)
    const target = path.join(dir, 'explicit')
    await mkdir(target)
    await writeFile(path.join(target, 'remove.txt'), 'fixture')
    await build({
      configFile: false, root, logLevel: 'silent',
      plugins: [CleanBuild({
        outputDir: absolute ? target : path.relative(process.cwd(), target),
        patterns: ['remove.txt'],
      })],
    })
    assert.equal(await exists(path.join(target, 'remove.txt')), false)
    assert.equal(await exists(path.join(root, 'dist/images/remove.png')), true)
  })
}

test('empty patterns do not delete files', async t => {
  const { root } = await fixture(t)
  await build({ configFile: false, root, logLevel: 'silent', plugins: [CleanBuild()] })
  assert.equal(await exists(path.join(root, 'dist/images/remove.png')), true)
})

test('explicit undefined options use defaults and stay quiet', async t => {
  const { root } = await fixture(t)
  const logs = t.mock.method(console, 'log', () => {})
  await build({
    configFile: false, root, logLevel: 'silent',
    plugins: [CleanBuild({ outputDir: undefined, patterns: undefined, verbose: undefined })],
  })
  assert.equal(await exists(path.join(root, 'dist/images/remove.png')), true)
  assert.equal(logs.mock.callCount(), 0)
})

test('verbose logs deleted directory paths', async t => {
  const { root } = await fixture(t)
  const logs = t.mock.method(console, 'log', () => {})
  await build({
    configFile: false, root, logLevel: 'silent',
    plugins: [CleanBuild({ patterns: ['images'], verbose: true })],
  })
  const target = path.join(root, 'dist/images')
  assert.equal(await exists(target), false)
  assert.deepEqual(logs.mock.calls.map(call => call.arguments[0]), [
    `[vite-plugin-clean-build] Removed 1 path:\n  - ${target}`,
  ])
})

test('verbose logs when no files match', async t => {
  const { root } = await fixture(t)
  const logs = t.mock.method(console, 'log', () => {})
  await build({
    configFile: false, root, logLevel: 'silent',
    plugins: [CleanBuild({ patterns: ['missing.txt'], verbose: true })],
  })
  assert.equal(await exists(path.join(root, 'dist/images/remove.png')), true)
  assert.deepEqual(logs.mock.calls.map(call => call.arguments[0]), [
    '[vite-plugin-clean-build] No matching paths found.',
  ])
})

test('outside paths are protected and cleanup errors remain non-fatal', async t => {
  const { root } = await fixture(t)
  const outside = path.join(root, 'keep.txt')
  await writeFile(outside, 'keep')
  const errors = t.mock.method(console, 'error', () => {})
  await build({
    configFile: false, root, logLevel: 'silent',
    plugins: [CleanBuild({ patterns: ['../keep.txt'] })],
  })
  assert.equal(await exists(outside), true)
  assert.equal(errors.mock.callCount(), 1)
  assert.match(errors.mock.calls[0].arguments[0], /^\[vite-plugin-clean-build\] Cleanup failed:/)
})
