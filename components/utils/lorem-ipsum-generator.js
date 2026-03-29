const words = [
    "ad",
    "adipisicing",
    "aliqua",
    "aliquip",
    "amet",
    "anim",
    "aute",
    "cillum",
    "commodo",
    "consectetur",
    "consequat",
    "culpa",
    "cupidatat",
    "deserunt",
    "do",
    "dolor",
    "dolore",
    "duis",
    "ea",
    "eiusmod",
    "elit",
    "enim",
    "esse",
    "est",
    "et",
    "eu",
    "ex",
    "excepteur",
    "exercitation",
    "fugiat",
    "id",
    "in",
    "incididunt",
    "ipsum",
    "irure",
    "labore",
    "laboris",
    "laborum",
    "lorem",
    "magna",
    "minim",
    "mollit",
    "nisi",
    "non",
    "nostrud",
    "nulla",
    "occaecat",
    "officia",
    "pariatur",
    "proident",
    "qui",
    "quis",
    "reprehenderit",
    "sint",
    "sed",
    "sit",
    "sunt",
    "tempor",
    "ullamco",
    "ut",
    "velit",
    "veniam",
    "voluptate",
];
const standardSentence = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
const capitalizeFirstLetter = (sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1);
const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomWords = (amount) => Array.from({ length: amount }, () => words[getRandomBetween(0, words.length - 1)]).join(" ");
const generateSentence = (startWithStandard) => {
    if (startWithStandard) {
        return standardSentence;
    }
    else {
        return capitalizeFirstLetter(getRandomWords(getRandomBetween(7, 14)));
    }
};
const generateSentences = (amount, startWithStandard) => {
    const sentences = Array.from({ length: amount }, () => generateSentence(false));
    if (startWithStandard)
        sentences[0] = standardSentence;
    return sentences.join(". ") + ".";
};
const generateParagraphs = (amount, startWithStandard, asHTML) => Array.from({ length: amount }, () => {
    const paragraph = generateSentences(getRandomBetween(3, 6), startWithStandard);
    return asHTML ? `<p>${paragraph}</p>` : paragraph;
}).join("\n\n");
export const generateLoremIpsum = ({ generationUnit = "paragraphs", inputAmount = 1, startWithStandard = true, asHTML = false, }) => {
    const units = {
        words: () => getRandomWords(inputAmount),
        sentences: () => generateSentences(inputAmount, startWithStandard),
        paragraphs: () => generateParagraphs(inputAmount, startWithStandard, asHTML),
    };
    const text = inputAmount > 0 || inputAmount < 100
        ? units[generationUnit]()
        : "Invalid input: Please enter a number between 1 and 99.";
    return asHTML && generationUnit !== "paragraphs" ? `<p>${text}</p>` : text;
};
