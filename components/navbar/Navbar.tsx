import React from 'react'
import ThemeToggler from './ThemeToggler'
import { Book } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='inset-x-0 h-fit z-[10] border-b py-2 border-zinc-300'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <div className='flex items-center gap-x-2'>
          <Book strokeWidth={"3"}/>
          <h1 className='text-3xl font-bold'>BooksAI</h1>
        </div>
        <ThemeToggler />
      </div>
    </nav>
  )
}

export default Navbar