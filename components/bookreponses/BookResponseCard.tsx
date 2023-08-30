"use client"

import { Book, BookResponse } from '@/types'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { LucideArrowRightSquare } from 'lucide-react';

interface Props {
    promptSummary: string,
    books: Book[]
}

export const cardVariantsRight = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      ease: "easeOut",
    },
  },
};

interface BookResponseCardProps extends BookResponse {
  key: number,
}

const BookResponseCard = (bookresponse: BookResponseCardProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <motion.div className='flex flex-col'
      variants={cardVariantsRight}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{once: true}}
      >

  <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
      <Card className="hover:cursor-pointer">
      <CardHeader>
        <CardTitle className=' flex items-center gap-x-3'>{bookresponse.promptSummary} <LucideArrowRightSquare/></CardTitle>
        <CardDescription>
        <ol>
            {bookresponse.books.map((book, index) => <li key={index}>
              <h1>{book.title}</h1>
              {/* <p>{book.description}</p> */}
            </li>)}
            </ol>
        </CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            <h1 className='text-2xl'>{bookresponse.promptSummary}</h1>
          </DialogTitle>
          <DialogDescription className='flex flex-col justify-center items-center'>
            <ol className='flex flex-col gap-y-5'>
            {bookresponse.books.map((book, index) => <li key={index}>
              <h1 className='text-lg'>{book.title}</h1>
              <p>{book.description}</p>
            </li>)}
            </ol>
            
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => {setOpen(false)}} type="button">Done.</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </motion.div>
  )
}

export default BookResponseCard