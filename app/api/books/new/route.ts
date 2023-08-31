import { connectToDb } from "@/lib/db/database";
import BookResponse from "@/lib/db/models/bookResponse";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const {  id, promptSummary, books } = await request.json();

    try {
        await connectToDb();
        const newPrompt = new BookResponse({ creator: id, promptSummary, books });

        await newPrompt.save();
        return new NextResponse(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new NextResponse("Failed to create a new BookResponse", { status: 500 });
    }
}