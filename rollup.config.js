import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {uglify} from 'rollup-plugin-uglify';

export default {
  entry: 'src/imagvue.js',
  dest: 'dist/imagvue.js',
  moduleName: 'imagvue',
  format: 'umd',
  plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
      babel({
          exclude: 'node_modules/**',
      }),
      uglify()
  ],
}