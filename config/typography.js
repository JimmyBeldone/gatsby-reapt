import Typography from 'typography';

export const typography = new Typography({
    baseFontSize: `16px`,
    baseLineHeight: 1.6,
    bodyFontFamily: [
        `Lato`,
        `-apple-system`,
        `BlinkMacSystemFont`,
        `Segoe UI`,
        `Roboto`,
        `Helvetica`,
        `Arial`,
        `sans-serif`,
    ],
    headerFontFamily: [
        `Montserrat`,
        `-apple-system`,
        `BlinkMacSystemFont`,
        `Segoe UI`,
        `Roboto`,
        `Helvetica`,
        `Arial`,
        `sans-serif`,
    ],
    headerWeight: 500,
    scaleRatio: 2,
    title: `GatsbyTutorial`,
});

export default typography;
