import { NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import User from "./db/models/user";
import { connectToDb } from "./db/database";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
        })
    ],
    callbacks: {
        async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDb();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
     
        async session({token, session}) {
            
            // const sessionUser = await User.findOne({ email: session.user.email });
            // session.user.id = sessionUser._id.toString();
            if (token) {
              session.user.id = token.id;
            }
            return session;
        },
        
    },
}
