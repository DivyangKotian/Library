// Array to hold all books
let bookLibrary = [];

const books = document.querySelector('.books');  // content container div

// Function to add local storage - retrieving the local storage 
function addLocalStorage() {
    // Get the book library from localStorage
    let storedLibrary = localStorage.getItem("book-library");
    console.log("Stored Library:", storedLibrary); // Debugging: Log what's in localStorage

    // If no book library exists in localStorage, create a default library with an example book
    if (storedLibrary === null || storedLibrary === '[]') {
        bookLibrary = [{
            title: 'Example Book', 
            author: 'Example Author', 
            pages: 500, 
            read: true,
        }];
        console.log("No library found, setting default example book"); // Debugging: Log this action
        // Save the default example book to localStorage
        localStorage.setItem("book-library", JSON.stringify(bookLibrary));  
    } else {
        bookLibrary = JSON.parse(storedLibrary);  // If data exists, parse and use it
        console.log("Loaded Library from LocalStorage:", bookLibrary); // Debugging: Log loaded library
    }

    saveAndRenderBooks();  // Save and render the page
}

// Function to create individual html elements with class (title, author, etc.)
function createBookElements(elementName, content, className) {
    const elementVar = document.createElement(elementName);
    elementVar.textContent = content; 
    elementVar.setAttribute('class', className);
    return elementVar;
}

// Function to create read status button
function createRead(bookContainer, book) {
    const read = document.createElement('div');
    read.setAttribute('class', 'checkbox-container'); // Apply the styling class
    
    const checkHolder = document.createElement('div');  // styling container
    checkHolder.setAttribute('class', 'check');
    const statusText = document.createElement('span');
    statusText.setAttribute('class','card-status')
    statusText.textContent = '';

    // Create the checkbox input
    let readBtn = document.createElement('input');
    let checkboxId = `check-${book.title.replace(/\s+/g, '-')}-${book.index}`; // Unique ID
    readBtn.setAttribute('id', checkboxId);
    readBtn.setAttribute('name', 'readStatus');
    readBtn.setAttribute('value', book.read ? '1' : '0');
    readBtn.type = "checkbox";

    let label = document.createElement('label');
    label.setAttribute('for', checkboxId); // Link the label to the checkbox
    
    // Set initial state of checkbox and status text
    if (book.read) {
        readBtn.checked = true;
        bookContainer.setAttribute('class', 'card-container book read-true');
        statusText.textContent = 'Status: Read';
    } else {
        bookContainer.setAttribute('class', 'card-container book read-false');
        statusText.textContent = 'Status: Unread';
    }

    // Add event listener for changing the read status
    readBtn.addEventListener('click', (e) => {
        // Update read status based on checkbox state
        if (e.target.checked) {
            book.read = true;
            bookContainer.setAttribute('class', 'card-container book read-true');
            statusText.textContent = 'Status: Read';
        } else {
            book.read = false;
            bookContainer.setAttribute('class', 'card-container book read-false');
            statusText.textContent = 'Status: Unread';
        }

        bookContainer.addEventListener('mouseleave', () => {            // i dont want the card to render while hovering cause it was clunky
            setTimeout(()=>{                                    // setTimeout so that the mouse can leave and then the hoverback to orignal scale can take place smoothly
                saveAndRenderBooks(); // Trigger save and render when the pointer leaves the card, 
            },400);
        });
    });

    checkHolder.appendChild(readBtn);
    checkHolder.appendChild(label);
    read.appendChild(checkHolder);
    read.appendChild(statusText);
    
    return read;
}


// Function to delete a book
function deleteBook(index) {
    bookLibrary.splice(index, 1);
    saveAndRenderBooks();
}

// Function to create a delete button
function createDelBtn(book, index) {
    const del = document.createElement('button');
    del.setAttribute('class', 'delete card-icons');
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-trash fa-lg');
    del.appendChild(icon);
    del.addEventListener('click', () => {
        deleteBook(index);
    });
    return del;
}

// Function to create other icons (dummy, no function)
function createIcons() {
    const iconsContainer = createBookElements('div', null, 'card-icons');
    const icon1 = document.createElement('i');
    const icon2 = document.createElement('i');
    const icon3 = document.createElement('i');

    icon1.setAttribute('class', 'fa-regular fa-star fa-lg');
    icon2.setAttribute('class', 'fa-regular fa-address-book fa-lg');
    icon3.setAttribute('class', 'fa-regular fa-circle-down fa-lg');
    
    iconsContainer.appendChild(icon1);
    iconsContainer.appendChild(icon2);
    iconsContainer.appendChild(icon3);
    return iconsContainer;
}

// Function to create the edit button
function createEditBtn(book) {
    const edit = document.createElement('button');
    edit.setAttribute('class', 'edit card-icons');
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-pencil fa-lg');
    edit.appendChild(icon);
    
    // Event listener for edit functionality (you can implement specific logic here)
    edit.addEventListener('click', () => {
        console.log("Editing book:", book);
        // Logic for editing the book (like opening a modal or form for editing)
    });

    return edit;
}

// Function to create the book container for each book
function createBookContainer(book, index) {
    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('id', index);
    bookContainer.setAttribute('key', index); 
    bookContainer.setAttribute('class', 'card-container book');
    const buttonHolder = createBookElements('div', null, 'btn-holder');
    const textHolder = createBookElements('div', null, 'text-holder');
    
    bookContainer.appendChild(buttonHolder);
    bookContainer.appendChild(textHolder);
    
    buttonHolder.appendChild(createDelBtn(book, index));
    buttonHolder.appendChild(createEditBtn(book));
    
    textHolder.appendChild(createBookElements('h1', `Title: ${book.title}`, 'book-title'));
    textHolder.appendChild(createBookElements('h1', `Author: ${book.author}`, 'book-author'));
    textHolder.appendChild(createBookElements('h1', `Pages: ${book.pages}`, 'book-pages'));
    textHolder.appendChild(createRead(bookContainer, book));
    bookContainer.appendChild(createIcons());

    books.insertAdjacentElement("beforeend", bookContainer);
}

// Function to render the book library
function booksRender() {
    books.textContent = ""; // Clear previous content to avoid duplicates
    bookLibrary.map((book, index) => {
        createBookContainer(book, index);
    });
}

// Function to save the book library and render it
function saveAndRenderBooks() {
    localStorage.setItem("book-library", JSON.stringify(bookLibrary)); // Save to localStorage
    booksRender(); // Re-render the updated library
}

window.addEventListener('beforeunload', () => {
    saveAndRenderBooks(); // Ensure the latest state is saved on refresh
});


// Render on page load
addLocalStorage();
