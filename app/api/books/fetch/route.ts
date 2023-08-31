import { connectToDb } from "@/lib/db/database";
import BookResponse from "@/lib/db/models/bookResponse";
import User from "@/lib/db/models/user";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const { email } = await request.json();
    
    try {
        await connectToDb();
        const user = await User.findOne({email});
        if (!user) {
            return new NextResponse("No user with this email", {status: 500});
        }
        console.log(user._id)
        const responses = await BookResponse.find({creator: user._id});
        return new NextResponse(JSON.stringify(responses), { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to create a new BookResponse", { status: 500 });
    }
}