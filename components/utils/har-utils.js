export function getColorForTime(time) {
    if (time <= 200) {
        return "bg-green-500";
    }
    if (time <= 400) {
        return "bg-orange-500";
    }
    if (time <= 500) {
        return "bg-red-500";
    }
    return "bg-red-700";
}
export function getFilterType(entry) {
    if (entry.response.status >= 400) {
        return "Errors";
    }
    const { mimeType } = entry.response.content;
    if (entry.request.url.includes("xhr") ||
        entry.request.url.includes("fetch") ||
        mimeType.includes("json") ||
        mimeType.includes("xml")) {
        return "XHR";
    }
    if (mimeType.includes("javascript")) {
        return "JS";
    }
    if (mimeType.includes("css")) {
        return "CSS";
    }
    if (mimeType.includes("image")) {
        return "Img";
    }
    if (mimeType.includes("audio") || mimeType.includes("video")) {
        return "Media";
    }
    return "Other";
}
export function isBase64(str) {
    try {
        return btoa(atob(str)) === str;
    }
    catch (err) {
        return false;
    }
}
export function tryParseJSON(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return str;
    }
}
/**
 * Determines which categories of content match the search query for a given entry.
 * Used to display colored indicators showing where matches were found.
 */
export function getMatchCategories(entry, searchQuery) {
    if (!searchQuery) {
        return { categories: [], hasMatch: false };
    }
    const query = searchQuery.toLowerCase();
    const categories = [];
    // Check URL
    if (entry.request.url.toLowerCase().includes(query)) {
        categories.push("url");
    }
    // Check request and response headers
    const hasHeaderMatch = entry.request.headers.some((header) => header.name.toLowerCase().includes(query) ||
        header.value.toLowerCase().includes(query)) ||
        entry.response.headers.some((header) => header.name.toLowerCase().includes(query) ||
            header.value.toLowerCase().includes(query));
    if (hasHeaderMatch) {
        categories.push("headers");
    }
    // Check request payload
    if (entry.request.postData?.text) {
        if (entry.request.postData.text.toLowerCase().includes(query)) {
            categories.push("request");
        }
    }
    // Check response content
    if (entry.response.content.text) {
        let contentToSearch = entry.response.content.text;
        if (isBase64(contentToSearch)) {
            try {
                contentToSearch = atob(contentToSearch);
            }
            catch (e) {
                // If decode fails, search in original
            }
        }
        if (contentToSearch.toLowerCase().includes(query)) {
            categories.push("response");
        }
    }
    return {
        categories,
        hasMatch: categories.length > 0,
    };
}
