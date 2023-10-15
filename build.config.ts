import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: [
    'vite',
    'del'
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})