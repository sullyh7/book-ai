import { Book, BookResponse } from '@/types'
import { create } from 'zustand'

interface BooksState {
    bookResponses: BookResponse[],
    addBookResponse(bookResponse: BookResponse): void,
}

export const useBookResponseStore = create<BooksState>()((set) => ({
    bookResponses: [],
    addBookResponse: (bookResponse) => {
        set((state) => ({
            bookResponses: [bookResponse, ...state.bookResponses], // Using spread operator to create a new array
          }));
    }
}))