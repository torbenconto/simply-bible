import React, { useEffect, useState } from "react";
import { Book } from "../bible/books.ts";
import { GetChapterCount } from "../bible/api.ts";
import { Version } from "../bible/versions.ts";

function SelectChapter({ book, chapter, version, setChapter }: { book: Book, chapter: number, version: Version, setChapter: React.Dispatch<React.SetStateAction<number>> }) {
    const [chapterCount, setChapterCount] = useState<number>(0);

    useEffect(() => {
        GetChapterCount(version, book).then((count) => {
            setChapterCount(count);
        })
    }, [version, book]);

    return (
        <select className="p-2 text-white bg-blue-400" value={chapter} onChange={(e) => setChapter(Number(e.target.value))}>
            {Array.from({ length: chapterCount }, (_, i) => i + 1).map((chapterNumber) => (
                <option key={chapterNumber} value={chapterNumber}>{chapterNumber}</option>
            ))}
        </select>
    );
}

export default SelectChapter;