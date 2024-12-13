import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navData = [
        {
            name: 'Summary',
            href: '/summary',
        },
        {
            name: 'Add Transaction',
            href: '/addTransactions',
        },
    ];

    return (
        <div className="fixed z-50 w-full text-xl font-bold flex-none transition-colors mt-4 bg-white">
            <div className="px-4 flex justify-between items-center">
                <div>
                    <a href={'/'} className="font-jostBold text-4xl text-green hover:text-yellow">
                        Expense Tracker
                    </a>
                </div>

                <div className="flex md:hidden">
                    <button
                        className="text-4xl text-green hover:text-yellow"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>

                <div className={`flex flex-col md:flex-row md:justify-around ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    {navData.map((n, index) => (
                        <Link
                            to={n.href}
                            key={index}
                            className="mx-4 font-jostRegular text-2xl text-green hover:text-yellow hover:underline hover:underline-offset-8 transition"
                        >
                            {n.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
