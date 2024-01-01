import {UseMutateAsyncFunction} from "@tanstack/react-query"
import moment from "moment"
import {AddTransactionType} from "../../helpers/incomeExpenseHelpers"
import typeStore from "../../stores/typeStore"
import useUserStore from "../../stores/userStore"

type Props = {
    addTransaction: UseMutateAsyncFunction<void, Error, AddTransactionType, unknown>
    amount: number | null
    date: Date | moment.Moment
    selectedCategoryName: string | undefined | false
}

const AddTransaction = ({addTransaction, amount, date, selectedCategoryName}: Props) => {
    const {user} = useUserStore();
    const {incomeExpenseType: type} = typeStore();
    const props = {type, category: selectedCategoryName, amount, user, date}

    const handleTransaction = async () => {
        try {
            await addTransaction(props);
        } catch (err) {
            console.error('Error handling transaction', err);
        }
    }

    return (
        <section className="w-[95%] mx-auto" >
            <button onClick={handleTransaction} type="button" className="w-full text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add</button>
        </section >

    )
}

export default AddTransaction