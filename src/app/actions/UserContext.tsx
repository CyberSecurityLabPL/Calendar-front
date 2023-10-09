import { createContext, useState, useContext } from "react";
import { MyInfo } from "../hooks/user-info/types";


type UserContextType = {
    user: MyInfo | null;
    setUser: (user: MyInfo | null) => void;
};


export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: { children: React.ReactNode } ) {
    const [user, setUser] = useState<MyInfo | null>(null);
    const saveUser = (user: MyInfo | null) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const getUser = () => {
        if (user) {
          return user;
        }

        const localStorageUser = localStorage.getItem('user');
    
        if (localStorageUser) {
          return JSON.parse(localStorageUser);
        }
    
        return null;
      };

    return (
        <UserContext.Provider value={{
            user: getUser(),
            setUser: saveUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}
