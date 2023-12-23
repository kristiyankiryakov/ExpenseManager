import useUserStore from "../../stores/userStore"
import HomeChart from "../Home/HomeChart"

export const Index = () => {

    const user = useUserStore((store) => store.user);

    return (
        <div className='flex flex-col h-screen justify-between' >
            <section>
                <p className="text-lime-500 text-center font-bold text-2xl pt-3" >Personal Details</p>

                <div className="pt-3" >
                    <div className="pl-5" >
                        <label htmlFor="first_name" className="block mb-2 text-md font-medium text-lime-500 ">Username</label>
                        <div className="w-8/12 " >
                            <input value={user?.username} type="text" id="first_name" className="bg-gray-50 border disabled border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" required />
                        </div>
                    </div>
                </div>
            </section>
            <div className="pb-3">
                <HomeChart />
            </div>
        </div>
    )
}

