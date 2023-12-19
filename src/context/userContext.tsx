import React, {createContext, useContext, useState} from 'react';

type Props = {
    children: JSX.Element
}
type User = {
    active: boolean,
    roles: string[],
    username: string,
    __v: number,
    _id: string
}

const UserContext = createContext<null | {
    user: null | User, setUser: React.Dispatch<React.SetStateAction<null | User>>
}>(null);

export function UserProvider({children}: Props) {
    const [user, setUser] = useState<null | User>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);

    if (context === null) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}