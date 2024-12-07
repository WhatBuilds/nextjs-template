'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { userSignIn } from "../api/auth";
import { useMutationHandler } from "../hooks/useMutationHandler";

export const page=()=>{
    const router = useRouter();


    //example mutation function
    const loginMutation = useMutationHandler(userSignIn, {
        apiTitle:'Login',
        successMessage: 'Logged in successfully!',
        errorMessage: 'Login failed. Please try again.',
        onSuccess:()=>{
          router.push('/')
        }
        //more props can be passed as per requirement
    });


    // function to call on user click
    const handleUserLogin = (values) => {
        const { email, password } = values;
        const isEmail = email.includes("@");
    
        const data = isEmail
          ? { email, password }
          : { username: values.username, password };
    
        // calls your mutation function
        loginMutation.mutate(data);
    };


    // this will be your isLoading state 
    loginMutation.isLoading

    return (
        <>
            Design with proper components
        </>
    )
}