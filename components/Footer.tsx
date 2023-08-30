import { Book, Twitter, TwitterIcon } from 'lucide-react'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'

const Footer = () => {
  return (

    <div className='inset-x-0 h-fit z-[10] border-t border-zinc-300'>
        <div className='p-10 container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
            <div className='flex items-center gap-x-2'>
                <Book size={"50"} strokeWidth={"3"}/>
                <div>
                <h1 className='text-2xl font-bold'>BooksAI</h1>
                <p>2023</p>
                </div>
                
            </div>
            <Link href={"https://twitter.com/7sullyh"}>
                <TwitterIcon size={30}/>
            </Link>
        </div>
    </div>
  )
}

export default Footer