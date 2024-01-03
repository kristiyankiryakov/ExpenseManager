import { create } from 'zustand'
import Cookies from 'js-cookie'
import { axiosInstance } from '../helpers/axios'

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
    reFetchUser: () => void
}

const useUserStore = create<UserStore>()((set) => ({
    user: null,

    setUser: (user: User) => set(() => ({ user: user })),

    reFetchUser: async () => {
        try {
            const result = await axiosInstance.get('/auth/refresh')
            set({ user: result.data.userData });
        } catch (err) {
            Cookies.remove('jwt');
            set({ user: null });
        }
    },
}));

export default useUserStore;