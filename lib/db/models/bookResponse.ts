import { Schema, model, models } from 'mongoose';

const BookResponseSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  promptSummary: {
    type: String,
    required: [true, 'promptSummary is required.'],
  },
  books: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
    validate: {
      validator: function (value: string | any[]) {
        return value.length > 0; // Ensure the array is not empty
      },
      message: 'At least one book is required.',
    },
  },
});

const BookResponse = models.BookResponse || model('BookResponse', BookResponseSchema);

export default BookResponse;