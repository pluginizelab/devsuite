export function formatOutput(timestamp) {
    let date;
    let formatDetected;
    if (/^\d{11,13}$/.test(timestamp)) {
        date = new Date(parseInt(timestamp, 10));
        formatDetected = "milliseconds";
    }
    else if (/^\d{1,10}$/.test(timestamp)) {
        date = new Date(parseInt(timestamp, 10) * 1000);
        formatDetected = "seconds";
    }
    else {
        throw new Error("Invalid timestamp format");
    }
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }
    const gmtDate = formatDate(date, "UTC");
    const localDate = formatDate(date);
    const labelWidth = 22;
    return (`Format detected: ${formatDetected}\n` +
        "---\n" +
        "Greenwich Mean Time:".padEnd(labelWidth) +
        `${gmtDate}\n` +
        "Your time zone:".padEnd(labelWidth) +
        `${localDate}`);
}
function formatDate(date, timeZone = "local") {
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: timeZone === "local" ? undefined : timeZone,
        timeZoneName: "short",
    };
    return date.toLocaleString("en-US", options);
}
