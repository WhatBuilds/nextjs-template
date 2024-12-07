'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { userSignIn } from "../api/auth";
import { useMutationHandler } from "../hooks/useMutationHandler";

export const page=()=>{
    const router = useRouter();

    const loginMutation = useMutationHandler(userSignIn, {
        apiTitle:'Login',
        successMessage: 'Logged in successfully!',
        errorMessage: 'Login failed. Please try again.',
        onSuccess:()=>{
          router.push('/')
        }
    });

    const handleUserLogin = (values) => {
        const { email, password } = values;
        const isEmail = email.includes("@");
    
        const data = isEmail
          ? { email, password }
          : { username: values.username, password };
    
        loginMutation.mutate(data);
    };

    return (
        <>

            //loginMutation.isLoading----this will be your isLoading state 


            //Design with proper components
        </>
    )
}