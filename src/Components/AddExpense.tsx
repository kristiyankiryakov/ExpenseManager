import {useState} from "react"
import {BiDollar, BiCategory} from "react-icons/bi";
import {MdOutlineFastfood} from "react-icons/md";

const AddExpense = () => {

    const [amount, setAmount] = useState(0);
    const [filter, setFilter] = useState("");


    return (
        <main className="bg-slate-900 h-screen flex-col space-y-10">

            <section className="w-4/6 m-auto mt-10">
                <div className="relative">
                    <input onChange={(e) => setAmount(Number(e.target.value))}
                        className={`w-full outline-none text-lg text-center bg-green-400 p-2 rounded-xl text-stone-100 font-medium placeholder-stone-200`}
                        type="number" placeholder="Enter amount" />
                    <div className="absolute top-2 left-2 text-stone-300 m-0 p-0">
                        <BiDollar size={30} />
                    </div>
                </div>
            </section>

            <section className="w-4/6 m-auto">
                <div className="relative">
                    <input className={`w-full bg-green-400 outline-none text-lg text-center p-2  text-stone-100 rounded-xl placeholder-stone-200`} type="text"
                        onChange={(e) => setFilter(e.target.value)} placeholder="Search Category" />
                    <div className="absolute top-2 left-2" >
                        <BiCategory size={30} color="white" />
                    </div>
                </div>
            </section>

            {/* Single expense */}
            <div className="w-full border-b border-gray-600 relative">
                <div className="flex justify-between items-center px-6 mb-2">
                    <div className="flex items-center space-x-4" >
                        <div className="p-2 bg-slate-800 rounded-lg m-2" >
                            <MdOutlineFastfood size={30} color="white" />
                        </div>
                        <h3 className="text-white text-lg font-medium" >Food</h3>
                    </div>

                    <h3 className="text-white text-lg font-medium" >$ 432.32</h3>
                </div>
                <div className="flex space-x-2 absolute right-5 top-12" >
                    <p className="text-gray-600 text-xs text-center" >16:30</p>
                    <p className="text-gray-600 text-xs text-center" >16/09/2023</p>
                </div>
            </div>

        </main>
    )
}

export default AddExpense