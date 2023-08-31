"use client";

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import axios  from "axios";
import { useBookResponseStore } from '@/store/BookStore';
import { Book, BookResponse } from '@/types';
import { useToast } from '../ui/use-toast';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
    description: z.string().min(10, {message: "You need at least 10 characters minimum."})
        .max(200, {message: "You have exceeded the maxnimum number of characters (200)"}),
  })

const BookForm = () => {
    const router = useRouter();
    const { addBookResponse } = useBookResponseStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {data: session} = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          description: "",
        },
    })

    const { toast } = useToast();

    async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log("Form submitting")
      try{
        setIsLoading(true);
        const response = await axios.post("/api/books", {description: values.description}) 
        const body = await response.data;
        const json = JSON.parse(body) as BookResponse;
        addBookResponse(json)
          toast({
            title: "Books generated successfully"
          })
          console.log(session?.user.email)
        const dbResponse = await axios.post("/api/books/new", {
          id: session?.user.email,
          promptSummary: json.promptSummary,
          books: json.books
        })
      } catch (error) {
          console.log(error)
          toast({
            title: "Error",
            description: "Unknown error occured.",
          })
      } finally {
        setIsLoading(false);
        router.refresh();
      }
        
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about a story you want to read..."
                  className="resize-none text-lg"
                  {...field}
                />
              </FormControl>
              <FormDescription className='text-lg'>
                Powered by GPT-3.5
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading || form.formState.isLoading} type="submit">
          {isLoading || form.formState.isLoading ? "Fetching suggestions" : "Get Suggestions."}
        </Button>
      </form>
    </Form>
  )
}

export default BookForm