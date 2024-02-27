import VerseI from "../bible/verse.ts"

function Verse({verse}: {verse: VerseI}) {
    const verseNumber = verse.Name.split(":")[1];

    return (
        <span className="text-sm px-0.5">{verse.Text}<span className="text-xs pl-0.5 text-gray-400">{verseNumber}</span></span>
    );
}

export default Verse;