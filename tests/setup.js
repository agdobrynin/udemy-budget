global.console = {
    // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
    // eslint-disable-next-line no-undef
    error: jest.fn(),
    // eslint-disable-next-line no-undef
    warn: jest.fn(),
    info: console.info,
    debug: console.debug,
    log: console.log,
};
