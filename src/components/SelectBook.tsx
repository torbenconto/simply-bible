
import React from "react";
import books, {Book} from "../bible/books.ts";

function SelectBook({book, setBook}: {book: Book, setBook: React.Dispatch<React.SetStateAction<Book>>}) {
    return (
        <select className="rounded-l-full p-2 text-white bg-blue-400" value={book} onChange={(e) => setBook(e.target.value as Book)}>
            {Object.entries(books).map(([key, value]) => (
                <option key={key} value={value}>{key}</option>
            ))}
        </select>
    );
}

export default SelectBook