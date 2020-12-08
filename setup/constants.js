const icons = {
    biceps: 0x1f4aa,
    check: 0x2705,
    coffee: 0x2615,
    cross: 0x274c,
    lemon: 0x1f34b,
    packageIcon: 0x1f4e6,
    rocket: 0x1f680,
    trash: 0x1f5d1,
    tree: 0x1f384,
    wink: 0x1f609,
};

const unicode = (code) => String.fromCodePoint(code);

const { log } = console;

module.exports = {
    icons,
    log,
    unicode,
};
