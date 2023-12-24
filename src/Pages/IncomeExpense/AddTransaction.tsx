import {UseMutateAsyncFunction} from "@tanstack/react-query"
import moment from "moment"
import {AddTransactionType} from "../../helpers/incomeExpenseHelpers"
import useCategories from "../../hooks/useCategories"
import typeStore from "../../stores/typeStore"
import useUserStore from "../../stores/userStore"

type Props = {
    addTransaction: UseMutateAsyncFunction<void, Error, AddTransactionType, unknown>
    amount: number | null
    date: Date | moment.Moment
}

const AddTransaction = ({addTransaction, amount, date}: Props) => {
    const {user} = useUserStore();
    const {userCategories, selectedCategory} = useCategories();
    const type = typeStore((state) => state.incomeExpenseType);
    const categoryName = (userCategories && selectedCategory) ? userCategories[selectedCategory].name : null;

    const handleTransaction = async () => {
        try {
            await addTransaction(props);
        } catch (err) {
            console.log(err);
        }
    }

    const props = {
        type,
        category: categoryName,
        amount,
        user,
        date
    }

    return (
        <section className="w-[95%] mx-auto" >
            <button onClick={handleTransaction} type="button" className="w-full text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add</button>
        </section >

    )
}

export default AddTransaction