// RETURNS AN ARRAY WITH COMMONLY USED GENERIC WORDS ('STOP WORDS') THAT WE WANT TO LATER EXCLUDE
const getStopWords = () => {
  return [
    'i',
    'me',
    'my',
    'myself',
    'we',
    'our',
    'ours',
    'ourselves',
    'you',
    'your',
    'yours',
    'yourself',
    'yourselves',
    'he',
    'him',
    'his',
    'himself',
    'she',
    'her',
    'hers',
    'herself',
    'it',
    'its',
    'itself',
    'they',
    'them',
    'their',
    'theirs',
    'themselves',
    'what',
    'which',
    'who',
    'whom',
    'this',
    'that',
    'these',
    'those',
    'am',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'having',
    'do',
    'does',
    'did',
    'doing',
    'a',
    'an',
    'the',
    'and',
    'but',
    'if',
    'or',
    'because',
    'as',
    'until',
    'while',
    'of',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'in',
    'out',
    'on',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    's',
    't',
    'can',
    'will',
    'just',
    'don',
    'should',
    'now',
    'would',
    'mr',
    'could',
    'said',
    'one',
    'like',
    'well',
    'it’s',
    'man',
    'don’t',
    'see',
    'us',
    'see',
    'may',
    'sir',
    'miss',
    'pg',
  ];
};

// TAKES ARRAY, FILTERS OUT STOP WORDS, RETURNS NEW ARRAY WITHOUT THEM
const filterStopWords = (wordArray) => {
  const stopWords = getStopWords();
  const commonObj = {};
  const uncommonArr = [];

  for (let item of stopWords) {
    commonObj[item] = true;
  }

  for (let word of wordArray) {
    if (!commonObj[word.toLowerCase()]) {
      uncommonArr.push(word.toLowerCase());
    }
  }

  return uncommonArr;
};

// TAKES IN BOOK OBJECT, PULLS CONTENT (GIANT STRING), FILTERS OUT STOP WORDS, RETURNS DESCENDING SORTED ARRAY, EACH ELEMENT BEING ANOTHER ARRAY WITH WORD AT INDEX 0, AND ITS COUNT AT INDEX 1
export const sortWords = (obj) => {
  const wordDictionary = {};
  const uncommonWords = filterStopWords(obj.content.match(/\b\S+\b/g));

  for (let word of uncommonWords) {
    if (!wordDictionary.hasOwnProperty(word)) {
      wordDictionary[word] = 1;
    } else wordDictionary[word] += 1;
  }

  const returnArray = Object.entries(wordDictionary).sort((first, second) => {
    return second[1] - first[1];
  });

  return returnArray;
};