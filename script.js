let myLibrary = [];

function Book(title, author, num_pages, read){
  this.title = title;
  this.author = author;
  this.num_pages = num_pages,
  this.read = read;
}

function storeInput() {
  const input1 = document.getElementById("title");
  const input2 = document.getElementById("author");
  const input3 = document.getElementById("num-pages");
  const input4 = document.querySelector('input[name="read"]:checked').value;


  const title = input1.value;
  const author = input2.value;
  const num_pages = input3.value;
  const read = input4 === "read" ? "Read" : "Not read";

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
 
  
  const headers = ["Title", "Author", "Number of pages", "Read"];
  const headerRow = document.createElement("tr");

  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.append(headerCell);
  });

  library.appendChild(headerRow);

  myLibrary.forEach((book,index) => {
    let row = library.insertRow();

    let titleCell = row.insertCell(0);
    titleCell.innerText = book.title;
    titleCell.contentEditable = true;
    titleCell.addEventListener('blur', () => {
      book.title = titleCell.innerText;
    });
    titleCell.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default Enter key action (e.g., new line)
        book.title = titleCell.innerText;
        titleCell.blur(); // Trigger blur to save changes
      }
    });

    let authorCell = row.insertCell(1);
    authorCell.innerText = book.author;
    authorCell.contentEditable = true;
    authorCell.addEventListener('blur', () => {
      book.author = authorCell.innerText;
    });
    authorCell.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        book.author = authorCell.innerText;
        authorCell.blur();
      }
    });

    let numPagesCell = row.insertCell(2);
    numPagesCell.innerText = book.num_pages;
    numPagesCell.contentEditable = true;
    numPagesCell.addEventListener('blur', () => {
      const newValue = parseInt(numPagesCell.innerText, 10);
      if (!isNaN(newValue)) {
        book.num_pages = newValue;
      } else {
        numPagesCell.innerText = book.num_pages; // Revert to previous value if input is invalid
      }});
      numPagesCell.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const newValue = parseInt(numPagesCell.innerText, 10);
          if (!isNaN(newValue)) {
            book.num_pages = newValue;
          } else {
            numPagesCell.innerText = book.num_pages; // Revert to previous value if input is invalid
          }
          numPagesCell.blur();
        }
      });

    let readCell = row.insertCell(3);
    readCell.innerText = book.read;
    readCell.style.cursor = 'pointer'; 
    readCell.addEventListener('click', () =>{
      console.log('Before toggle:', myLibrary[index].read);
      Toggle(index);
      console.log('After toggle:', myLibrary[index].read);
      Display();
    })
      
    let removeCell = row.insertCell(4);
    let removeBtn = document.createElement("img");
    removeBtn.src = "trash.png";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener('click', () => {
      removeBook(index);
      Display(); 
    });
    removeCell.appendChild(removeBtn);
  });
    
  const container = document.getElementById('library-container');
  container.appendChild(library);
  }


function removeBook(index) {
  myLibrary.splice(index, 1);
}


function Close(){
  dialog.close();
}


function Toggle(index){
  const book = myLibrary[index];

  if (book.read === 'Read') {
    book.read = 'Not read';
  } else {
    book.read = 'Read';
  }
  console.log('New status:', book.read);
}


const newBook = document.querySelector("#new-book");
const book = document.querySelector("#book");
const outputBox = document.querySelector("output");
const confirmBtn = book.querySelector("#confirmBtn");
const cancelBtn = book.querySelector('#cancelBtn')
const dialog = document.querySelector('#book');

cancelBtn.addEventListener('click', Close);

newBook.addEventListener("click", () => {
  book.showModal();
});

confirmBtn.addEventListener('click', () => {
  storeInput();

  const inputTitle = document.getElementById('title');
  const inputAuthor = document.getElementById('author');
  const inputNumPages = document.getElementById('num-pages');
  const inputRead = document.querySelectorAll('input[name="read"]');

  inputTitle.value = '';
  inputAuthor.value = '';
  inputNumPages.value = '';

  inputRead.forEach(radio => radio.checked = false);
});


