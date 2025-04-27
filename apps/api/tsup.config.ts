import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  minify: true,
  target: 'esnext',
  outDir: 'dist',
  treeshake: true,
  ...options
}))
