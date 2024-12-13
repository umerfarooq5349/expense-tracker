import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const navData = [
        {
            name: 'Summary',
            href: '/summary',
        },
        {
            name: 'Add Transection',
            href: '/addTransactions',
        },

    ]

    return (
        <div className="fixed z-50 w-5/6 text-xl font-bold  flex-none transition-colors mt-4 ">
            <div className="px-4 flex justify-between items-center">
                <div>
                    <a href={'/'} className="font-jostBold text-4xl text-green hover:text-yellow">
                        Expense Tracker
                    </a>

                </div>
                <div className="flex justify-around">
                    {navData.map((n, index) => {
                        return (
                            <Link to={n.href} key={index} className="mx-4 font-jostRegular text-2xl text-green hover:text-yellow hover:underline hover:underline-offset-8 transition">
                                {n.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Navbar