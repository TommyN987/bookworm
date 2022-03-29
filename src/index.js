import { UI } from './ui-class'
import { janeEyre , theGreatGatsby , theHoundOfTheBaskervilles , crimeAndPunishment , thePrince } from './book-resources'

let activeBook = '';

const renderBookData = (book) => {
  UI.displayBook(book);
  UI.displayTopFiveWords(book.getTopFiveWords());
  UI.displayBottomFiveWords(book.getBottomFiveWords());
  UI.displayBookStats(book);
  activeBook = book;
}

// EVENT LISTENERS FOR BOOK LOADING
document.getElementById('the-prince').addEventListener('click', () => {
  renderBookData(thePrince);
});

document.getElementById('jane-eyre-link').addEventListener('click', () => {
  renderBookData(janeEyre);
});

document.getElementById('the-hound-of-the-baskervilles').addEventListener('click', () => {
  renderBookData(theHoundOfTheBaskervilles);
});

document.getElementById('the-great-gatsby').addEventListener('click', () => {
  renderBookData(theGreatGatsby);
});

document.getElementById('crime-and-punishment').addEventListener('click', () => {
  renderBookData(crimeAndPunishment);
});

document.getElementById('btn-search').addEventListener('click', () => {
  const keyword = document.getElementById('keyword').value;
  UI.displaySearchedWordCount(activeBook.getSearchedWordCount(keyword));
  UI.hightlightSearchedWord(keyword);
});