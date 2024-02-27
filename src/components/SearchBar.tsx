function SearchBar() {
    return (
        <div className="flex items-center p-2 bg-white rounded-full border border-gray-400">
            <input type="text" placeholder="Search Bible" className="p-2 outline-none rounded-full flex-grow" />
            <button className="bg-blue-400 text-white p-2 rounded-full ml-2">
                {/* search icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                </svg>
            </button>
        </div>
    );
}

export default SearchBar;
