/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const { icons, log, unicode } = require('./constants');

const chalkBold = chalk.bold.white;
const chalkBg = chalk.bgGreen;

export const cancelMessage = () =>
    log(`

Not ready, I get it. Maybe next time !  ${unicode(icons.wink)}

`);

export const intalledMessage = () =>
    log(`
${chalkBold(` ${unicode(icons.check)}  Alright ! Dependencies installed ! \n`)}
${chalkBold(
    ` ${unicode(icons.trash)}  Preparing to delete local git repository...`,
)}
`);

export const pkgIntroMesage = () =>
    log(
        chalkBold(
            ` ${unicode(icons.tree)}  Now let's pimp your package.json file \n`,
        ),
    );

export const finalMessage = () =>
    log(
        chalkBold(`
${unicode(icons.check)}  Your package.json is set !


${chalkBg('                                         ')}


${unicode(icons.rocket)}  Gatsby Stater Lemonade Initialized ${unicode(
            icons.lemon,
        )}

${unicode(icons.biceps)}  Go build something great !


${chalkBg('                                         ')}

`),
    );

export const gitDeleteMessage = () =>
    log(
        chalkBold(
            ` \n ${unicode(
                icons.check,
            )}  Original Git repository removed ! \n `,
        ),
    );

export const gitNoDeleteMessage = () =>
    log(
        chalkBold(
            `\n ${unicode(icons.cross)}  Git repository won't be removed  \n `,
        ),
    );
