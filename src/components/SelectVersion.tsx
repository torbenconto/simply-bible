import React from "react";
import versions, {Version} from "../bible/versions.ts";

function SelectVersion({version, setVersion}: {version: Version, setVersion: React.Dispatch<React.SetStateAction<Version>>}) {
    return (
        <select className="rounded-r-full p-2 text-white bg-blue-400" value={version} onChange={(e) => setVersion(e.target.value as Version)}>
            {Object.entries(versions).map(([key, value]) => (
                <option key={key} value={value}>{key}</option>
            ))}
        </select>
    );
}

export default SelectVersion;