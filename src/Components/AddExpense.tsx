import {useEffect, useState, } from "react"
import {BiDollar, BiCategory} from "react-icons/bi";
import {getIcon} from "../helpers/icons.tsx";
import {AiOutlineAppstoreAdd} from "react-icons/ai";
import {useUser} from "../context/userContext";
import {axiosInstance} from "../helpers/axios";
import Category from "../interfaces/Category.ts";
import Period from "../enums/ExpensePeriod.ts"
import Expense from "../interfaces/Expense.ts";

import {Modal, Datepicker, Button} from 'flowbite-react';
import moment from "moment";
import useExpenses from "../hooks/useExpenses.ts";

const AddExpense = () => {
    const {user} = useUser();
    const [key, setKey] = useState(0);
    const [pageSwitch, setPageSwitch] = useState("Expense");
    const [selectedDate, setSelectedDate] = useState<moment.Moment | Date>(moment());
    const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
    const [amount, setAmount] = useState<null | number>(null);
    const [filter, setFilter] = useState("");
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [newCategory, setNewCategory] = useState("");
    const [userCategories, setUserCategories] = useState<null | Category[]>(null);
    const dailyExpenses = useExpenses({period: Period.DAY, key});

    const isExpensePage = pageSwitch === "Expense"

    const addExpense = async () => {
        if (typeof selectedCategory === 'number' && selectedDate && userCategories) {
            setSelectedDate(current => moment(current));
            const payload = {user: user, date: selectedDate, amount, category: userCategories[selectedCategory].name}
            await axiosInstance.post('/expense', payload);

            setKey((prev) => prev + 1);
            setSelectedCategory(null);
            setAmount(null);
        } else {
            console.log('set up error handling')
        }
    };

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

    const handleSwitchChange = () => {
        setPageSwitch(prevSwitch => (prevSwitch === "Expense" ? "Income" : "Expense"));
    };

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <main className="bg-slate-900 flex flex-col h-screen justify-between">
            {isExpensePage ?
                <button type="button" onClick={handleSwitchChange} className="text-white bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium text-sm px-5 py-2.5 text-center mb-2">{pageSwitch}</button>
                :
                <button type="button" onClick={handleSwitchChange} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium text-sm px-5 py-2.5 text-center mb-2">{pageSwitch}</button>
            }
            <div className="flex-col space-y-10" >
                {/* Amount Section */}
                <section className={`flex w-[95%] justify-around m-auto ${isExpensePage && 'mt-10'}`}>
                    <div className={`relative ${isExpensePage ? 'w-[25%]' : 'w-[100%]'}`}>
                        <input min={0} value={amount ?? ''} onChange={(event) => setAmount(event.target.valueAsNumber)}
                            className={`w-full outline-none text-lg text-center bg-gray-700 p-2 rounded-xl text-stone-300 font-medium placeholder-stone-500 focus:ring-4 focus:outline-none ${isExpensePage ? 'focus:ring-lime-500' : 'focus:ring-green-300'}`}
                            type="number" placeholder="5.99" />
                        <div className="absolute top-2.5 left-0 text-stone-300 m-0 p-0">
                            <BiDollar style={{color: isExpensePage ? '#84cc16' : '#09885e'}} size={24} />
                        </div>
                    </div>
                    {isExpensePage && <div className="relative">
                        <input className={`w-full bg-gray-700 outline-none text-lg text-center p-2  text-stone-100 rounded-xl placeholder-stone-500 focus:ring-4 focus:outline-none focus:ring-lime-500`} type="text"
                            value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search Category" />
                        <div className="absolute top-2 left-2" >
                            <BiCategory size={30} color='#84cc16' />
                        </div>
                    </div>}
                </section>

                {/* Category Section */}
                {isExpensePage && <div className="grid grid-cols-4 w-[95%] m-auto border border-gray-600 rounded-xl bg-slate-800 h-44 overflow-y-auto scroll-smooth" >
                    {userCategories && userCategories.map((category, i) => {
                        return (
                            <div onClick={() => selectCategory(i)} key={category.name} className="flex-col space-y-1 justify-center items-center my-2" >
                                <div tabIndex={0} className={`p-2 rounded-lg w-fit m-auto bg-lime-500 focus:ring-4 focus:outline-none focus:ring-lime-300`} >
                                    <span>{getIcon(category.name)}</span>
                                </div>
                                <div className="bg-lime-700 w-fit rounded-lg px-2 m-auto" >
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
                </div>}
            </div>

            <section className="w-[95%] my-2 mx-auto" >
                <Datepicker autoHide onSelectedDateChanged={(d) => setSelectedDate(d)} />
            </section>

            <section className="w-[95%] mx-auto" >
                {isExpensePage ?
                    <button onClick={addExpense} type="button" className="w-full text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-800 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add</button>
                    :
                    <button type="button" className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-800 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add</button>
                }
            </section>
            <section className={`mb-4 w-full mx-auto h-60 max-h-80 overflow-y-auto`} >

                <p className="text-right text-white pr-3">{isExpensePage ? 'Daily Expenses:' : 'Daily Incomes:'}</p>
                {(isExpensePage && dailyExpenses) && dailyExpenses.map((expense, i) => {
                    const date = new Date(expense.date);
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    return (
                        <div key={i} className="w-[95%] m-auto border-b border-gray-500 relative">
                            <div className="flex justify-between items-center px-6 mb-2 mt-1">
                                <div className="flex space-x-4 justify-center items-center my-2" >
                                    <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                                        <span>{getIcon(expense.category)}</span>
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
                    <input maxLength={6} onChange={(e) => setNewCategory(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addCategory}>Create</Button>
                    <Button color="gray" onClick={() => setOpenModal(undefined)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </main >
    )
}

export default AddExpense