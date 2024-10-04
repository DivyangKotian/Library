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



function createRead(bookContainer, book) {
    // Create the wrapper div with the appropriate class
    const read = document.createElement('div');
    read.setAttribute('class', 'checkbox-container'); // Apply the styling class
    const checkHolder=document.createElement('div');  // styling container
    checkHolder.setAttribute('class','check');          //styling class
    const statusText= document.createElement('h1');
    statusText.textContent='';
    // Create the checkbox input
    let readBtn = document.createElement('input');
    let checkboxId = `check-${book.title.replace(/\s+/g, '-')}-${book.index}`; // Unique ID based on book title, replacs space in title with hyphen and adds index so we can have books with same title as well
    readBtn.setAttribute('id', checkboxId);
    readBtn.setAttribute('name', 'readStatus');
    readBtn.setAttribute('value', book.read ? '1' : '0');
    readBtn.type = "checkbox";
    
    let label = document.createElement('label');
    label.setAttribute('for', checkboxId); // Link the label to the checkbox
    
    // Check if the book has been read
    if (book.read) {
        readBtn.checked = true;
        bookContainer.setAttribute('class', 'card-container book read-true');
        statusText.textContent='Status:Read' // label.textContent='Read'
    } else {
        bookContainer.setAttribute('class', 'card-container book read-false');
        statusText.textContent='Status:Unread' // label.textContent='Unread'
    }
    
    // Add event listener for changing the read status
    readBtn.addEventListener('click', (e) => {
        if (e.target.checked) {
            bookContainer.setAttribute('class', 'card-container book read-true');
            book.read = true;
            statusText.textContent='Status:Read' // label.textContent='Read'
        } else {
            bookContainer.setAttribute('class', 'card-container book read-false');
            book.read = false;
            statusText.textContent='Status:Unread'// label.textContent='Unread'
        }
    });
    
    // Create the label for the checkbox
    
    // Append the checkbox and label to the wrapper
    checkHolder.appendChild(readBtn);
    checkHolder.appendChild(label);
    read.appendChild(checkHolder);
    read.appendChild(statusText)
    
    return read;                             // returing to the createBookContainer function
}
function createDelBtn(book){
    const del=document.createElement('button');
    del.setAttribute('class','delete card-icons')
    const icon= document.createElement('i');
    icon.setAttribute('class','fa-solid fa-trash fa-lg');
    del.appendChild(icon);
    return del;
}

// function createDelBtn(book){
//     const del=document.createElement('button');
//     del.setAttribute('class','delete')
//     const icon= document.createElement('img');
//     icon.setAttribute('class','del-img');
//     icon.setAttribute('src','icons/delete.svg');
//     del.appendChild(icon);
//     return del;
// }

function createIcons(){
    const iconsContainer= createBookElements('div', null, 'card-icons');
    const icon1= document.createElement('i');
    const icon2= document.createElement('i');
    const icon3= document.createElement('i');

    icon1.setAttribute('class','fa-regular fa-star fa-lg');
    icon2.setAttribute('class','fa-regular fa-address-book fa-lg');
    icon3.setAttribute('class','fa-solid fa-download fa-lg');
    
    iconsContainer.appendChild(icon1);
    iconsContainer.appendChild(icon2);
    iconsContainer.appendChild(icon3);
    return iconsContainer
}

function createEditBtn(book){

}

// Function to create the book container for each book
function createBookContainer(book, index) {
    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('id', index);
    bookContainer.setAttribute('key', index); 
    bookContainer.setAttribute('class', 'card-container book');
    const buttonHolder= createBookElements('div', null,'btn-holder');
    const textHolder= createBookElements('div', null, 'text-holder');
    
    // Append the book details
    bookContainer.appendChild(buttonHolder)
    buttonHolder.appendChild(createDelBtn(book));

    bookContainer.appendChild(textHolder);
    
    textHolder.appendChild(
        createBookElements('h1', `Title: ${book.title}`, 'book-title')
    );
    textHolder.appendChild(
        createBookElements('h1', `Author: ${book.author}`, 'book-author')
    );
    textHolder.appendChild(
        createBookElements('h1', `Pages: ${book.pages}`, 'book-pages')
    );
    textHolder.appendChild(createRead(bookContainer,book));

    // bookContainer.appendChild(createEditBtn(book));
    bookContainer.appendChild(createIcons());

    
    
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
