import { useEffect, useState } from "react";
import books, { Book } from "./bible/books.ts";
import versions, { Version } from "./bible/versions.ts";
import SelectVersion from "./components/SelectVersion.tsx";
import SelectBook from "./components/SelectBook.tsx";
import SelectChapter from "./components/SelectChapter.tsx";
import { GetBook, GetChapterCount } from "./bible/api.ts";
import VerseI from "./bible/verse.ts";
import Verse from "./components/Verse.tsx";
import Navbar from "./components/Navbar.tsx";

type data = {
    Chapters: {
        Verses: VerseI[];
    }[];
};

function App() {
    const [version, setVersion] = useState<Version>(versions.NIV);
    const [book, setBook] = useState<Book>(books.Genesis);
    const [chapter, setChapter] = useState<number>(1);
    const [data, setData] = useState<null | data>(null);

    useEffect(() => {
        GetBook(version, book).then((chapter) => {
            setData(chapter as unknown as data);
        });
    }, [version, book, chapter]);

    const booksArray = Object.keys(books);

    const goToPrevious = () => {
        if (chapter > 1) {
            setChapter(chapter - 1);
        } else {
            const currentIndex = booksArray.indexOf(book);
            if (currentIndex > 0) {
                const newBook = booksArray[currentIndex - 1];
                setBook(newBook as Book);
                GetChapterCount(version, newBook as Book).then((chapterCount) => {
                    setChapter(chapterCount);
                });
            }
        }
    };

    const goToNext = () => {
        const maxChapter = data ? data.Chapters.length : 0;
        if (chapter < maxChapter) {
            setChapter(chapter + 1);
        } else {
            const currentIndex = booksArray.indexOf(book);
            if (currentIndex < booksArray.length - 1) {
                setBook(booksArray[currentIndex + 1] as Book);
                setChapter(1);
            }
        }
    };

    return (
        <div className="md:max-w-7xl mx-auto p-4 relative"> {/* Make the container relative */}
            <Navbar/>
            <div className="flex justify-between">
                <div className="flex space-x-0.5 justify-center md:justify-normal">
                    <SelectBook version={version} book={book} setBook={setBook}/>
                    <SelectChapter book={book} version={version} chapter={chapter} setChapter={setChapter}/>
                    <SelectVersion version={version} setVersion={setVersion}/>
                </div>
            </div>
            {/* horizontal break */}
            <hr className="my-4"/>
            <div className="md:max-w-7xl mx-auto relative flex">
                <div className="hidden md:flex items-center justify-center">
                    <button
                        className="bg-blue-500 rounded-full h-12 w-12 hover:bg-blue-700 text-white md:block font-bold py-2 px-4 "
                        onClick={goToPrevious}>
                        &lt;
                    </button>
                </div>
                {data && data.Chapters && chapter - 1 < data.Chapters.length && (
                    <div className="md:w-1/2 mx-auto overflow-y-auto">
                        <h1 className="text-3xl font-semibold py-2">{book} {chapter}</h1>
                        {data.Chapters[chapter - 1].Verses.map((verse: VerseI) => {
                            return (
                                <Verse verse={verse}/>
                            );
                        })}
                    </div>
                )}
                <div className="hidden md:flex items-center justify-center">
                    <button
                        className="bg-blue-500 rounded-full h-12 w-12 hover:bg-blue-700 text-white md:block font-bold py-2 px-4 "
                        onClick={goToNext}>
                        &gt;
                    </button>
                </div>
            </div>
            <div className="text-gray-400 text-center text-lg py-2 flex flex-col">
                SimplyBible - Made with ❤️ by <a href="github.com/torbenconto">Torben Conto</a>
                <a href="https://tconto.tech">My Website</a>
            </div>

            <div className="fixed bottom-0 left-0 w-full flex justify-between p-4 md:hidden mb-5">
                <button
                    className="bg-blue-500 rounded-full h-12 w-12 hover:bg-blue-700 text-white font-bold py-2 px-4 "
                    onClick={goToPrevious}>
                    &lt;
                </button>
                <button
                    className="bg-blue-500 rounded-full h-12 w-12 hover:bg-blue-700 text-white font-bold py-2 px-4 "
                    onClick={goToNext}>
                    &gt;
                </button>
            </div>
        </div>
    );

}

export default App;
