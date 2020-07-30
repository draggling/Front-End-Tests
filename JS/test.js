"use strict";

class Book {
    constructor(isbn, title, author) {
        this.bookId = isbn,
        this.title = title,
        this.authorName =  author
    }
    toString() {
        return this.bookId + "\ntitle = " + this.title +
        "\nauthor = " + this.authorName;
    }
}

function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 function randomISBN() {
    var result           = 'ISBN ';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 13; i++ ) {
        if(i == 3 || i == 5 || i == 10 || i == 12) {
            result += '-';
        }
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function generateLibrary(n) {
    var id = 0;
    var tempArray = new Array();
    for(var i = 0; i < n; i++) {
        let isbn = randomISBN();
        let title = randomString(8);
        let author = randomString(8);
        tempArray[i] = new Book(isbn, title, author);;
        id++;

    }
    //printBooks(tempArray);
    /* sort library by isbn */
    return tempArray.sort((a, b) => (a.bookId > b.bookId) ? 1: -1);
}

function printBooks(books) {
    for(var i = 0; i < books.length; i++) {
        let curr = books[i];
        console.log(curr.toString());
    }
}

function sliceTest(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

//printBooks(paginate(books, 6, 1));

/* Variable Values */
var books = generateLibrary(50);
let current_page = 1;
let rows = 6;

/* DOM elements*/
const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

function DisplayList (books, buttons, rows, page) {
    let pagenumber_element = document.getElementById('pagenumber');
    pagenumber_element.innerHTML = "Page " + page;
    //buttons.innerHTML = "<pre>Page " + page + "</pre>";
    buttons.innerHTML = "";

	page--;
	let start = rows * page;
    let end = start + rows;
    // retrieves slice of books array
	let paginatedBooks = books.slice(start, end);

	for (let i = 0; i < paginatedBooks.length; i++) {
		let item = paginatedBooks[i];

		let item_element = document.createElement('div');
		item_element.classList.add('item');
		item_element.innerText = item;
		
		buttons.appendChild(item_element);
	}
}

function SetupPagination (books, buttons, rows) {
	buttons.innerHTML = "";

    // Math.ceil used in case last page does not reach capacity
    let pageCount = Math.ceil(books.length / rows); 
    // create left arrow
    let btn = previousButton(books);
    buttons.appendChild(btn);
	for (let i = 1; i < pageCount + 1; i++) {
		btn = paginationButton(i, books);
		buttons.appendChild(btn);
    }
    btn = nextButton(pageCount,books);
    buttons.appendChild(btn);
    // create right arrow
}
function previousButton (books) {
    let button = document.createElement('button');
	button.innerText = '<';
	button.addEventListener('click', function () {
        if (current_page != 1) {
            current_page--;
            DisplayList(books, list_element, rows, current_page);
    
            let current_btn = document.querySelector('.pagenumbers button.active');
            current_btn.classList.remove('active');
    
            button.classList.add('active');
        }
	});
	return button;
}
function paginationButton (page, books) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(books, list_element, rows, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});
	return button;
}

function nextButton (pageCount, books) {
    let button = document.createElement('button');
	button.innerText = '>';

	button.addEventListener('click', function () {
        if(current_page != pageCount) {
            current_page++;
            DisplayList(books, list_element, rows, current_page);
    
            let current_btn = document.querySelector('.pagenumbers button.active');
            current_btn.classList.remove('active');
    
            button.classList.add('active');
        }
	});
	return button;
}

DisplayList(books, list_element, rows, current_page);
SetupPagination(books, pagination_element, rows);
