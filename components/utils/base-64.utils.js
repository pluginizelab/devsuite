export function toBase64(value) {
    try {
        return Buffer.from(value).toString("base64");
    }
    catch {
        throw new Error("Failed to encode to Base64");
    }
}
export function fromBase64(value) {
    try {
        const decoded = Buffer.from(value, "base64").toString("utf-8");
        if (!isPrintableASCII(decoded)) {
            throw new Error("Decoded string contains non-printable characters");
        }
        return decoded;
    }
    catch {
        throw new Error("Invalid Base64 input");
    }
}
/**
 * Checks if the given string consists entirely of printable ASCII characters.
 * Printable ASCII characters are those in the range from space (0x20) to tilde (0x7E).
 */
export function isPrintableASCII(str) {
    return /^[\x20-\x7E]*$/.test(str);
}
