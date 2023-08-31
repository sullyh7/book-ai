import BookEntry from '@/components/BookEntry'
import BookForm from '@/components/form/BookForm'
import BookResponseContainer from '@/components/bookreponses/BookResponseContainer'
import React from 'react'

const Home = () => {
  return (
    <div className='flex gap-y-20 items-center flex-col'>
      <div className='flex flex-col items-center gap-y-3'>
        <h1 className='text-5xl font-bold'>
        Find the perfect book for you.
        </h1>
        <p className='text-gray-400'>Type a breif description of a story your looking for.</p>
      </div>
      

      <div className='w-full flex flex-col gap-y-10'>
        <BookEntry />
      </div>
      
    </div>
  )
}

export default Home