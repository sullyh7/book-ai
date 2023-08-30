"use client";

import { useBookResponseStore } from '@/store/BookStore';
import React from 'react'
import BookResponseCard from './BookResponseCard';

const BookResponseContainer = () => {
  const bookResponses = useBookResponseStore(store => store.bookResponses);

  return (
    <>
      {bookResponses.length > 0 ? 
      <>
        {bookResponses.map((resp, index) =>
         <BookResponseCard key={index} {...resp}/>)}
      </> 
      : 
      <><h1></h1></>}
    </>
  )
}
    
      
  

export default BookResponseContainer;