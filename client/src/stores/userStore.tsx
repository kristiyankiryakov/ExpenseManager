import axios from 'axios'
import {create} from 'zustand'

type User = {
    active: boolean,
    roles: string[],
    username: string,
    __v: number,
    _id: string
}

type UserStore = {
    user: User | null
    setUser: (user: User) => void
    reFetchUser: (token: string) => void
}

const useUserStore = create<UserStore>()((set) => ({
    user: null,

    setUser: (user: User) => set(() => ({user: user})),

    reFetchUser: async (token) => {
        try {
            const result = await axios.get('https://expense-manager-server.vercel.app/auth/refresh', {headers: {'Authorization': `Bearer ${token}`}, withCredentials: true});
            set({user: result.data.userData});
        } catch (err) {
            console.log(err);
        }
    },
}));

export default useUserStore;