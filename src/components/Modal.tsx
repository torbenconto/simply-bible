import React from "react";

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }){
    return (
        <div
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 md:w-1/3 w-full px-4 shadow-xl rounded-t-xl bg-white border border-black h-[80vh]">
            <div className="mx-auto md:p-4 w-full h-full">
                <button className="text-gray-500 hover:text-gray-700 ml-auto text-lg" onClick={onClose}>
                    Close
                </button>
                <div className="p-4 w-full h-full">{children}</div>
            </div>
        </div>
    );
}

export default Modal;