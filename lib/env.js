function env(key) {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`${key} is undefined`);
    }
    return value;
}

module.exports = { env };
