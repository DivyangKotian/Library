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

function createRead(bookContainer,book){
    const read= document.createElement('div');
    read.appendChild(createBookElements('h1', 'Read Status', 'read-status'));
    let readBtn= document.createElement('input');
    readBtn.type = "checkbox";
    
    readBtn.addEventListener('click', (e)=>{
        if(e.target.checked){
            bookContainer.setAttribute('class', 'card-container book read-true');
            book.read=true;
        }
        else{
            bookContainer.setAttribute('class', 'card-container book read-false')
            book.read=false;
        }
    });
    if(book.read){
        readBtn.checked=true;
        bookContainer.setAttribute('class', 'card-container book read-true')
    }
    read.appendChild(readBtn);
    return read;
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
    bookContainer.appendChild(createRead(bookContainer,book));
    
    
    // Insert the book container into the DOM, I'm going for a chronological method, so oldest book stays first child of the container div, so new elements added before end
    //using an alternative to appendChild() for practice, but with insetAdjacentElement i can make it so that the new book
    //is the first child, hence we can make a recently added section etc

    books.insertAdjacentElement("beforeend", bookContainer);
}

// Function to render the book library
function booksRender() {
    bookLibrary.map((book, index) => {
        createBookContainer(book, index);
    });
}

// Render the books
booksRender();
