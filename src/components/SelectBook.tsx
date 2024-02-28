import React, { useEffect, useState } from "react";
import { Book } from "../bible/books.ts";
import { GetBooks } from "../bible/api.ts";
import {Version} from "../bible/versions.ts"; // Import the GetBooks function

function SelectBook({book, version, setBook}: {book: Book, version: Version, setBook: React.Dispatch<React.SetStateAction<Book>>}) {
    const [books, setBooks] = useState<Book[]>([]); // Create a state for the books

    useEffect(() => {
        GetBooks(version).then((books) => {
            setBooks(books as Book[]);
        }); // Call the GetBooks function and set the returned books to the state
    }, []);

    return (
        <select className="rounded-l-full p-2 text-white bg-blue-400" value={book} onChange={(e) => setBook(e.target.value as Book)}>
            {books.map((book, index) => (
                <option key={index} value={book}>{book}</option>
            ))}
        </select>
    );
}

export default SelectBook