let myLibrary = [];

function Book(title, author, num_pages, read){
  this.title = title;
  this.author = author;
  this.num_pages = num_pages,
  this.read = read;
  this.info = function(){
    return `${this.title} by ${this.author}, ${this.num_pages} pages, ${this.read} yet.`}
}

function storeInput() {
  const input1 = document.getElementById("title");
  const input2 = document.getElementById("author");
  const input3 = document.getElementById("num-pages");
  const input4 = document.querySelector('input[name="read"]:checked').value;

  const title = input1.value;
  const author = input2.value;
  const num_pages = input3.value;
  const read = input4 === "read"; // Convert to boolean

  const book = new Book(title, author, num_pages, read);
  addBookToLibrary(book);
  
  dialog.close();
  Display();
}


function addBookToLibrary(book){
  myLibrary.push(book);
}

function Display() {
  // Remove old table if it exists
  const oldTable = document.getElementById("library");
  if (oldTable) oldTable.remove();

  const library = document.createElement("table");
  library.setAttribute("id", "library");
  
  const headers = ["Title", "Author", "Num of pages", "Read"];
  const headerRow = document.createElement("tr");

  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.append(headerCell);
  });
  
  library.appendChild(headerRow);

  myLibrary.forEach((book) => {
    let row = library.insertRow();
    row.insertCell(0).innerText = book.title;
    row.insertCell(1).innerText = book.author;
    row.insertCell(2).innerText = book.num_pages;
    row.insertCell(3).innerText = book.read ? "Read" : "Not read";
  });

  const container = document.getElementById('library-container');
  container.appendChild(library);
}


const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read");
const theWitcher = new Book("The Witcher", "Andrzej Saipkowski", 300, "not read");
const Metamorphosis = new Book("Metamorphosis", "Franz Kafka", 160, "not read");


addBookToLibrary(theHobbit);
addBookToLibrary(theWitcher);
addBookToLibrary(Metamorphosis);

Display();

const newBook = document.querySelector("#new-book");
const book = document.querySelector("#book");
const outputBox = document.querySelector("output");
const confirmBtn = book.querySelector("#confirmBtn");
const cancelBtn = book.querySelector('#cancelBtn')
const dialog = document.querySelector('#book');

confirmBtn.addEventListener('click', storeInput);
cancelBtn.addEventListener('click', close);

newBook.addEventListener("click", () => {
  book.showModal();
});


function close(event){
  dialog.close();
}




