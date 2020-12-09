/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const prompts = require('prompts');
const replace = require('replace');
const rimraf = require('rimraf');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { log } = require('./constants');
const questions = require('./setupPrompts');
const {
    cancelMessage,
    cleanUpMessage,
    finalMessage,
    gitDeleteMessage,
    gitNoDeleteMessage,
    intalledMessage,
    pkgAllSetMessage,
    pkgIntroMesage,
} = require('./messages');

const chalkBold = chalk.bold.white;

const writeMessage = (msg) => log(chalkBold(msg));

writeMessage(intalledMessage);

const onCancel = () => {
    writeMessage(cancelMessage);
    return false;
};

const pkgJsonPathPrefix = process.env.MODE === 'test' ? 'setupCopy/' : '';
const setupPath = process.env.MODE === 'test' ? './setupCopy' : './setup';

// Update package.json
const updatePackage = async () => {
    writeMessage(pkgIntroMesage);

    const responses = await prompts(questions, { onCancel });

    const values = Object.keys(responses).map((item) => ({
        key: item,
        value: responses[item],
    }));

    // simply use an empty URL here to clear the existing repo URL
    values.push({
        key: 'url',
        value: 'https://github.com/username/repo',
    });

    // update package.json with the user's values
    values.forEach((res) => {
        replace({
            paths: [`${pkgJsonPathPrefix}package.json`],
            recursive: false,
            regex: `("${res.key}"): "(.*?)"`,
            replacement: `$1: "${res.value}"`,
            silent: true,
        });
    });

    // reset package.json 'keywords' field to empty state
    replace({
        paths: [`${pkgJsonPathPrefix}package.json`],
        recursive: false,
        regex: /"keywords": \[[\s\S]+?\]/,
        replacement: `"keywords": []`,
        silent: true,
    });

    // remove setup script from package.json
    replace({
        paths: [`${pkgJsonPathPrefix}package.json`],
        recursive: false,
        regex: /\s*"setup":.*,/,
        replacement: '',
        silent: true,
    });

    replace({
        paths: [`${pkgJsonPathPrefix}package.json`],
        recursive: false,
        regex: /\s*"setup:test":.*,/,
        replacement: '',
        silent: true,
    });

    replace({
        paths: [`${pkgJsonPathPrefix}package.json`],
        recursive: false,
        regex: /\s*"setup:test:init":.*,/,
        replacement: '',
        silent: true,
    });

    replace({
        paths: [`${pkgJsonPathPrefix}package.json`],
        recursive: false,
        regex: /\s*"setup:copy":.*,/,
        replacement: '',
        silent: true,
    });

    writeMessage(pkgAllSetMessage);

    // message cleanup
    writeMessage(cleanUpMessage);

    // Remove setup dependencies
    async function cleanDeps() {
        const { stdout } = await exec('yarn remove chalk prompts replace -D');
        console.log('stdout:', stdout);
    }
    cleanDeps().then(() => {
        writeMessage(finalMessage);

        // remove all setup scripts from the 'tools' folder
        rimraf(setupPath, (rmError) => {
            if (rmError) throw new Error(rmError);
        });
    });

    // writeMessage(finalMessage);

    // // remove all setup scripts from the 'tools' folder
    // rimraf(setupPath, (rmError) => {
    //     if (rmError) throw new Error(rmError);
    // });
};

// Initialize prompt
// eslint-disable-next-line consistent-return
(async () => {
    const deleteGit = await prompts(
        {
            initial: true,
            message: 'Delete the git repository?  [Y/n]',
            name: 'value',
            type: 'confirm',
        },
        { onCancel },
    );

    if (deleteGit.value !== undefined) {
        if (deleteGit.value) {
            if (process.env.MODE === 'test') {
                writeMessage(gitDeleteMessage);
                updatePackage();
            } else {
                rimraf('.git', (error) => {
                    if (error) throw new Error(error);
                    writeMessage(gitDeleteMessage);
                    updatePackage();
                });
            }
        } else {
            writeMessage(gitNoDeleteMessage);
            updatePackage();
        }
    } else {
        return null;
    }
})();
