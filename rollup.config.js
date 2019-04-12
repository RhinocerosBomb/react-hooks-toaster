import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

export default {
  input: 'src/lib/index.js',
  output: {
    file: 'dist/cjs.js',
    format: 'cjs'
  },
  external: ['react', 'reactDOM', 'crypto', 'uuidv4', 'react-transition-group'],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    postcss({
      modules: true
    }),
    sizeSnapshot(),
    commonjs({
      include: 'node_modules/**'
    })
  ]
};
