import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
    input: './index.js',
    output: {
        file: './dist/bundle.js',
        format: 'cjs',
    },
    plugins: [
        nodePolyfills(),
        resolve(),
        commonjs(),
        json(),
        // terser()
    ],
};
