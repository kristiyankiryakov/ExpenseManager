import {getIcon} from '../../helpers/icons'
import Expense from '../../interfaces/Expense'

type Props = {
    key: number
    expense: Expense
}

const SingleExpense = ({expense, key}: Props) => {
    const date = new Date(expense.date);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (
        <div key={key} className="w-[95%] m-auto bg-lime-700 rounded-lg relative">
            <div className="flex justify-between items-center px-4 mb-2 mt-1">

                <div className="flex space-x-4 justify-center items-center my-2" >
                    <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                        <span>{getIcon(expense.category)}</span>
                    </div>

                    <div className='flex-col' >
                        <p className="text-left text-white" >{expense.category}</p>

                        <div className="flex space-x-1" >
                            <p className="text-gray-300 text-xs text-center" >{`${hours}:${minutes}`}</p>
                            <p className="text-gray-300 text-xs text-center" >{new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <div className='flex-col' >
                    <h3 className="text-white text-lg font-medium" >$ {expense.amount} </h3>
                </div>
            </div>

        </div>
    )
}

export default SingleExpense