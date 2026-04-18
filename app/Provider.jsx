"use client"
import React from 'react'
import { ThemeProvider } from './Components/theme-provider'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect } from 'react'


const Provider = ({children}) => {
 const {user,  isLoaded} = useUser()
 const createUser = useMutation(api.user.createNewUser)

  // save user data in db
 const createNewUser = async () => {
    if (!user) return;

    try {
      await createUser({
        name: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        imageUrl: user?.imageUrl || "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      createNewUser();
    }
  }, [isLoaded, user?.id]);

  return (
    <div>
       <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          > 
        
  {children}
  </ThemeProvider>
   </div>
  )
}

export default Provider