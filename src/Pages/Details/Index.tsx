import {PieChart, pieArcLabelClasses} from '@mui/x-charts/PieChart';
import {useMemo, useState} from 'react';
import Period from '../../enums/ExpensePeriod';
import {ComponentPage, Page} from '../../enums/Page.ts';
import {DeSelectedBkg, SelectedBkg, dummy, getArcLabel, sizing} from '../../helpers/ChartDetailsHelper.ts';
import useChartDetails from '../../hooks/useChartDetails.ts';
import useTransactions from '../../hooks/useTransactions.ts';
import transactionStore from '../../stores/transactionStore.tsx';
import typeStore from '../../stores/typeStore.tsx';
import PageSwitch from '../IncomeExpense/PageSwitch.tsx';
import SingleTransaction from '../IncomeExpense/SingleTransaction.tsx';

export const Index = () => {
    const {detailsChartType: type} = typeStore();
    const isExpensePage = type === Page.EXPENSE;

    const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.WEEK);
    useTransactions({period: selectedPeriod, type, format: true});
    const {transactions} = transactionStore();
    const {chartData, chartPeriod} = useChartDetails({type, period: selectedPeriod});
    const sum = useMemo(() => {
        return transactions ? transactions.reduce((a, b) => a + b.amount, 0) : 0;
    }, [transactions]);

    return (
        <main className="flex flex-col h-screen text-white justify-between bg-slate-900 ">

            <div className='flex flex-col gap-5' >
                <section className='mt-3' >
                    <PageSwitch page={ComponentPage.ChartDetails} />
                </section>

                <section className='w-[95%] border border-gray-600 mx-auto rounded-xl' >
                    <div className='flex justify-between p-2' >
                        <h2 className='text-2xl ' >{isExpensePage ? 'Expenses' : 'Incomes'}</h2>
                        <h5 className='text-2xl text-lime-500 font-medium' >${sum}</h5>
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
                                    data: chartData ?? dummy,
                                    arcLabel: (item) => getArcLabel(item, sum),
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
                    {[Period.WEEK, Period.MONTH, Period.YEAR].map((label, i) => {
                        return <p key={label + i} onClick={() => setSelectedPeriod(label)}
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

