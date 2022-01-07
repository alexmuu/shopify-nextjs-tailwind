import React from 'react'
import Nav from './nav'

export default function Layout({ children }) {
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <Nav />
            <main>
                {children}
            </main>
            <footer>
                Footer Yeet
            </footer>
        </div>
    )
}
