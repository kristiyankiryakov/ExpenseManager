import {PieChart, pieArcLabelClasses} from '@mui/x-charts/PieChart';
import Period from '../enums/ExpensePeriod';
import {useEffect, useState} from 'react';
import {useUser} from '../context/userContext';
import Expense from '../interfaces/Expense';
import {axiosInstance} from '../helpers/axios';
import {getIcon} from '../helpers/icons';

interface data {label: string, value: number, color: string}

const data = [
    {label: 'Group A', value: 400, color: '#0088FE'},
    {label: 'Group B', value: 300, color: '#00C49F'},
    {label: 'Group C', value: 300, color: '#FFBB28'},
    {label: 'Group D', value: 200, color: '#FF8042'},
];

const sizing = {
    height: 200,
    legend: {
        direction: "column",
        position: {vertical: 'top', horizontal: "right"},
        padding: NaN,
    }
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params: data) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
};

const Details = () => {
    const {user} = useUser();
    const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(Period.WEEK);
    const [expenses, setExpenses] = useState<null | Expense[]>(null);

    const selectPeriod = (period: Period) => {
        setSelectedPeriod(period);
    }

    const getUserExpenses = async (period: Period | null) => {
        const params = {
            userId: user?._id,
            period: period
        }
        const response = await axiosInstance.get(`/expense`, {params});
        setExpenses(response.data);
    }

    useEffect(() => {
        getUserExpenses(selectedPeriod);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPeriod]);

    return (
        <main className="flex flex-col h-screen text-white justify-between bg-slate-900 ">

            <div className='flex flex-col gap-5' >
                <section className="h-24">
                    <p className="text-center">Welcome section</p>
                </section>

                <section className='w-[95%] border border-gray-600 mx-auto rounded-xl' >
                    <div className='flex justify-between p-2' >
                        <h2 className='text-2xl ' >Expenses</h2>
                        <h5 className='text-2xl text-lime-500 font-medium' >$534</h5>
                    </div>
                    <p className='p-2 text-gray-400' >1Feb 2023 - 28Feb 2023</p>
                    <div className='flex' >
                        <PieChart
                            series={[
                                {
                                    outerRadius: 80,
                                    data,
                                    arcLabel: getArcLabel,
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 14,
                                },
                            }}
                            {...sizing}
                            slotProps={{
                                legend: {
                                    labelStyle: {
                                        fontSize: 16,
                                        fontWeight: 500,
                                        fill: 'white',
                                    },
                                },
                            }}
                        />
                    </div>
                </section>

                <section className='flex justify-around' >
                    {[Period.WEEK, Period.MONTH, Period.YEAR].map((label) => {
                        return <p onClick={() => selectPeriod(label)}
                            className={`text-sm py-2 px-4 rounded-2xl   ${selectedPeriod === label ? 'bg-green-800' : 'bg-lime-500'}`}
                        >This {label}</p>
                    })}

                </section>
            </div>

            <section className="w-full mx-auto h-60 max-h-80 overflow-y-auto" >
                <p className="text-right text-white pr-3">{selectedPeriod?.toUpperCase()} Expenses:</p>
                {expenses && expenses.map((expense, i) => {
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

        </main>
    )
}

export default Details