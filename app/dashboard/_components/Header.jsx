"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'

function Header({ toggleSideNav, isSideNavVisible }) {
    return (
        <div className='p-1 px-5 flex items-center justify-between shadow-md'>
            <div className='flex items-center gap-3'>
                <Image src={'/logo.png'} alt='logo' width={120} height={120}></Image>
            </div>
            <div className='flex gap-3 items-center'>
                <UserButton />
                {/* Hamburger Menu for smaller screens */}
                <button
                    onClick={toggleSideNav}
                    className="lg:hidden p-2 text-gray-700 hover:text-black"
                >
                    {isSideNavVisible ? <X /> : <Menu />}
                </button>
            </div>
        </div>
    )
}

export default Header
