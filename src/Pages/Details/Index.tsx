import {PieChart, pieArcLabelClasses} from '@mui/x-charts/PieChart';
import {useEffect, useState} from 'react';
import {useUser} from '../../context/userContext';
import Period from '../../enums/ExpensePeriod';
import Page from '../../enums/Page.ts';
import {axiosInstance} from '../../helpers/axios';
import {formatForChart} from '../../helpers/modifyForDetais.ts';
import Transaction from '../../interfaces/Transaction.ts';
import PageSwitch from '../IncomeExpense/PageSwitch.tsx';
import SingleTransaction from '../IncomeExpense/SingleTransaction.tsx';

const SelectedBkg = 'bg-lime-400 shadow-lg shadow-lime-500/50';
const DeSelectedBkg = 'bg-lime-800 bg-opacity-60 shadow-lg';

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

type item = {
    color: string
    data: number
    endAngle: number
    formattedValue: string
    id: string
    index: number
    label: string
    padAngle: number
    startAngle: number
    value: number
}

export const Index = () => {
    const {user} = useUser();
    const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(Period.WEEK);
    const [chartData, setChartData] = useState(data);
    const [transactions, setTransactions] = useState<null | Transaction[]>(null);
    const [chartPeriod, setChartPeriod] = useState("");

    const sum = transactions && transactions.reduce((a, b) => a + b.amount, 0);
    const [pageSwitch, setPageSwitch] = useState<Page>(Page.EXPENSE);
    const isExpensePage = pageSwitch === Page.EXPENSE;

    const selectPeriod = (period: Period) => {
        setSelectedPeriod(period);
    }

    const getArcLabel = (item: item): string => {
        if (sum) return `${((item.value / sum) * 100).toFixed(0)}%`;
        return '';
    };

    const getTransactions = async (period: Period | null) => {
        const params = {
            userId: user?._id,
            type: pageSwitch,
            period: period,
            format : true,
        }
        const response = await axiosInstance.get(`/transaction`, {params});
        const formatted = formatForChart(response.data.formatted);
  
        setTransactions(response.data.transactions)
        setChartPeriod(formatDates(response.data.period.startDate, response.data.period.endDate))
        setChartData(formatted);
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
        getTransactions(selectedPeriod);

    }, [selectedPeriod, pageSwitch]);

    return (
        <main className="flex flex-col h-screen text-white justify-between bg-slate-900 ">

            <div className='flex flex-col gap-5' >
                <section className='mt-3' >
                    <PageSwitch setPageSwitch={setPageSwitch} isExpensePage={isExpensePage} />
                </section>

                <section className='w-[95%] border border-gray-600 mx-auto rounded-xl' >
                    <div className='flex justify-between p-2' >
                        <h2 className='text-2xl ' >{isExpensePage ? 'Expenses' : 'Incomes'}</h2>
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
                                    arcLabel: (item) => getArcLabel(item),
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 14,
                                    fontFamily: 'Montserrat',
                                },
                            }}
                            {...sizing}
                            slotProps={{
                                legend: {
                                    labelStyle: {
                                        fontSize: 16,
                                        fontWeight: 500,
                                        fontFamily: 'Montserrat',
                                        fill: 'white',
                                    },
                                },
                            }}
                        />
                    </div>
                </section>

                <section className='flex justify-around bg-lime-700 p-2 rounded-2xl w-11/12 mx-auto' >
                    {[Period.WEEK, Period.MONTH, Period.YEAR].map((label) => {
                        return <p onClick={() => selectPeriod(label)}
                            tabIndex={0}
                            className={`${(selectedPeriod == label) ? SelectedBkg : DeSelectedBkg} text-sm py-2 px-3 rounded-2xl focus:ring-2 focus:outline-none focus:ring-lime-300`}
                        >This {label}</p>
                    })}

                </section>
            </div>

            <section className="w-full mx-auto h-60 max-h-80 overflow-y-auto" >
                <p className="text-right text-white pr-3">{selectedPeriod + "ly"} {isExpensePage ? 'Expenses' : 'Incomes'}:</p>
                {transactions && transactions.map((transaction, i) => {
                    return <SingleTransaction transaction={transaction} key={i} />;
                })}
            </section>

        </main>
    )
}

