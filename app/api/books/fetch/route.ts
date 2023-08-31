import { connectToDb } from "@/lib/db/database";
import BookResponse from "@/lib/db/models/bookResponse";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const {  id } = await request.json();

    try {
        await connectToDb();

        const responses = await BookResponse.find({id})
        return new NextResponse(JSON.stringify(responses), { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to create a new BookResponse", { status: 500 });
    }
}