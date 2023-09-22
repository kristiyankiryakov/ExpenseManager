import {useState} from "react"
import {BiDollar, BiCategory} from "react-icons/bi";
import {MdOutlineFastfood} from "react-icons/md";
import {AiOutlineAppstoreAdd} from "react-icons/ai";

const AddExpense = () => {

    const [amount, setAmount] = useState(0);
    const [filter, setFilter] = useState("");


    return (
        <main className="bg-slate-900 flex flex-col h-screen justify-between">
            <div className="flex-col space-y-10" >
                <section className="flex w-[95%] justify-around m-auto mt-10">
                    <div className="relative w-[25%]">
                        <input onChange={(e) => setAmount(Number(e.target.value))}
                            className={`w-full outline-none text-lg text-center bg-gray-700 p-2 rounded-xl text-stone-100 font-medium placeholder-stone-200`}
                            type="number" placeholder="5.99" />
                        <div className="absolute top-2 left-2 text-stone-300 m-0 p-0">
                            <BiDollar size={30} />
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
                    <div className="flex-col space-y-1 justify-center items-center my-2" >
                        <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                            <MdOutlineFastfood size={30} color="white" />
                        </div>
                        <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                            <p className="text-center text-gray-300" >Food</p>
                        </div>
                    </div>
                    <div className="flex-col space-y-1 justify-center items-center my-2" >
                        <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                            <MdOutlineFastfood size={30} color="white" />
                        </div>
                        <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                            <p className="text-center text-gray-300" >Food</p>
                        </div>
                    </div>
                    <div className="flex-col space-y-1 justify-center items-center my-2" >
                        <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                            <MdOutlineFastfood size={30} color="white" />
                        </div>
                        <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                            <p className="text-center text-gray-300" >Food</p>
                        </div>
                    </div>
                    <div className="flex-col space-y-1 justify-center items-center my-2 col-start-4" >
                        <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                            <AiOutlineAppstoreAdd size={30} color="white" />
                        </div>
                        <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                            <p className="text-center text-gray-300" >Add</p>
                        </div>
                    </div>
                </div>
            </div>


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
        </main>
    )
}

export default AddExpense