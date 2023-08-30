export interface Book {
    title: string,
    description: string,
}

export interface BookResponse {
    promptSummary: string,
    books: Book[],
}

