import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="py-4">
            <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-blue-400 md:text-2xl text-xl font-bold mb-4 md:mb-0 md:flex-grow">SimplyBible</div>
                <div className="md:flex md:items-center mt-4 md:mt-0">
                    <div className="flex items-center p-2 bg-white rounded-full border border-gray-400">
                        <input
                            type="text"
                            placeholder="Search Bible"
                            className="p-2 outline-none rounded-full flex-grow min-w-0"
                        />
                        <button className="bg-blue-400 text-white p-2 rounded-full ml-2">
                            {/* search icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
