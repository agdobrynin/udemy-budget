global.console = {
    // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
    error: jest.fn(),
    warn: jest.fn(),
    info: console.info,
    debug: console.debug,
    log: console.log,
};
