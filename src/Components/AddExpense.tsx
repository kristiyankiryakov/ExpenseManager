import {useEffect, useState, } from "react"
import {BiDollar, BiCategory} from "react-icons/bi";
import {icons} from "../helpers/icons.tsx";
import {AiOutlineAppstoreAdd} from "react-icons/ai";
import {useUser} from "../context/userContext";
import axiosInstance from "../helpers/axios";
import Category from "../interfaces/Category.ts";
import Period from "../enums/ExpensePeriod.ts"
import Expense from "../interfaces/Expense.ts";
// import {toast} from "react-toastify";

import {Modal, Datepicker, Button} from 'flowbite-react';



const AddExpense = () => {
    const {user} = useUser();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
    const [amount, setAmount] = useState(5);
    const [filter, setFilter] = useState("");
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [newCategory, setNewCategory] = useState("");
    const [userCategories, setUserCategories] = useState<null | Category[]>(null);
    const [dailyExpenses, setDailyExpenses] = useState<null | Expense[]>(null)

    const addExpense = async () => {
        console.log(selectedCategory)
        console.log(selectedDate);
        console.log(userCategories)
        if (typeof selectedCategory === 'number' && selectedDate && userCategories) {
            const payload = {user: user, date: selectedDate, amount, category: userCategories[selectedCategory].name, description: 'asd'}
            await axiosInstance.post('/expense', payload);
            await getUserExpenses(Period.DAY);
            setSelectedCategory(null);
        } else {
            console.log("SELECT")
        }
    };

    const getUserExpenses = async (period: Period) => {
        const params = {
            userId: user?._id,
            period: period
        }
        const response = await axiosInstance.get(`/expense`, {params});
        setDailyExpenses(response.data);
    }
    const addCategory = async () => {
        const payload = {user: user, categoryName: newCategory}
        await axiosInstance.post('/category', payload);
        getCategories();
    }
    const getCategories = async () => {
        const params = {userId: user?._id, }
        const userCategoriesResponse = await axiosInstance.get(`/category`, {params});

        setUserCategories(userCategoriesResponse.data);
    }
    const selectCategory = (index: number) => {
        selectedCategory == index ? setSelectedCategory(null) : setSelectedCategory(index);
    }

    useEffect(() => {
        getUserExpenses(Period.DAY);
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search Category" />
                        <div className="absolute top-2 left-2" >
                            <BiCategory size={30} color="white" />
                        </div>
                    </div>
                </section>

                {/* Category Section */}
                <div className="grid grid-cols-4 w-[95%] m-auto border border-gray-600 rounded-xl bg-slate-800 h-44 overflow-y-auto scroll-smooth" >
                    {userCategories && userCategories.map((category, i) => {
                        return (
                            <div onClick={() => selectCategory(i)} key={category.name} className="flex-col space-y-1 justify-center items-center my-2" >
                                <div className={`p-2 rounded-lg w-fit m-auto ${i === selectedCategory ? 'bg-green-800' : 'bg-lime-500'}`} >
                                    <span>{icons[category.name]}</span>
                                </div>
                                <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                                    <p className="text-center text-gray-300" >{category.name}</p>
                                </div>
                            </div>
                        )
                    })}


                    <div onClick={() => setOpenModal('dismissible')} className="flex-col space-y-1 justify-center items-center my-2 col-start-4" >
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
                <p className="text-center text-white" >Your Daily Expenses Will Display below.</p>

            </section>

            <section className="mb-4 w-full mx-auto h-60 max-h-80 overflow-y-auto" >
                {/* Single expense */}
                {dailyExpenses && dailyExpenses.map((expense, i) => {
                    const date = new Date(expense.date);
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    return (
                        <div key={i} className="w-[95%] m-auto border-b border-gray-500 relative">
                            <div className="flex justify-between items-center px-6 mb-2 mt-1">
                                <div className="flex space-x-4 justify-center items-center my-2" >
                                    <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                                        <span>{icons[expense.category]}</span>
                                    </div>
                                    <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                                        <p className="text-center text-gray-300" >{expense.category}</p>
                                    </div>
                                </div>

                                <h3 className="text-white text-lg font-medium" >$ {expense.amount} </h3>
                            </div>
                            <div className="flex space-x-2 absolute right-5 top-12" >
                                <p className="text-gray-600 text-xs text-center" >{`${hours}:${minutes}`}</p>
                                <p className="text-gray-600 text-xs text-center" >{new Date(expense.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )
                })}

            </section>

            <Modal dismissible show={openModal === 'dismissible'} onClose={() => setOpenModal(undefined)}>
                <Modal.Header>Category Name</Modal.Header>
                <Modal.Body  >
                    <input onChange={(e) => setNewCategory(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addCategory}>Create</Button>
                    <Button color="gray" onClick={() => setOpenModal(undefined)}>   Close</Button>
                </Modal.Footer>
            </Modal>

        </main>
    )
}

export default AddExpense