export const PAGE_HOME = "/";
export const PAGE_2 = "/page-2";
export const PAGE_2_ID = `${PAGE_2}/:id`;
export const PAGE_ABOUT = "/about";

export const PAGE_ABOUT_ONE = `${PAGE_ABOUT}/one/:id`;
export const PAGE_ABOUT_TWO = `${PAGE_ABOUT}/two/:test`;

export const PAGE_REGISTER = "/register";
export const PAGE_LOGIN = "/login";
export const PAGE_FORGOTTEN_PASSWORD = "/forgotten-password";
export const PAGE_RESETTING_PASSWORD = "/resetting-password";

export const PAGE_DASHBOARD = "/dashbord";

export const routes = [
    {
        path: PAGE_HOME,
        name: "nav.home"
    },
    {
        path: PAGE_2,
        name: "nav.page2"
    },
    {
        path: PAGE_ABOUT,
        name: "nav.about"
    }
];
