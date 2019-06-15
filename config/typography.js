import Typography from "typography";

export const typography = new Typography({
    title: "GatsbyTutorial",
    baseFontSize: "16px",
    baseLineHeight: 1.6,
    headerFontFamily: [
        "Montserrat",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif"
    ],
    bodyFontFamily: [
        "Lato",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif"
    ],
    headerWeight: 500,
    scaleRatio: 2
});

export default typography;
