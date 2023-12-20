import {PieChart, pieArcLabelClasses} from '@mui/x-charts/PieChart';
import Period from '../enums/ExpensePeriod';
import {useEffect, useState} from 'react';
import {useUser} from '../context/userContext';
import Expense from '../interfaces/Transaction.ts';
import {axiosInstance} from '../helpers/axios';
import {getIcon} from '../helpers/icons';
import Color from "../enums/CategoryColor.ts";

interface data {label: string, value: number, color: string}

const data = [
    {label: 'Group A', value: 400, color: '#0088FE'},
    {label: 'Group B', value: 300, color: '#00C49F'},
    {label: 'Group C', value: 300, color: '#FFBB28'},
    {label: 'Group D', value: 200, color: '#FF8042'},
];

const sizing = {
    height: 250,
    legend: {
        direction: "column",
        position: {vertical: 'top', horizontal: "right"},
        padding: NaN,
    }
};
// const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);


// const generateRandomColor = () => {
//     const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
//     return randomColor;
// };

const Details = () => {
    const {user} = useUser();
    const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(Period.WEEK);
    const [chartData, setChartData] = useState(data);
    const [expenses, setExpenses] = useState<null | Expense[]>(null);
    const [chartPeriod, setChartPeriod] = useState("");
    const selectPeriod = (period: Period) => {
        setSelectedPeriod(period);
    }

    const getArcLabel = (params: data) => {
        if (expenses) {
            const percent = params.value / expenses.reduce((a, b) => a + b.amount, 0);
            return `${(percent * 100).toFixed(0)}%`;
        }
    };

    const getUserExpenses = async (period: Period | null) => {
        const params = {
            userId: user?._id,
            period: period
        }
        const response = await axiosInstance.get(`/expense`, {params});
        setExpenses(response.data.expenses)
        const formatted = formatForChart(response.data.expensesByCategory);

        setChartPeriod(formatDates(response.data.period.startDate, response.data.period.endDate))
        setChartData(formatted);
    }

    const formatForChart = (data: {[key: string]: number}) => {
        const modified = Object.keys(data).map((category) => {
            return {
                label: category,
                value: data[category],
                color: Color[category as typeof Color] ?? '#34a835'
            };
        });
        return modified
    }

    const formatDates = (startDate: Date, endDate: Date) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const startDay = start.getDate();
        const endDay = end.getDate();

        const startMonth = start.toLocaleString('default', {month: 'short'});
        const endMonth = end.toLocaleString('default', {month: 'short'});

        if (start.getMonth() === end.getMonth()) {
            return `${startDay}${startMonth} - ${endDay}${endMonth} ${end.getFullYear()}`;
        }

        return `${startDay}${startMonth} ${start.getFullYear()} - ${endDay}${endMonth} ${end.getFullYear()}`;
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
                    <p className='p-2 text-gray-400' >{chartPeriod}</p>
                    <div className='flex' >
                        <PieChart
                            series={[
                                {
                                    innerRadius: 25,
                                    outerRadius: 120,
                                    paddingAngle: 10,
                                    cornerRadius: 5,
                                    data: chartData,
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
                            tabIndex={0}
                            className={`text-sm py-2 px-4 rounded-2xl bg-lime-500 focus:ring-4 focus:outline-none focus:ring-lime-300`}
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