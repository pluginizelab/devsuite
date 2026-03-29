export function convertQueryParamsToJSON(input) {
    let inputString = input;
    if (!input.includes("://")) {
        inputString = input.startsWith("?")
            ? `https://example.com${input}`
            : `https://example.com?${input}`;
    }
    const url = new URL(inputString);
    const intermediateResult = {};
    url.searchParams.forEach((value, key) => {
        if (intermediateResult[key]) {
            if (Array.isArray(intermediateResult[key])) {
                intermediateResult[key].push(value);
            }
            else {
                intermediateResult[key] = [intermediateResult[key], value];
            }
        }
        else {
            intermediateResult[key] = value;
        }
    });
    const sortedKeys = Object.keys(intermediateResult).sort();
    const result = {};
    sortedKeys.forEach((key) => {
        result[key] = intermediateResult[key];
    });
    return JSON.stringify(result, null, 2);
}
