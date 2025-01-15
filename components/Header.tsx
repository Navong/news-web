'use client'

import React from 'react'
import CategorySelector from './CategorySelector'

const Header = ({category} : { category: string }) => {

    return (
        <header className="bg-gray-800">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="py-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-white mb-4">{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</h1>
                    <CategorySelector />
                </div>
            </div>
        </header>
    )
}

export default Header