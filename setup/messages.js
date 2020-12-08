/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const { icons, unicode } = require('./constants');

const chalkBg = chalk.bgGreen;

const cancelMessage = `

Not ready, I get it. Maybe next time !  ${unicode(icons.wink)}

`;

const intalledMessage = `
${unicode(icons.check)}  Alright ! Dependencies installed ! \n
${unicode(icons.trash)}  Preparing to delete local git repository...
`;

const pkgIntroMesage = `${unicode(
    icons.tree,
)}  Now let's pimp your package.json file \n`;

const finalMessage = `
${unicode(icons.check)}  Your package.json is set !


${chalkBg('                                         ')}


${unicode(icons.rocket)}  Gatsby Reapt Initialized ${unicode(icons.lemon)}

${unicode(icons.biceps)}  Go build something great !


${chalkBg('                                         ')}

`;

const gitDeleteMessage = `\n${unicode(
    icons.check,
)}  Original Git repository removed ! \n `;

const gitNoDeleteMessage = `\n${unicode(
    icons.cross,
)}  Git repository won't be removed  \n `;

module.exports = {
    cancelMessage,
    finalMessage,
    gitDeleteMessage,
    gitNoDeleteMessage,
    intalledMessage,
    pkgIntroMesage,
};
