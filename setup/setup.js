/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const prompts = require('prompts');
const replace = require('replace');
const rimraf = require('rimraf');

const { log } = require('./constants');
const questions = require('./setupPrompts');
const {
    cancelMessage,
    finalMessage,
    gitDeleteMessage,
    gitNoDeleteMessage,
    intalledMessage,
    pkgIntroMesage,
} = require('./messages');

const chalkBold = chalk.bold.white;

const writeMessage = (msg) => log(chalkBold(msg));

writeMessage(intalledMessage);

const onCancel = () => {
    cancelMessage();
    return false;
};

// Update package.json
const updatePackage = async () => {
    writeMessage(pkgIntroMesage);

    const responses = await prompts(questions);

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
            paths: ['package.json'],
            recursive: false,
            regex: `("${res.key}"): "(.*?)"`,
            replacement: `$1: "${res.value}"`,
            silent: true,
        });
    });

    // reset package.json 'keywords' field to empty state
    replace({
        paths: ['package.json'],
        recursive: false,
        regex: /"keywords": \[[\s\S]+?\]/,
        replacement: `"keywords": []`,
        silent: true,
    });

    // remove setup script from package.json
    replace({
        paths: ['package.json'],
        recursive: false,
        regex: /\s*"setup":.*,/,
        replacement: '',
        silent: true,
    });

    writeMessage(finalMessage);

    // remove all setup scripts from the 'tools' folder
    rimraf('./setup', (error) => {
        if (error) throw new Error(error);
    });
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
            rimraf('.git', (error) => {
                if (error) throw new Error(error);

                writeMessage(gitDeleteMessage);
                updatePackage();
            });
        } else {
            writeMessage(gitNoDeleteMessage);
            updatePackage();
        }
    } else {
        return null;
    }
})();
