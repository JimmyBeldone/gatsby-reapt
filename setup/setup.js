const rimraf = require('rimraf');
const chalk = require('chalk');
const replace = require('replace');
const prompt = require('prompt');

const prompts = require('./setupPrompts');

const chalkSuccess = chalk.green;
const chalkProcessing = chalk.blue;
const chalkWarn = chalk.red;

/* eslint-disable no-console */

console.log(chalkSuccess('Dependencies installed.'));

prompt.colors = false;
prompt.start();

console.log(chalkWarn('WARNING:  Preparing to delete local git repository...'));
prompt.get(
    [{ name: 'deleteGit', description: 'Delete the git repository?  [Y/n]' }],
    (err, result) => {
        const deleteGit = result.deleteGit.toUpperCase();

        if (err) {
            process.exit(1);
        }

        const updatePackage = () => {
            console.log(chalkProcessing('Updating package.json settings:'));

            prompt.get(prompts, (err, result) => {
                // parse user responses
                // default values provided for fields that will cause npm to complain if left empty
                const responses = [
                    {
                        key: 'name',
                        value: result.projectName || 'new-project',
                    },
                    {
                        key: 'version',
                        value: result.version || '0.1.0',
                    },
                    {
                        key: 'author',
                        value:
                            result.author ||
                            'Jimmy Beldone <dev.jimmy.beldone@gmail.com>',
                    },
                    {
                        key: 'license',
                        value: result.license || 'MIT',
                    },
                    {
                        key: 'description',
                        value: result.description || '',
                    },
                    // simply use an empty URL here to clear the existing repo URL
                    {
                        key: 'url',
                        value: '',
                    },
                ];

                // update package.json with the user's values
                responses.forEach(res => {
                    replace({
                        regex: `("${res.key}"): "(.*?)"`,
                        replacement: `$1: "${res.value}"`,
                        paths: ['package.json'],
                        recursive: false,
                        silent: true,
                    });
                });

                // reset package.json 'keywords' field to empty state
                replace({
                    regex: /"keywords": \[[\s\S]+?\]/,
                    replacement: `"keywords": []`,
                    paths: ['package.json'],
                    recursive: false,
                    silent: true,
                });

                // remove setup script from package.json
                replace({
                    regex: /\s*"setup":.*,/,
                    replacement: '',
                    paths: ['package.json'],
                    recursive: false,
                    silent: true,
                });

                if (err) {
                    console.log(chalkWarn(err));
                }

                // remove all setup scripts from the 'tools' folder
                console.log(chalkSuccess('\nSetup complete! Cleaning up...\n'));
                rimraf('./setup', error => {
                    if (error) throw new Error(error);
                });
            });
        };

        if (deleteGit.match(/^N.*/)) {
            updatePackage();
        } else {
            // remove the original git repository
            rimraf('.git', error => {
                if (error) throw new Error(error);
                console.log(chalkSuccess('Original Git repository removed.\n'));
                updatePackage();
            });
        }
    },
);