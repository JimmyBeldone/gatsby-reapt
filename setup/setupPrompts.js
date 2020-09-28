// Define prompts for use with npm 'prompt' module in setup script
module.exports = [
    {
        description: 'Project name (default: new-project)',
        message:
            'Limited to: lowercase letters, numbers, period, hyphen, ' +
            'underscore, and tilde; cannot begin with period or underscore.',
        name: 'projectName',
        pattern: /^[^._][a-z0-9-_~]+$/,
    },
    {
        description: 'Version (default: 0.1.0)',
        name: 'version',
    },
    {
        description:
            'Author (default: Jimmy Beldone <dev.jimmy.beldone@gmail.com>)',
        name: 'author',
    },
    {
        description: 'License (default: MIT)',
        name: 'license',
    },
    {
        description: 'Project description',
        name: 'description',
    },
];
