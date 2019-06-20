module.exports = {
    general: {
        lang: `lang`,
    },
    demo: {
        meta: {
            title: `Reapt Gatsby Starter`,
            titleAlt: `Reapt GatsbyJS Starter`,
            description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
            author: `@JimmyBeldone`,
        },
        home: {
            headerTitle: `Home`,
            hello: `Hello`,
            welcome: `Welcome to your new Gatsby site.`,
            now: `Now go build something great.`,
            link: `Go to page 2`,
        },
        page2: {
            headerTitle: `Page 2`,
            hello: `Hi from the second page`,
            welcome: `Welcome to page 2`,
            link: `Go back to the homepage`,
        },
        about: {
            headerTitle: `About`,
            title: `About`,
            welcome: `Welcome to page About`,
            link: `Go back to the homepage`,
        },
        ml: {
            headerTitle: `Legal notices`,
            title: `Legal notices`,
        },
        p404: {
            headerTitle: `404: Not found`,
            title: `NOT FOUND`,
            description: `You just hit a route that doesn't exist... the sadness.`,
        },
        footer: {
            built: `Built with`,
        },
    },
    nav: {
        home: `Home`,
        page2: `Page 2`,
        login: `Log In`,
        register: `Sign Up`,
        about: `About`,
        logout: `Log out`,
        ml: `Legal Notices`,
    },
    home: {
        hello: `hello`,
        content: {
            test: `content`,
        },
    },
    pages: {
        register: {
            title: `Sign Up`,
            fields: {
                username: `Username`,
                email: `Email`,
                password: `Password`,
                confirmPass: `Confirm password`,
            },
            link: {
                text: `Already have an account?`,
                btn: `Log in`,
            },
            btn: `sign up`,
        },
        login: {
            title: `Log in`,
            fields: {
                login: `Email`,
                pw: `Password`,
            },
            link: `Forgot password ?`,
            btn: `Log In`,
        },
        forgottenPassword: {
            title: `Reset your password`,
            infos: `You will receive en email with a link to set your new password`,
            button: `Send me an email`,
            success: `You just received an email`,
        },
        resetPassword: {
            button: `Reset your password`,
            userNotFound: `Utilisateur introuvable avec cette adresse email`,
        },
    },
    modals: {
        default: {
            title: `Example modal title`,
        },
    },
    errors: {
        emptyField: `Field {{field}} is empty`,
        invalidEmail: `Invalid mail format`,
        identical: `Old password equals new password`,
        notIdentical: `Password are not equals`,
        wrongPassword: `Incorrect old password`,
        wrongCredentials: `Wrong credentials`,
        tokenNotFound: `Cannot find token`,
        passwordNotFound: `Unregistered password`,
        userNotFoundWithToken: `Cannot find any user with this token`,
    },
};
