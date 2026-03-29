export const isValidHex = (hex) => {
    const pattern = /^#?[a-fA-F0-9]{6}$/;
    return pattern.test(hex);
};
export const isRGBValueValid = (value) => {
    return !isNaN(value) && value >= 0 && value <= 255;
};
export const convertToRGB = (hex) => {
    const normalizedHex = hex.startsWith("#") ? hex.slice(1) : hex;
    const r = parseInt(normalizedHex.substring(0, 2), 16).toString();
    const g = parseInt(normalizedHex.substring(2, 4), 16).toString();
    const b = parseInt(normalizedHex.substring(4, 6), 16).toString();
    return { r, g, b };
};
export const convertToHex = (r, g, b) => {
    return `#${[r, g, b]
        .map((value) => {
        const intValue = parseInt(value);
        if (isNaN(intValue)) {
            return "00";
        }
        return intValue.toString(16).padStart(2, "0");
    })
        .join("")}`;
};
export const toCss = (rgb) => {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
};
const valueToFixed = (value) => (parseInt(value) / 255).toFixed(2);
export const toIOS = (rgb, lang) => {
    const red = valueToFixed(rgb.r);
    const green = valueToFixed(rgb.g);
    const blue = valueToFixed(rgb.b);
    if (lang === "swift") {
        return `UIColor(red: ${red}, green: ${green}, blue: ${blue}, alpha: 1.00)`;
    }
    return `[UIColor colorWithRed: ${red} green: ${green} blue: ${blue} alpha: 1.0]`;
};
export const toAndroidColor = (rgb) => {
    return `Color.rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};
