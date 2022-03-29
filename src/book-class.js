import { sortWords } from "./utils";

export class Book {
  constructor(title, content) {
    this.title = title;
    this.content = content; // giant string
  }

  get wordCount() {
    return this.content.match(/\b\S+\b/g).length;
  }

  get charCount() {
    return this.content.trim().length;
  }

  getTopFiveWords() {
    return sortWords(this).slice(0, 5);
  }

  getBottomFiveWords() {
    return sortWords(this).slice(-5, sortWords(this).length)
  }

  getSearchedWordCount(keyword) {
    keyword = keyword.toLowerCase();
    const wordArray = this.content.toLowerCase().match(/\b\S+\b/g);
    return wordArray.filter(word => word == keyword).length;
  }
}