export function pxToRem(px, base = 16) {
    return px / base;
}
export function remToPx(rem, base = 16) {
    return rem * base;
}
export function pxToVw(px, viewportWidth) {
    return (px / viewportWidth) * 100;
}
export function vwToPx(vw, viewportWidth) {
    return (vw / 100) * viewportWidth;
}
export function pxToVh(px, viewportHeight) {
    return (px / viewportHeight) * 100;
}
export function vhToPx(vh, viewportHeight) {
    return (vh / 100) * viewportHeight;
}
export function pxToVmin(px, viewportWidth, viewportHeight) {
    const vmin = Math.min(viewportWidth, viewportHeight);
    return (px / vmin) * 100;
}
export function vminToPx(vmin, viewportWidth, viewportHeight) {
    const min = Math.min(viewportWidth, viewportHeight);
    return (vmin / 100) * min;
}
export function pxToVmax(px, viewportWidth, viewportHeight) {
    const vmax = Math.max(viewportWidth, viewportHeight);
    return (px / vmax) * 100;
}
export function vmaxToPx(vmax, viewportWidth, viewportHeight) {
    const max = Math.max(viewportWidth, viewportHeight);
    return (vmax / 100) * max;
}
