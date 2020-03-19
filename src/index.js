module.exports = function check(str, bracketsConfig) {
    const stack = [];

    for (let i = 0; i < str.length; i++) {
        const currentSymbol = str.charAt(i);
        const config = findConfig(currentSymbol, bracketsConfig);
        if (config[0] === config[1]) {
            if (!stack.includes(currentSymbol)) {
                stack.push(currentSymbol);
            } else {
                const last = stack.pop();
                if (currentSymbol !== last) {
                    return false;
                }
            }
        } else {
            const bracketIndex = getConfigBracketIndex(
                currentSymbol,
                bracketsConfig,
            );

            if (bracketIndex === 0) {
                stack.push(currentSymbol);
            } else {
                const last = stack.pop();
                if (!config.includes(last)) {
                    return false;
                }
            }
        }
    }
    return stack.length === 0;
};
const findConfig = (symbol, bracketsConfig) =>
    bracketsConfig.find(config => config.includes(symbol));
const getConfigBracketIndex = (symbol, bracketsConfig) =>
    bracketsConfig.find(config => config.includes(symbol)).indexOf(symbol);
