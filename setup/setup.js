/* eslint-disable import/no-extraneous-dependencies */
const prompts = require('prompts');
const replace = require('replace');
const rimraf = require('rimraf');

const questions = require('./setupPrompts');
const {
    cancelMessage,
    finalMessage,
    gitDeleteMessage,
    gitNoDeleteMessage,
    intalledMessage,
    pkgIntroMesage,
} = require('./messages');

intalledMessage();

const onCancel = () => {
    cancelMessage();
    return false;
};

// Update package.json
const updatePackage = async () => {
    pkgIntroMesage();

    const responses = await prompts(questions);

    const values = [
        {
            key: 'name',
            value: responses.projectName,
        },
        {
            key: 'version',
            value: responses.version,
        },
        {
            key: 'author',
            value: responses.author,
        },
        {
            key: 'license',
            value: responses.license,
        },
        {
            key: 'description',
            value: responses.description,
        },
        // simply use an empty URL here to clear the existing repo URL
        {
            key: 'url',
            value: 'https://github.com/username/repo',
        },
    ];

    // update package.json with the user's values
    values.forEach((res) => {
        replace({
            paths: ['setup/package.json'],
            recursive: false,
            regex: `("${res.key}"): "(.*?)"`,
            replacement: `$1: "${res.value}"`,
            silent: true,
        });
    });

    // reset package.json 'keywords' field to empty state
    replace({
        paths: ['setup/package.json'],
        recursive: false,
        regex: /"keywords": \[[\s\S]+?\]/,
        replacement: `"keywords": []`,
        silent: true,
    });

    // remove setup script from package.json
    replace({
        paths: ['setup/package.json'],
        recursive: false,
        regex: /\s*"setup":.*,/,
        replacement: '',
        silent: true,
    });

    finalMessage();

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

                gitDeleteMessage();
                updatePackage();
            });
            updatePackage();
        } else {
            gitNoDeleteMessage();
            updatePackage();
        }
    } else {
        return null;
    }
})();
