import {useCallback, useEffect, useState} from "react"
import {BiDollar, BiCategory} from "react-icons/bi";
import {MdOutlineFastfood} from "react-icons/md";
import {AiOutlineAppstoreAdd} from "react-icons/ai";
import {Datepicker} from 'flowbite-react';
import {useUser} from "../context/userContext";
import {Modal} from 'flowbite'
import axios from "axios";
import Cookies from "js-cookie";


const AddExpense = () => {
    const {user} = useUser();
    const [selectedDate, setSelectedDate] = useState(new Date());
    // const [selectedCategory, setSelectedCategory] = useState(null);
    const [amount, setAmount] = useState(5);
    const [filter, setFilter] = useState("");


    const addExpense = useCallback(async () => {
        const config = {
            withCredentials: true,
            headers: {'authorization': `Bearer ${Cookies.get('jwt')}`}
        }
        const payload = {user: user, date: selectedDate, amount, category: 'Other', description: 'asd'}
        await axios.post('http://localhost:3500/expense', payload, config);

    }, [amount, selectedDate, user]);

    const getUserExpenses = useCallback(async () => {
        const config = {
            withCredentials: true,
            headers: {'authorization': `Bearer ${Cookies.get('jwt')}`},
            params: {
                userId: user?._id,
                period: 'day'
            }
        }
        const result = await axios.get(`http://localhost:3500/expense`, config);
        console.log(result);
    }, [])

    useEffect(() => {
        getUserExpenses();

    }, []);



    return (
        <main className="bg-slate-900 flex flex-col h-screen justify-between">
            <div className="flex-col space-y-10" >
                <section className="flex w-[95%] justify-around m-auto mt-10">
                    <div className="relative w-[25%]">
                        <input min={0} value={amount} onChange={(event) => setAmount(event.target.valueAsNumber)}
                            className={`w-full outline-none text-lg text-center bg-gray-700 p-2 rounded-xl text-stone-100 font-medium placeholder-stone-200`}
                            type="number" placeholder="5.99" />
                        <div className="absolute top-2.5 left-0 text-stone-300 m-0 p-0">
                            <BiDollar size={24} />
                        </div>
                    </div>
                    <div className="relative">
                        <input className={`w-full bg-gray-700 outline-none text-lg text-center p-2  text-stone-100 rounded-xl placeholder-stone-200`} type="text"
                            onChange={(e) => setFilter(e.target.value)} placeholder="Search Category" />
                        <div className="absolute top-2 left-2" >
                            <BiCategory size={30} color="white" />
                        </div>
                    </div>
                </section>

                {/* Category Section */}
                <div className="grid grid-cols-4 w-[95%] m-auto border border-gray-600 rounded-xl bg-slate-800 h-44 overflow-y-auto" >
                    <div className="flex-col space-y-1 justify-center items-center my-2" >
                        <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                            <MdOutlineFastfood size={30} color="white" />
                        </div>
                        <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                            <p className="text-center text-gray-300" >Food</p>
                        </div>
                    </div>

                    <div onClick={() => setVisible(true)} className="flex-col space-y-1 justify-center items-center my-2 col-start-4" >
                        <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                            <AiOutlineAppstoreAdd size={30} color="white" />
                        </div>
                        <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                            <p className="text-center text-gray-300" >Add</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="w-[95%] my-2 mx-auto" >
                <Datepicker autoHide onSelectedDateChanged={(d) => setSelectedDate(d)} />
            </section>

            <section className="w-[95%] mx-auto" >
                <button onClick={addExpense} type="button" className="w-full text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-800 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add</button>            {/* </section> */}
            </section>
            <section className="mb-4 w-full m-auto h-60 max-h-80 overflow-y-auto" >
                {/* Single expense */}
                <div className="w-[95%] m-auto border-b border-gray-500 relative">
                    <div className="flex justify-between items-center px-6 mb-2 mt-1">
                        <div className="flex space-x-4 justify-center items-center my-2" >
                            <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                                <MdOutlineFastfood size={30} color="white" />
                            </div>
                            <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                                <p className="text-center text-gray-300" >Food</p>
                            </div>
                        </div>

                        <h3 className="text-white text-lg font-medium" >$ 432.32</h3>
                    </div>
                    <div className="flex space-x-2 absolute right-5 top-12" >
                        <p className="text-gray-600 text-xs text-center" >16:30</p>
                        <p className="text-gray-600 text-xs text-center" >16/09/2023</p>
                    </div>
                </div>

            </section>

            <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button>

            <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                            <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default AddExpense