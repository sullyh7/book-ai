"use client";

import React from 'react'
import ThemeToggler from './ThemeToggler'
import { Book, LogOut } from 'lucide-react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const {data: session} = useSession();

  return (
    <nav className='inset-x-0 h-fit z-[10] border-b py-2 border-zinc-300'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <div className='flex items-center gap-x-2'>
          <Book strokeWidth={"3"}/>
          <h1 className='text-3xl font-bold'>BooksAI</h1>
        </div>
        <div className='flex gap-x-3'>
        <ThemeToggler />
        {session && 
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image className='hover:cursor-pointer rounded' src={session.user.image!} alt={session.user.name!} height={45} width={45}/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {signOut()}}>
          <LogOut className="hover:cursor-pointer mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
        }
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar