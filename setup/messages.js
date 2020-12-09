/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const { icons, unicode } = require('./constants');

const chalkBg = chalk.bgGreen;

const cancelMessage = `

Not ready, I get it. Maybe next time !  ${unicode(icons.wink)}

`;

const intalledMessage = `
${unicode(icons.check)}  Alright ! Dependencies installed !

${chalkBg('                                         ')}


${unicode(icons.trash)}  Preparing to delete local git repository...\n
`;

const pkgIntroMesage = `
${chalkBg('                                         ')}


${unicode(icons.tree)}  Now let's pimp your package.json file \n
`;

const pkgAllSetMessage = `\n${unicode(
    icons.check,
)}  Your package.json is set !\n`;

const cleanUpMessage = `
${chalkBg('                                         ')}


${unicode(icons.broom)}  Cleaning up setup files... \n\n`;

const finalMessage = `
${chalkBg('                                         ')}


${unicode(icons.check)}  Gatsby Reapt Initialized ${unicode(icons.lemon)}

${unicode(icons.biceps)}  Go build something great !


${chalkBg('                                         ')}


${unicode(icons.rocket)}  Starting server ...

`;

const gitDeleteMessage = `\n${unicode(
    icons.check,
)}  Original Git repository removed ! \n `;

const gitNoDeleteMessage = `\n${unicode(
    icons.cross,
)}  Git repository won't be removed  \n `;

module.exports = {
    cancelMessage,
    cleanUpMessage,
    finalMessage,
    gitDeleteMessage,
    gitNoDeleteMessage,
    intalledMessage,
    pkgAllSetMessage,
    pkgIntroMesage,
};
