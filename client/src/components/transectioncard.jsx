import React from 'react';

function Transection({ transection, onDelete }) {

    return (
        <div className="max-w-sm  rounded-xl shadow-lg bg-white border-2 border-yellow m-6 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="p-6 space-y-6">

                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-black">{transection.title}</h2>
                    <span className="text-2xl font-semibold text-green">${transection.amount}</span>
                </div>


                <div className="flex items-center justify-start">
                    <span className="bg-green text-white py-1 px-3 rounded-full text-sm font-medium">
                        {transection.category}
                    </span>
                </div>


                <hr className="border-t-2 border-gray-light" />

                <div className="space-y-2 text-sm text-gray-light">
                    <p className="flex items-center space-x-2">
                        <span className="font-medium text-black">Type:</span>
                        <span className="text-black">{transection.type}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                        <span className="font-medium text-black">Date:</span>
                        <span className="text-black">{transection.date}</span>
                    </p>
                </div>


                <button onClick={onDelete}

                    type="button"
                    className="w-full py-3 px-4 bg-black text-yellow font-bold rounded-lg shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Transection;
