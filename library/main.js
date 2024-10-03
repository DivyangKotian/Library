const bookLibrary = [{
    title: 'My new Book',
    author: 'Me',
    pages: 100,
    read: true,
},
{
    title: 'My old Book',
    author: 'You',
    pages: 1020,
    read: false,
}];

const books = document.querySelector('.books');  // content container div

// Function to create individual elements (title, author, etc.)
function createBookElements(elementName, content, className) {
    const elementVar = document.createElement(elementName);
    elementVar.textContent = content; 
    elementVar.setAttribute('class', className);
    return elementVar;
}

// Function to create the book container for each book
function createBookContainer(book, index) {
    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('id', index);
    bookContainer.setAttribute('key', index); 
    bookContainer.setAttribute('class', 'card-container book');
    
    // Append the book details
    bookContainer.appendChild(
        createBookElements('h1', `Title: ${book.title}`, 'book-title')
    );
    bookContainer.appendChild(
        createBookElements('h1', `Author: ${book.author}`, 'book-author')
    );
    bookContainer.appendChild(
        createBookElements('h1', `Pages: ${book.pages}`, 'book-pages')
    );
    bookContainer.appendChild(
        createBookElements('h1', `Read-Status: ${book.read ? 'Read' : 'Not Read'}`, 'book-read-status')
    );
    
    // Insert the book container into the DOM
    books.insertAdjacentElement("afterbegin", bookContainer);
}

// Function to render the book library
function booksRender() {
    bookLibrary.forEach((book, index) => {
        createBookContainer(book, index);
    });
}

// Render the books
booksRender();
