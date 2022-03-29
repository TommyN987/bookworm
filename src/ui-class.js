export class UI {
  
  // TAKES BOOK OBJECT, REPLACES CARRIAGE RETURNS AND LINE FEEDS WITH HTML LINE BREAKS, DISPLAYS BOOK IN THE DOM
  static displayBook(book) {
    const bookContent = document.getElementById('book-content');
    document.getElementById('book-name').innerText = book.title;
    bookContent.innerHTML = book.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  // TAKES NESTED ARRAY, DISPLAYS IT IN THE DOM
  static displayTopFiveWords(arr) {
    const mostUsed = document.getElementById('most-used');
    mostUsed.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
      let li = document.createElement('li');
      li.innerText = `${arr[i][0]}: ${arr[i][1]} times`;
      mostUsed.appendChild(li);
    }
  }

  // TAKES NESTED ARRAY, DISPLAYS IT IN THE DOM
  static displayBottomFiveWords(arr) {
    const leastUsed = document.getElementById('least-used');
    leastUsed.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
      let li = document.createElement('li');
      li.innerText = `${arr[i][0]}: ${arr[i][1]} time(s)`;
      leastUsed.appendChild(li);
    }
  }

  // TAKES BOOK OBJECT, DISPLAYS WORD COUNT AND CHARACTER COUNT IN THE DOM
  static displayBookStats(obj) {
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');

    wordCount.innerHTML = `Word count: ${obj.wordCount}`;
    charCount.innerHTML = `Character count: ${obj.charCount}`;
  }

  static displaySearchedWordCount(num) {
    document.getElementById('search-stat').innerText = `Found ${num} matches`;
  }

  static hightlightSearchedWord(word) {
    let bookContent = document.getElementById('book-content');
    let replacee = new RegExp(word, 'gi');
    let replacer = '<mark>$&</mark>';
    let newContent = bookContent.innerHTML.replace(replacee, replacer);
    bookContent.innerHTML = newContent;
    document.querySelector('mark').scrollIntoView();
  }
}