/* Core code */

const container = document.querySelector("#mainContainer");

let myLibrary = [];

function Book(name, author, pages, read) {
    this.id,
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read
}


const addBook = (bookObj) => { 
    bookObj["id"] = myLibrary.length + 1;
    myLibrary.push(bookObj); 
    renderBooks();
}

const removeBook = (id) => {
    for (let index = 0; index < myLibrary.length; index++) {
        if (myLibrary[index]["id"] == id) {
            myLibrary.splice(index, 1);
            for (index; index < myLibrary.length; index++) {
                myLibrary[index]["id"]--;
            }
            break;
        }
    }

    renderBooks();
}

const renderBookObj = (bookObj) => {
    const bookContainer = document.createElement("div");;
    bookContainer.className += "bookContainer container col";
    bookContainer.id = bookObj["id"];

    for (let bookProperty in bookObj) {
        const property = document.createElement("div");
        property.id = bookProperty; 
        property.textContent = bookObj[bookProperty];
        property.className += "alternate property container row";

        bookContainer.appendChild(property);
    }

    const deleteBtn = document.createElement("div");
    deleteBtn.className += "deleteBtn container row";

    deleteBtn.id = bookObj.id;
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener(
        "click", (e) => {
            removeBook(e.target.getAttribute("id"));
        }
    );

    bookContainer.appendChild(deleteBtn);

    const readBtn = document.createElement("div");
    readBtn.className += "readBtn container row";

    readBtn.id = bookObj.id;
    readBtn.textContent = "Read book";

    readBtn.addEventListener(
        "click", (e) => {
            for (let index=0; index<myLibrary.length; index++) {
                if (myLibrary[index]["id"] == e.target.id) {
                    if (myLibrary[index]["read"] == false) {
                        myLibrary[index]["read"] = true;
                        e.target.textContent = "Un-read book";
                    } else {
                        myLibrary[index]["read"] = false;
                        e.target.textContent = "Read book";
                    }
                    
                }
            }

            renderBooks();
        }
    );

    bookContainer.appendChild(readBtn);

    return bookContainer;
}

const clearContainer = () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

const renderBooks = () => {

    if (myLibrary.length == 0) {
        container.textContent = "Your library is empty :(";
        return;
    }

    clearContainer();
    
    for (let bookObj of myLibrary) {
        container.appendChild(renderBookObj(bookObj));
    }
}

const randomNumber = (n) => {
    return Math.floor(Math.random() * n);
}

const createBook = () => {
    const book = new Book("Javascript: The good parts", "Author", randomNumber(2000), "false");
    return book;
}

for (let i = 0; i < 5; i++) {
    addBook(createBook());
}

renderBooks();

/* Managing input form */

const formContainer = document.querySelector("#form");
const submitBtn = document.querySelector("#bookBtn");
const toggleFormBtn = document.querySelector("#toggleForm");
const bookHeader = document.querySelector("#bookHeader");

const extractData = () => {
    const bookName = document.querySelector("#bookName").value;
    const bookAuth = document.querySelector("#bookAuth").value;
    const bookPages = document.querySelector("#bookPages").value;
    const bookRead = document.querySelector("#bookRead").checked;

    if (bookName == "" || bookAuth == "" || bookPages == "") {
        alert("Please enter valid data");
        return;
    }

    //console.log(bookName, bookAuth, bookPages, bookRead);

    const book = new Book(bookName, bookAuth, bookPages, bookRead);

    addBook(book);
}

toggleFormBtn.addEventListener(
    "click", () => {
        formContainer.classList.toggle("hidden");
        container.classList.toggle("hidden");
        bookHeader.classList.toggle("hidden");
    }
);

submitBtn.addEventListener(
    "click", () => {
        extractData();
        formContainer.classList.toggle("hidden");
        container.classList.toggle("hidden");
        bookHeader.classList.toggle("hidden");
    }
);