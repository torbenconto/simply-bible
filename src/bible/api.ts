import {Book} from "./books.ts";
import {Version} from "./versions.ts";
import axios from "axios";

const url = import.meta.env.DEV ? "http://localhost:8080" : "https://simply-bible-onef4nfh7q-uc.a.run.app";

export async function GetBook(version: Version, book: Book): Promise<string> {
    // Http request to get chapter
    const chapterReq = await axios.get(`${url}/book/${book}?version=${version}`)
    return chapterReq.data;
}

export async function GetBooks(version: Version): Promise<string[]> {
    // Http request to get books
    const booksReq = await axios.get(`${url}/books?version=${version}`)
    return booksReq.data;
}


export async function GetChapterCount(version: Version, book: Book): Promise<number> {
    // Http request to get chapter count
    const chapterCountReq = await axios.get(`${url}/chaptercount/${book}?version=${version}`)
    return chapterCountReq.data;
}

export async function Explain(verse: string, version: Version): Promise<string> {
    const explainReq = await axios.get(`${url}/explain/${verse}?version=${version}`)
    return explainReq.data;
}