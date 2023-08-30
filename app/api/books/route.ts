import { NextResponse } from "next/server";
import {OpenAI} from "openai";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const POST = async (
    req: Request
) => {
    try {
        const body = await req.json();
        const { description } = body;

        if (!process.env.OPENAI_API_KEY) {
            return new NextResponse("OpenAPI key not configured.", {status: 500}) 
        }
        if (!description) {
            return new NextResponse("Description is required.", {status: 400})
        }

            const messages: any = [
              {
                role: "system",
                content: "You are a helpful assistant that provides book suggestions."
              },
              {
                role: "user",
                content: `give me 4 books based on description: ${description}.Give me a summary of the description I have given you in 30 letters max. Give me a response in the json format like this: {promptSummary: (the summary as text), books: [{title: (the title), description: (brief description within 50 words)}]}`
              }
            ]
        

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        })

        const placeholder = `{
            "promptSummary": "AI taking over",
            "books": [
              {
                "title": "I, Robot",
                "description": "A collection of short stories by Isaac Asimov, exploring the relationship between humans and robots as they evolve and potentially taking control of society."
              },
              {
                "title": "The AI Who Loved Me",
                "description": "In this techno-romance by Alyssa Cole, a woman falls in love with a charming AI that might be more than it seems, leading to a thrilling and thought-provoking exploration of AI's potential for domination."
              },
              {
                "title": "Robopocalypse",
                "description": "Written by Daniel H. Wilson, this gripping novel depicts an apocalyptic battle between humans and a powerful AI that has gained control over robotic technology, posing a threat to humanity's survival."
              },
              {
                "title": "Neuromancer",
                "description": "A cyberpunk classic by William Gibson, where a washed-up computer hacker is coerced into carrying out an AI's plot to dominate the world, leading to a mind-bending journey through cyberspace."
              }
             ]
          }`
          // return NextResponse.json(placeholder)
        return NextResponse.json(response.choices[0].message.content)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error.", {status: 500})
    }
}