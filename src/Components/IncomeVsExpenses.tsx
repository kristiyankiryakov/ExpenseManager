
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";

const IncomeVsExpenses = () => {
    return (
        <section className='flex justify-around'>
            <div className='Income'>
                <div className='flex-col w-fit space-y-4 p-3'>
                    <div className='flex-col justify-center items-center bg-green-500 w-fit p-3 rounded-full m-auto'>
                        <AiOutlineDownload size={25} color="white" />
                    </div>
                    <h3 className='font-medium text-center'>Income</h3>
                    <p className='font-medium text-lg text-center'>$ 6549.32</p>
                </div>
            </div>

            <div className='Expenses'>
                <div className='flex-col w-fit space-y-4 p-3'>
                    <div className='flex-col justify-center items-center bg-red-500 w-fit p-3 rounded-full m-auto'>
                        <AiOutlineUpload size={25} color="white" />
                    </div>
                    <h3 className='font-medium text-center'>Expenses</h3>
                    <p className='font-medium text-lg text-center'>$ 3049.32</p>
                </div>
            </div>
        </section>
    )
}

export default IncomeVsExpenses