/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from "react";
import {axiosInstance} from "../helpers/axios";
import {useUser} from "../context/userContext";
import {DataItem} from "../helpers/chartSettings";

type Expense = {
    month: string,
    Expense: number
}

type Income = {
    amount: number,
    month: string
}

function useHomeChart(dataset: DataItem[]) {
    const {user} = useUser();
    const [chart, setChart] = useState(dataset);

    useEffect(() => {
        const getChart = async () => {
            const params = {
                userId: user?._id,
            }
            try {
                const chart = await axiosInstance.get('/chart', {params});
                // console.log(chart);
                
            } catch (err) {
                console.log(err);
                return null;
            }
        }

        getChart();

    }, [])

    // const getChart = async () => {
    //     const params = {
    //         userId: user?._id,
    //     }
    //     const incomeResponse = await axiosInstance.get('/income', {params});
    //     const income = incomeResponse.data.income;
    //     const expensesResponse = await axiosInstance.get('/expense/schema', {params});

    //     const chartData = expensesResponse.data.monthlyExpenses.map((expense: any) => {
    //         console.log(income);
    //         const current = income.find((income: any) => income.month == expense.month)
    //         expense['Income'] = current.amount;
    //         return expense
    //     });
    //     setChart(chartData)
    // }
    // return chart;
}

export default useHomeChart