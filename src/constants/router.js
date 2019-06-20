export const PAGE_HOME = `/`;
export const PAGE_2 = `/page-2/`;
export const PAGE_2_ID = `${PAGE_2}/:id/`;
export const PAGE_ABOUT = `/about/`;

export const PAGE_ABOUT_ONE = `${PAGE_ABOUT}/one/:id/`;
export const PAGE_ABOUT_TWO = `${PAGE_ABOUT}/two/:test/`;
export const PAGE_ML = `/legal-notices/`;

export const routes = [
    {
        path: PAGE_HOME,
        name: `nav.home`,
    },
    {
        path: PAGE_2,
        name: `nav.page2`,
    },
    {
        path: PAGE_ABOUT,
        name: `nav.about`,
    },
    {
        path: PAGE_ML,
        name: `nav.ml`,
        nav: false,
    },
];
