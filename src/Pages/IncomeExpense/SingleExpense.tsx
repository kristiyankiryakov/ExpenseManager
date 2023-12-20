import {getIcon} from '../../helpers/icons'
import Transaction from '../../interfaces/Transaction'

type Props = {
    transaction: Transaction
}

const SingleExpense = ({transaction}: Props) => {
    const date = new Date(transaction.date);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (
        <div className="w-[95%] m-auto bg-lime-700 rounded-lg relative">
            <div className="flex justify-between items-center px-4 mb-2 mt-1">

                <div className="flex space-x-4 justify-center items-center my-2" >
                    <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                        <span>{getIcon(transaction.category)}</span>
                    </div>

                    <div className='flex-col' >
                        <p className="text-left text-white" >{transaction.category}</p>

                        <div className="flex space-x-1" >
                            <p className="text-gray-300 text-xs text-center" >{`${hours}:${minutes}`}</p>
                            <p className="text-gray-300 text-xs text-center" >{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <div className='flex-col' >
                    <h3 className="text-white text-lg font-medium" >$ {transaction.amount} </h3>
                </div>
            </div>

        </div>
    )
}

export default SingleExpense