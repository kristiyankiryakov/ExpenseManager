import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {setAuthorizationToken} from "../helpers/axios";
import useUserStore from "../stores/userStore";
import {toast} from "react-toastify";

const Login = () => {
    const setUser = useUserStore((state) => state.setUser);
    const [userData, setUserData] = useState({username: '', password: ''});
    const navigate = useNavigate();
    const login = async () => {
        try {
            const result = await axios.post('http://localhost:3500/auth', userData)
            const token = result.data.refreshToken;
            setAuthorizationToken(token);
            Cookies.set('jwt', token);
            setUser(result.data.userData);
            navigate('/');
        } catch (err) {
            toast.error('Wrong username or password', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
                autoClose: 2000,
                toastId: "register-succ"
            });
        }
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Flowbite
                    </a> */}
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                <input value={userData.username} onChange={(e) => setUserData(prev => ({...prev, username: e.target.value}))}
                                    type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" placeholder="username" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input value={userData.password} onChange={(e) => setUserData(prev => ({...prev, password: e.target.value}))}
                                    type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" required />
                            </div>
                            <button onClick={() => login()} type="submit" className="w-full text-white   bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a onClick={() => navigate('/register')} className="font-medium text-lime-600 hover:underline dark:text-lime-500">Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login