const { src, dest, series, parallel } = require('gulp');
const path = require('path');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');

const config = require('./config.json');

function htmlTask() {
    return src(config.html.src, {
        cwd: config.src_base
    })
    .pipe(dest(config.dest_base));
}

function typescriptTask() {
    return rollup.rollup({
        input: path.join(config.src_base, config.typescript.src),
        plugins: [
            resolve({
                main: true,
                browser: true
            }),
            typescript()
        ]
    }).then(bundle => {
        return bundle.write({
            file: path.join(config.dest_base, config.typescript.dest),
            format: 'umd',
            name: 'library',
            sourcemap: true
        });
    });
}

exports.typescriptTask = typescriptTask;

exports.default = parallel(
    htmlTask,
    typescriptTask
);
