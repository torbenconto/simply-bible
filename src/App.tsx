import Navbar from "./components/Navbar.tsx";
import {useEffect, useState} from "react";
import books, {Book} from "./bible/books.ts";
import versions, {Version} from "./bible/versions.ts";
import SelectVersion from "./components/SelectVersion.tsx";
import SelectBook from "./components/SelectBook.tsx";
import SelectChapter from "./components/SelectChapter.tsx";
import {GetBook} from "./bible/bible.ts";
import VerseI from "./bible/verse.ts";
import Verse from "./components/Verse.tsx";

function App() {
    const [version, setVersion] = useState<Version>(versions.NIV);
    const [book, setBook] = useState<Book>(books.Genesis);
    const [chapter, setChapter] = useState<number>(1);
    const [data, setData] = useState<null | string>(null);

    useEffect(() => {
        GetBook(version, book).then((chapter) => {
            setData(chapter);
        });
    }, [version, book, chapter]);

  return (
    <div className="md:max-w-7xl mx-auto p-4">
      <Navbar />
        <div className="flex space-x-0.5 justify-center md:justify-normal">
            <SelectBook book={book} setBook={setBook} />
            <SelectChapter book={book} version={version} chapter={chapter} setChapter={setChapter} />
            <SelectVersion version={version} setVersion={setVersion} />
        </div>
        {data && (
                <>
                    <h1 className="text-2xl font-semibold py-2">{book} {chapter}</h1>
                        {data.Chapters[chapter - 1].Verses.map((verse: VerseI) => {
                            return (
                                <Verse verse={verse} />
                            )
                        })}
                </>
        )}
    </div>
  )
}

export default App
