module.exports = {
    general: {
        lang: "langue"
    },
    demo: {
        meta: {
            title: "Reapt Gatsby Starter",
            description: `description du site en fr`,
            author: `@JimmyBeldone`
        },
        home: {
            headerTitle: "Acceuil",
            hello: "Bonjour",
            welcome: "Bienvenue sur ton nouveaux site Gatsby",
            now: "Maintenant construis quelque chose de grand",
            link: "Aller à la page 2"
        },
        page2: {
            headerTitle: "Page 2",
            hello: "Salut depuis la seconde page",
            welcome: "Bienvenue sur la page 2",
            link: "Retourner à l'acceuil"
        },
        about: {
            headerTitle: "a propos",
            welcome: "Bienvenue dans la page à propos",
            link: "Retourner à l'acceuil"
        },
        p404: {
            headerTitle: "404: Not found",
            title: "404: Not found",
            description: "Cette page n'existe pas... Désolé"
        },
        footer: {
            built: "Construit avec"
        }
    },
    nav: {
        home: "Accueil",
        page2: "Page 2",
        login: "Connexion",
        register: "Inscription",
        about: "À Propos",
        logout: "Deconnexion"
    },
    home: {
        hello: "bonjour",
        content: {
            test: "contenu"
        }
    },
    products: {
        all: "tous"
    },
    filter: {
        all: "Tous",
        carterie: {
            enfant: "Enfant",
            general: "Généraliste",
            tendresse: "Tendresse",
            fashion: "Fashion",
            humour: "Humour",
            mural: "Mural",
            unicef: "Unicef",
            finAnnee: "Fin d'année"
        }
    },
    pages: {
        register: {
            title: "Inscription",
            fields: {
                username: "Nom",
                email: "Email",
                password: "Mot de passe",
                confirmPass: "Confirmer le mot de passe"
            },
            link: {
                text: "Déjà inscrit ?",
                btn: "Se connecter"
            },
            btn: "s'inscrire"
        },
        login: {
            title: "Connexion",
            fields: {
                login: "Email",
                pw: "Mot de passe"
            },
            link: "Mot de passe oublié ?",
            btn: "connexion"
        },
        forgottenPassword: {
            title: "Réinitialiser votre mot de passe",
            infos:
                "Nous vous enverrons les informations dont vous avez besoin.",
            button: "Envoyer un email de réinitialisation de mot de passe",
            success: "Un email vient de vous être envoyé"
        },
        resetPassword: {
            button: "Réinitialiser votre mot de passe",
            userNotFound: "Utilisateur introuvable avec cette adresse email"
        }
    },
    modals: {
        default: {
            title: "Titre modal d'exemple"
        }
    },
    errors: {
        emptyField: "Veillez remplir le champ {{field}}",
        invalidEmail: "Le format d'email est invalide",
        identical: "L'ancien mot de passe est identique au nouveau",
        notIdentical: "Les mots de passe ne sont pas identiques",
        wrongPassword: "L'ancien mot de passe est incorrect",
        wrongCredentials: "Vos identifiants sont incorrects",
        tokenNotFound: "Clef d'inscription introuvable",
        passwordNotFound: "Mot de passe non renseigné",
        userNotFoundWithToken:
            "Utilisateur introuvable avec cette clef d'inscription"
    }
};
