"use client";

import { useBookResponseStore } from '@/store/BookStore';
import React, { useEffect } from 'react'
import BookResponseCard from './BookResponseCard';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { BookResponse } from '@/types';

const BookResponseContainer = () => {
  const {bookResponses, addBookResponse} = useBookResponseStore();
  const {data: session} = useSession();

  useEffect(() => {
    const fetchBookReponses= async () => {
      const response = await axios.post("/api/books/fetch", {email: session?.user.email})
      const bookResponses: [BookResponse] = response.data
      for (let bookResp of bookResponses) {
        addBookResponse(bookResp)
      }
  }
    try {
      fetchBookReponses();
    } catch (error) {
      console.log(error)
    }
  }, [addBookResponse, session?.user.email])

  return (
    <>
      {bookResponses.length > 0 ? 
      <>
        {bookResponses.map((resp, index) =>
         <BookResponseCard key={index} {...resp}/>)}
      </> 
      : 
      <><h1>No history.</h1></>}
    </>
  )
}
    
      
  

export default BookResponseContainer;