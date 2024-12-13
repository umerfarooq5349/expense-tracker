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
        <div className="fixed z-50 w-5/6 text-xl font-bold flex-none transition-colors mt-4 ">
            <div className="px-4 flex justify-between items-center py-4">
                {/* Logo */}
                <div>
                    <a href={'/'} className="font-jostBold text-4xl text-green hover:text-yellow transition duration-300">
                        Expense Tracker
                    </a>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-4xl text-green hover:text-yellow focus:outline-none"
                    >
                        {isMenuOpen ? '×' : '☰'}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    {navData.map((n, index) => (
                        <Link
                            to={n.href}
                            key={index}
                            className="text-2xl text-green hover:text-yellow hover:underline hover:underline-offset-8 transition duration-300"
                        >
                            {n.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Slide-out Menu */}
            <div
                className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            >
                <div
                    className={`fixed left-0 top-0 w-2/3 bg-white h-full p-6 transition-transform duration-300 ${isMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
                        }`}
                >
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-4xl text-green hover:text-yellow"
                        >
                            ×
                        </button>
                    </div>
                    <div className="mt-8 space-y-4">
                        {navData.map((n, index) => (
                            <Link
                                to={n.href}
                                key={index}
                                className="block text-3xl text-green hover:text-yellow hover:underline transition duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {n.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
