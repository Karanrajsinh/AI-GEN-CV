"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import supabase from "@/services/supabase";


type UserContextProps =
    {
        isLoading: boolean,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
        login: boolean,
        setLogin: React.Dispatch<React.SetStateAction<boolean>>,
        email: string,
        setEmail: React.Dispatch<React.SetStateAction<string>>
        userID: string,
        setUserID: React.Dispatch<React.SetStateAction<string>>,
        name: string,
        userImg: string,
    }


const UserContext = createContext<UserContextProps | null>(null);


function UserDetailsProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [userID, setUserID] = useState("");
    const [name, setName] = useState('')
    const [userImg, setUserImg] = useState('');


    useEffect(() => {

        supabase.auth.getUser().then(({ data }) => {
            {
                console.log(data);
                setLogin(Boolean(data.user))
                if (data.user) {
                    setEmail(data.user.email || '')
                    setUserID(data.user.id)
                    setName(data.user.user_metadata.name)
                    setUserImg(data.user.user_metadata.picture)
                }
            }
        })
    })




    return (
        <UserContext.Provider
            value={{
                userImg,
                userID,
                setUserID,
                name,
                login,
                setLogin,
                email,
                setEmail,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

function useUserDetails() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserDetails must be used within a UserDetailsProvider");
    }
    return context;
}

/*eslint-disable */
export { UserDetailsProvider, useUserDetails };