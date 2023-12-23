import {Id} from "react-toastify"
import {AddTransactionType} from "../../helpers/incomeExpenseHelpers"
import useCategories from "../../hooks/useCategories"
import typeStore from "../../stores/typeStore"
import useUserStore from "../../stores/userStore"
import moment from "moment"

type Props = {
    addTransaction: ({user, category, type, amount, date}: AddTransactionType) => Promise<Id | undefined>
    amount: number | null
    date: Date | moment.Moment
}

const AddTransaction = ({addTransaction, amount, date}: Props) => {
    const {user} = useUserStore();
    const {userCategories, selectedCategory} = useCategories();
    const type = typeStore((state) => state.incomeExpenseType);

    const props = {
        type,
        category: (userCategories && userCategories[selectedCategory ?? 0].name),
        amount,
        user,
        date
    }

    return (
        <section className="w-[95%] mx-auto" >
            <button onClick={async () => await addTransaction(props)} type="button" className="w-full text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add</button>
        </section >

    )
}

export default AddTransaction