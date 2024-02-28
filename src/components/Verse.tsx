import { useState } from "react";
import VerseI from "../bible/verse.ts";
import Modal from "./Modal.tsx";
import {Explain} from "../bible/api.ts";
import {Version} from "../bible/versions.ts"; // Import your Modal component here

function Verse({ verse, version }: { verse: VerseI, version: Version}) {
    const verseNumber = verse.Name.split(":")[1];
    const [modalOpen, setModalOpen] = useState(false);
    const [explanation, setExplanation] = useState<string>(""); // Create a state for the explanation

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const generateExplanation = () => {

        Explain(verse.Name, version).then((explanation) => {
            setExplanation(explanation);
        });
    }

    return (
        <>
            <span className="text-lg px-0.5 hover:underline" onClick={openModal}>
                {verse.Text}
                <span className="text-xs pl-0.5 text-gray-400">{verseNumber}</span>
            </span>
            {modalOpen && (
                <Modal onClose={closeModal}>
                    <h1 className="text-3xl font-semibold py-2">{verse.Name}</h1>
                    <p>{verse.Text}</p>
                    <h1 className="text-3xl font-semibold mt-4">✨ Ai Explanation</h1>
                    {explanation ? (
                        <p>{explanation}</p>
                    ) : (
                        <button className="bg-blue-500 rounded-full h-12 hover:bg-blue-700 text-white md:block font-bold py-2 px-4 " onClick={generateExplanation} >
                            Generate
                        </button>
                        )}

                </Modal>
            )}
        </>
    );
}

export default Verse;
