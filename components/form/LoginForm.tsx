"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { Facebook, Github, Twitter } from 'lucide-react';
import { signIn } from "next-auth/react";
import { Icons } from '../Icons';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>()
    const { toast } = useToast();

    const loginWithGithub= async () => {
        setIsLoading(true);
        try {
            await signIn("github")
            toast({
                title: "Successfully signed in with GitHub",
                variant: "default"
            })
        } catch (error) {
            toast({
                title: "Error signing in with Github",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false);
        }
    }
    
    const loginWithGoogle = async () => {
        setIsLoading(true);
        try {
            await signIn("google")
        } catch (error) {
            toast({
                title: "Error signing in with Google",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false);
        }
    } 
  return (
    <div className='flex gap-y-5  flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold'>Sign in below</h1>
        <Button onClick={loginWithGoogle} disabled={isLoading} size={"lg"} className='w-[50%] flex gap-x-2'>
            <Icons.google className='w-5 h-5'/> Google
        </Button>
    </div>
  )
}

export default LoginForm