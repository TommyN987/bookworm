const sortProperties = (obj) => {
  // first convert the object to an array
  let returnArray = Object.entries(obj);

  // sort the array
  returnArray.sort(function(first, second){
    return second[1] - first[1];
  });

  return returnArray;
}

const ulTemplate = (items, element) => {
  let rowTemplate = document.getElementById('template-ul-items');
  let templateHTML = rowTemplate.innerHTML;
  let resultsHTML = '';

  for (let i = 0; i < items.length; i++) {
    resultsHTML += templateHTML.replace('{{val}}', items[i][0] + ': ' + items[i][1] + ' time(s)');
  }

  element.innerHTML = resultsHTML;
}

const getStopWords = () => {
  return ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now', 'would', 'mr', 'could', 'said', 'one', 'like', 'well', 'it’s', 'man', 'don’t', 'see', 'us', 'see', 'may', 'sir', 'miss', 'pg'];
}

const filterStopWords = (wordArray) => {
  let stopWords = getStopWords();
  let commonObj = {};
  let uncommonArr = [];

  for (i = 0; i < stopWords.length; i++) {
    commonObj[stopWords[i].trim()] = true;
  }

  for (i = 0; i < wordArray.length; i++) {
    word = wordArray[i].trim().toLowerCase();
    if (!commonObj[word]) {
      uncommonArr.push(word);
    }
  }

  return uncommonArr;
}

const getBookStats = (fileContent) => {
  let wordCount = document.getElementById('word-count');
  let charCount = document.getElementById('char-count');

  let text = fileContent.toLowerCase();
  
  // search for spaces (\b) and characters between them (\S+); return array with each word as an item
  let wordArray = text.match(/\b\S+\b/g);
  let wordDictionary = {};

  let uncommonWords = [];

  // filter out stop words
  uncommonWords = filterStopWords(wordArray);

  // count every word in wordArray
  for (let word in uncommonWords) {
    let wordValue = uncommonWords[word];
    if (wordDictionary[wordValue] > 0) {
      wordDictionary[wordValue] += 1
    }
    else {
      wordDictionary[wordValue] = 1;
    }
  }

  // sort the array
  let wordList = sortProperties(wordDictionary);

  // return the top 5 words
  let top5words = wordList.slice(0, 6);

  // return the bottom 5 words
  let least5words = wordList.slice(-6, wordList.length);

  // write values to the page
  ulTemplate(top5words, document.getElementById('most-used'));
  ulTemplate(least5words, document.getElementById('least-used'));

  wordCount.innerHTML = 'Word Count: ' + wordArray.length;
  charCount.innerHTML = 'Character Count: ' + text.length;
  
}

// LOAD A BOOK FROM SERVER
const loadBook = (fileName, displayName) => {
  let currentBook = '';
  let url = 'books/' + fileName;

  // reset UI
  document.getElementById('file-name').innerHTML = displayName;
  document.getElementById('search-stat').innerHTML = '';
  document.getElementById('keyword').value = '';

  // create an HTTP server request to load book
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      currentBook = xhr.responseText;
      
      getBookStats(currentBook);

      // replace line breaks and carriage returns with <br> tag
      currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');

      let fileContent = document.getElementById('file-content');
      fileContent.innerHTML = currentBook;
      fileContent.scrollTop = 0;
    }
  }
}

const highlightSearchedWord = () => {
  let keyword = document.getElementById('keyword').value;
  let display = document.getElementById('file-content');

  let newContent = '';

  let re = new RegExp(keyword, 'gi');
  let replaceText = "<mark class='mark-me'>$&</mark>";
  let bookContent = display.innerHTML;

  let spans = document.querySelectorAll('mark');

  for (let i = 0; i < spans.length; i++) {
    spans[i].outerHTML = spans[i].innerHTML;
  }

  // highlight the searched word
  newContent = bookContent.replace(re, replaceText);

  display.innerHTML = newContent;
  let count = document.querySelectorAll('mark').length;
  document.getElementById('search-stat').innerHTML = 'found ' + count + ' matches';

  if (count > 0) {
    let element = document.getElementsByClassName('mark-me');
    element.scrollIntoView(count);
  }
}

const btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener('click', highlightSearchedWord);