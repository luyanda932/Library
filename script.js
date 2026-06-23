const showButton = document.getElementById("showDialog"); // button to show dialog
const dialog = document.getElementById("formDialog"); // the dialog
const formElement = document.querySelector("form"); // form inside the dialog
const closeButton = document.querySelector("dialog button"); // form cancel button
const cards = document.getElementById("bookCards"); // container for the book cards
const myLibrary = []; // an array of book objects

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the page from reloading
  const data = new FormData(e.target);
  createBookCard(data);
  dialog.close();
});

function createBookCard(formData) {
  addBookToLibrary(...formData.values()); // create a new Book object and add it to array of Book objects
  
  const newDiv = document.createElement("div"); // container for each book
  newDiv.className = "bookCard";
  newDiv.setAttribute("bookId", myLibrary[myLibrary.length - 1].id);
  
  const labels = ["Title", "Author", "Number of pages", "Read or not read"]; // array of labels
  const valuesArray = Array.from(formData.values()); // array of data

  // loop to store paragraphs that display information
  for (let i = 0; i < labels.length; i++) {
    let p = document.createElement("p");
    p.setAttribute("bookId", myLibrary[myLibrary.length - 1].id);
    p.textContent = labels[i] + ": " + valuesArray[i];
    newDiv.appendChild(p); // append each paragraph to the div
  }

  const buttonsDiv = document.createElement("div"); // div for buttons
  buttonsDiv.style.cssText = "display: flex; justify-content: center; gap: 5px;";

  let removeButton = document.createElement("button"); // create button to remove book
  removeButton.setAttribute("bookId", myLibrary[myLibrary.length - 1].id); // set attribute of button to current object id
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => { 
    // remove div with the same attribute value as the button
    const divsToRemove = document.querySelectorAll(
      `div[bookId="${removeButton.getAttribute("bookId")}"`,
    );
    divsToRemove.forEach((el) => el.remove());
  });

  let readStatusButton = document.createElement("button"); // create button to change read status
  readStatusButton.setAttribute("bookId", myLibrary[myLibrary.length - 1].id); // set attribute of button to current object id
  readStatusButton.textContent = "Change read status";
  readStatusButton.addEventListener("click", () => {
    const divToChange = document.querySelector( // select div with same attribute value as the button
      `div[bookId="${readStatusButton.getAttribute("bookId")}"`,
    );
    const paragraphToChange = divToChange.querySelector(":nth-child(4)");

    let bookObject = {};

    // change book read status
    for (const book of myLibrary) {
      if (readStatusButton.getAttribute("bookId") === book.id) {
        bookObject = book;
        book.toggleStatus();
      }
    }

    paragraphToChange.textContent = labels[3] + ": " + bookObject.readStatus;
  });

  buttonsDiv.appendChild(removeButton);
  buttonsDiv.appendChild(readStatusButton);
  newDiv.appendChild(buttonsDiv);
  cards.appendChild(newDiv);
}

// Book constructor
function Book(title, author, pages, readStatus) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID(); // generate a unique ID
}

// prototype function to toggle between the read statuses
Book.prototype.toggleStatus = function() {
  if(this.readStatus === "Read")
    this.readStatus = "Not read";
  else
    this.readStatus = "Read";
};

function addBookToLibrary(title, author, pages, readStatus) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, readStatus);
  myLibrary.push(book);
}


// addBookToLibrary("A Tale of Two Cities", "Charles Dickens", "288", "Read"); // 1859
// addBookToLibrary("Frankenstein ", "Mary Shelley", "219", "Read"); // 1823
// addBookToLibrary("The Three Musketeers", "Alexandre Dumas", "592", "Unread"); // 1844
// addBookToLibrary("Nineteen Eighty Four", "George Orwell", "432", "Unread"); // 1949
// addBookToLibrary("Great Expectation", "Charles Dickens", "600", "Read"); // 1961
