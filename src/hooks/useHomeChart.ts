/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from "react";
import {axiosInstance} from "../helpers/axios";
import {useUser} from "../context/userContext";
import {DataItem} from "../helpers/chartSettings";
import Page from "../enums/Page";

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

type transactionForMonth = {
    month: string
    total: number
    type: Page

}

function useHomeChart(dataset: DataItem[]) {
    const {user} = useUser();
    const [chart, setChart] = useState(dataset);

    useEffect(() => {
        const getChart = async () => {
            try {
                const expenseParams = {userId: user?._id, type: Page.EXPENSE}
                const responseExpenses = await axiosInstance.get('/transaction/schema', {params: expenseParams});
                const incomeParams = {userId: user?._id, type: Page.INCOME}
                const responseIncomes = await axiosInstance.get('/transaction/schema', {params: incomeParams});
                const expenses: transactionForMonth[] = responseExpenses.data.monthlyTransactions;
                const incomes: transactionForMonth[] = responseIncomes.data.monthlyTransactions;
                const result: DataItem[] = [];
                months.map((month) => {
                    const expenseForMonth = expenses.find((ex) => ex.month == month);
                    const incomeForMonth = incomes.find((inc) => inc.month == month);

                    if (expenseForMonth && incomeForMonth) {
                        const temp = {month: month, income: incomeForMonth.total, expense: incomeForMonth.total}
                        result.push(temp);
                    }
                });
                setChart(result);

            } catch (err) {
                console.log(err);
                return null;
            }
        }
        getChart()

    }, []);

    return chart;
}

export default useHomeChart