let myLibrary = [];
let libraryVisual = document.getElementsByClassName("library")[0];
let cards = document.getElementsByClassName("card");
const modalTitle = document.getElementById("title");
const modalAuthor = document.getElementById("author");
const modalPages = document.getElementById("pages");

const modalTitleError = document.querySelector("#title + span.error");
const modalAuthorError = document.querySelector("#author + span.error");
const modalPagesError = document.querySelector("#pages + span.error");

let modalRead = document.getElementById("read");
let submitButton = document.getElementsByClassName("form")[0];
const ADDBOOK = document.getElementById("add");
const MODAL = document.getElementsByClassName("modal")[0];
const OVERLAY = document.getElementById("overlay");
let deleteButtons = document.getElementsByClassName("delete-book");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    return this.title + "by " + author + "," + pages + "," + read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  let bookDiv = document.createElement("div");
  bookDiv.setAttribute("data-id", myLibrary.indexOf(newBook));
  bookDiv.className = "card";
  let bTitle = document.createElement("h3");
  let bAuthor = document.createElement("p");
  let bPages = document.createElement("p");
  let bRead = document.createElement("button");
  let bDelete = document.createElement("button");
  bDelete.textContent = "Delete Book";
  bDelete.className = "delete-book";
  bTitle.textContent = title;
  bAuthor.textContent = author;
  bPages.textContent = pages + " pages";
  bPages.classList.add("pages");
  bAuthor.classList.add("author");
  if (read == "Book read") {
    bRead.textContent = "Book read";
    bRead.classList.add("read");
    bRead.classList.add("read-button");
  } else {
    bRead.textContent = "Book not read";
    bRead.classList.add("unread");
    bRead.classList.add("read-button");
  }
  bookDiv.append(bTitle, bAuthor, bPages, bRead, bDelete);
  libraryVisual.append(bookDiv);
}

function changeBook(e) {
  let target = getTarget(e);
  parent = target.parentNode;
  grandparent = target.parentNode.parentNode;
  if (target.classList.contains("delete-book")) {
    grandparent.removeChild(parent);
    let bookId = getTarget(e).parentNode.getAttribute("data-id");
    myLibrary.splice(bookId, 1);
  } else if (target.classList.contains("read-checkbox")) {
    if (grandparent.classList.contains("read")) {
      grandparent.classList.remove("read");
      grandparent.classList.add("unread");
    } else {
      grandparent.classList.remove("unread");
      grandparent.classList.add("read");
    }
  } else if (target.classList.contains("read-button")) {
    changeReadStatus(target);
  }
}

function changeReadStatus(target) {
  if (target.classList.contains("read")) {
    target.classList.remove("read");
    target.classList.add("unread");
    target.textContent = "Book not read";
  } else if (target.classList.contains("unread")) {
    target.classList.add("read");
    target.classList.remove("unread");
    target.textContent = "Book read";
  }
}

function getTarget(e) {
  if (!e) {
    e = window.event;
  }
  return e.target || e.srcElement;
}

function showError() {
  if (!modalTitle.validity.valid) {
    modalTitleError.textContent = "Not a valid title";
    modalTitleError.className = "error active";
  }
  if (!modalAuthor.validity.valid) {
    modalAuthorError.textContent = "Not a valid author";
    modalAuthorError.className = "error active";
  }
  if (!modalPages.validity.valid) {
    modalPagesError.textContent = "Not a valid number";
    modalPagesError.className = "error active";
  }
}

function resetErrorMessages() {
  modalTitleError.textContent = "";
  modalAuthorError.textContent = "";
  modalPagesError.textContent = "";
  modalTitleError.className = "error";
  modalAuthorError.className = "error";
  modalPagesError.className = "error";
}

modalTitle.addEventListener("focus", (event) => {
  modalTitleError.textContent = "";
  modalTitleError.className = "error";
});

modalAuthor.addEventListener("focus", (event) => {
  modalAuthorError.textContent = "";
  modalAuthorError.className = "error";
});

modalPages.addEventListener("focus", (event) => {
  modalPagesError.textContent = "";
  modalPagesError.className = "error";
});

submitButton.addEventListener("submit", function (event) {
  if (modalTitle.value && modalAuthor.value && modalPages.value) {
    resetErrorMessages();
    addBookToLibrary(
      modalTitle.value,
      modalAuthor.value,
      modalPages.value,
      modalRead.textContent
    );
    event.preventDefault();
    MODAL.classList.remove("active");
    OVERLAY.classList.remove("active");
    submitButton.reset();
  } else {
    resetErrorMessages();
    showError();
    event.preventDefault();
  }
});

modalRead.addEventListener("click", function (e) {
  target = getTarget(e);
  changeReadStatus(modalRead);
});

ADDBOOK.addEventListener("click", () => {
  MODAL.classList.add("active");
  OVERLAY.classList.add("active");
});

OVERLAY.addEventListener("click", () => {
  resetErrorMessages();
  MODAL.classList.remove("active");
  OVERLAY.classList.remove("active");
  submitButton.reset();
});

libraryVisual.addEventListener("click", function (e) {
  changeBook(e);
});
