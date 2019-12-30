const container = document.querySelector("#mainContainer");

let library = [{name: "a", author: "b", pages: "c", read: true}];

function Book(name, author, pages, read) {
    this.name = name,
    this.author = author,
    this.page = pages,
    this.read = read
}

const addBook = (bookObj) => {
    library.push(bookObj);
    renderBooks();
}

const removeBook = (bookObjName) => {
    for (let obj in library) {
        if (obj.name == bookObjName) {
            library.splice(library.indexOf(obj), 1);
        }
    }
}

const renderBooks = () => {
    for (let book in library) {

        console.log(library);
        
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("bookContainer");
        
        for (let property in book) {
            const propertyContainer = document.createElement("div");
            propertyContainer.classList.add("propContainer");
            propertyContainer.textContent = book.property;

            bookContainer.appendChild(propertyContainer);
        }
        const readBtn = document.createElement("button");
        readBtn.classList.add("btn");
        readBtn.id = book.name;

        readBtn.addEventListener(
            "click", (e) => {
                for (let book in library) {
                    if (book.name == e.target.getAttribte("id")) {
                        if (book.read == true) {
                            book.read = false;
                            renderBooks();
                        } else {
                            book.read = true;
                            renderBooks();
                        }
                    }
                }
            }
        );

        bookContainer.appendChild(readBtn);

        const delBtn = document.createElement("button");
        delBtn.classList.add("btn");
        delBtn.id = book.name;

        delBtn.addEventListener(
            "click", (e) => { 
                removeBook(e.target.getAttribte("id")); 
                renderBooks();
            }
        );

        bookContainer.appendChild(delBtn);
    }
}

renderBooks();