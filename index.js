// LOAD A BOOK FROM DISC

const loadBook = (fileName, displayName) => {
  let currentBook = '';
  let url = 'books/' + fileName;

  // RESET UI
  document.getElementById('file-name').innerHTML = displayName;
  document.getElementById('search-stat').innerHTML = '';
  document.getElementById('keyword').value = '';

  // CREATE A SERVER REQUEST TO LOAD A BOOK
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      currentBook = xhr.responseText;
      
      // REPLACE LINE BREAKS AND CARRIAGE RETURNS WITH <BR> TAG
      currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');

      let fileContent = document.getElementById('file-content');
      fileContent.innerHTML = currentBook;
      fileContent.scrollTop = 0;
    }
  }
}