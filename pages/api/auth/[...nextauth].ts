import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {AuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth/next";
import bcrypt from 'bcrypt';
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email : {label : 'email', type: 'text'},
                password: {label: 'password', type: 'password'},
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credntials') // if user forget to pass the email and password we show him the Error
                }
                const user = await prisma.user.findUnique({ 
                    // we find the user by credentials email
                    where: {
                        email: credentials.email
                    }
                });
                if(!user || !user?.hashedPassword){
                    // if the user not exist or the user make mistake in hashpassword, login we show him the error
                    throw new Error("Invalid credentials")
                }
                
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                if(!isCorrectPassword){
                    // we throw an Error because the password that user enterd does not match with the
                    // hashpassword in database
                    throw new Error("Invalid Credentials")
                }

                return user; // if the user passed all the validation then we can safe to give the user back to client
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);