const path = require('path');
const glob = require('glob');
const fse = require('fs-extra');

function copyTypings(from, to) {
    const files = glob.sync('**/*.d.ts', {cwd: from});
    const cmds = files.map((file) => fse.copy(path.resolve(from, file), path.resolve(to, file)));
    return Promise.all(cmds);
}

function copyScss(from, to) {
    const files = glob.sync('**/*.scss', {cwd: from});
    const cmds = files.map((file) => fse.copy(path.resolve(from, file), path.resolve(to, file)));
    return Promise.all(cmds);
}

function copyFonts(from, to) {
    const files = glob.sync('**/*', {cwd: from});
    const cmds = files.map((file) => fse.copy(path.resolve(from, file), path.resolve(to, file)));
    return Promise.all(cmds);
}

function copypkg(from, to) {
    return fse.copy(from, to);
}

Promise.all([
    copyTypings(path.resolve(__dirname, '../src'), path.resolve(__dirname, '../lib')),
    copyFonts(path.resolve(__dirname, '../src/assets/fonts'), path.resolve(__dirname, '../lib/fonts')),
    copyScss(path.resolve(__dirname, '../src/assets'), path.resolve(__dirname, '../lib')),
    copypkg(path.resolve(__dirname, '../package.json'), path.resolve(__dirname, '../lib/package.json')),
]);
