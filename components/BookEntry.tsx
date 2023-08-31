"use client";
import React from 'react'
import BookForm from './form/BookForm'
import BookResponseContainer from './bookreponses/BookResponseContainer'
import LoginForm from './form/LoginForm';
import { useSession } from 'next-auth/react';

const BookEntry = () => {
    const session = useSession();
  return <> 
  {session.data?.user ? <>
    <BookForm/>
    <BookResponseContainer />
  </>
  :
  <><LoginForm/></>}
    
  </>
    
}

export default BookEntry