import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';

export default {
    input: './index.js',
    output: {
        file: './dist/bundle.js',
        format: 'cjs',
    },
    plugins: [
        resolve({
            preferBuiltins: true,
        }),
        commonjs(),
        json(),
        // terser()
    ],
};
