const fs = require('fs/promises');
const readline = require('node:readline');

class Asset {
    constructor( title, genere){
        this.title = title
        this.genere = genere
    }
}

class Book extends Asset {
    constructor( title, genere, author, editorial, year){
        super( title, genere)
        this.author = author
        this.editorial = editorial
        this.year = year
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const FILE_PATH = './files/books.json';

async function readBooks() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        //return JSON.parse(data);
        return JSON.parse(data).map(book => new Book(book.title, book.genere, book.author, book.editorial, book.year));
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        } else {
            throw err;
        }
    }
}

async function writeBooks(books) {
    const data = JSON.stringify(books, null, 2);
    await fs.writeFile(FILE_PATH, data, 'utf8');
}

function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function createBook() {
    const title = await askQuestion('Title: ');
    const genere = await askQuestion('Genere:')
    const author = await askQuestion('Author: ');
    const editorial = await askQuestion('Publisher')
    const year = await askQuestion('Edition: ');

    //const book = { title, genere, author, editorial, year };
    const book = new Book(title, genere, author, editorial, year );
    const books = await readBooks();
    books.push(book);
    await writeBooks(books);

    console.log('Book added');
}

async function listBooks() {
    const books = await readBooks();
    if (books.length === 0) {
        console.log('There s no books.');
    } else {
        books.forEach((book, index) => {
            console.log(`${index + 1}. Title: ${book.title},  Genere: ${book.genere},  Author: ${book.author},  Publisher: ${book.editorial}, Year: ${book.year}`);
        });
    }
}

async function updateBook() {
    const books = await readBooks();
    if (books.length === 0) {
        console.log('There s no books.');
        return;
    }

    await listBooks();
    const index = await askQuestion('Enter the number of the book to update: ');
    const book = books[index - 1];

    if (book) {
        book.title =     await askQuestion(`Enter Title (${book.title}): `) || book.title;
        book.author =    await askQuestion(`Enter Author (${book.author}): `) || book.author;
        book.year =      await askQuestion(`Enter Publication year (${book.year}): `) || book.year;
        book.editorial = await askQuestion(`Enter Editorial (${book.editorial}):`) || book.editorial;
        book.genere =    await askQuestion(`Enter Genere    (${book.genere}):`) || book.genere;


        await writeBooks(books);
        console.log('Book updated');
    } else {
        console.log('Invalid book number.');
    }
}

async function deleteBook() {
    const books = await readBooks();
    if (books.length === 0) {
        console.log('There s no books.');
        return;
    }

    await listBooks();
    const index = await askQuestion('Enter the number of the book to delete: ');

    if (books[index - 1]) {
        books.splice(index - 1, 1);
        await writeBooks(books);
        console.log('Book deleted');
    } else {
        console.log('Invalid number.');
    }
}

async function main() {
    while (true) {
        console.log('1. Add Book');
        console.log('2. Get Books');
        console.log('3. Update Book');
        console.log('4. Delete Book');
        console.log('5. Exit');

        const opt = await askQuestion('Opción: ');

        switch (opt) {
            case '1':
                await createBook();
                break;
            case '2':
                await listBooks();
                break;
            case '3':
                await updateBook();
                break;
            case '4':
                await deleteBook();
                break;
            case '5':
                rl.close();
                process.exit(0);
                break;
            default:
                console.log('Error.');
        }
    }
}

main().catch(err => console.error(err));