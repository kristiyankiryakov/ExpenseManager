import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const Register = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        roles: ['user']
    });
    const register = async () => {
        try {
            const response = await axios.post('http://localhost:3500/users', userData)

            if (response.status === 201) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                    autoClose: 2000,
                    toastId: "register-succ"
                });
                navigate('/login');
            }
        } catch (err) {
            if (err instanceof (AxiosError)) {
                toast.error(err && err.response && err.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                    autoClose: 2000,
                    toastId: "register-succ"
                });
            }

        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a> */}
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input value={userData.username} onChange={(e) => setUserData(prev => ({ ...prev, username: e.target.value }))} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" placeholder="Ilonka" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input value={userData.password} onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" required />
                        </div>
                        {/* <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-lime-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-lime-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-lime-600 hover:underline dark:text-lime-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div> */}
                        <button onClick={register} className="w-full text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">Create an account</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <a onClick={() => navigate('/login')} className="font-medium text-lime-600 hover:underline dark:text-lime-500">Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register