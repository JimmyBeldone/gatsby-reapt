const common = ['couleur', 'collection', 'type'];

const sectionsFilters = {
    cards: ['segment', 'format'],
    stationery: common,
    items: common,
    calendars: ['format'],
};

const sectionsStyles = {
    cards: {
        neverTransparent: false,
        textColorDark: false,
        titleColorDark: false,
    },
    stationery: {
        neverTransparent: false,
        textColorDark: true,
        titleColorDark: true,
    },
    items: {
        neverTransparent: false,
        textColorDark: false,
        titleColorDark: false,
    },
    calendars: {
        neverTransparent: false,
        textColorDark: false,
        titleColorDark: false,
    },
};

module.exports = { sectionsFilters, sectionsStyles };
