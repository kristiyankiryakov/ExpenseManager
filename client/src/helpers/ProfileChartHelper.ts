import {Page} from "../enums/Page"
import {axiosInstance} from "./axios"
import {DataItem} from "./chartSettings"

export const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export type transactionForMonth = {
    month: string
    total: number
    type: Page

}

export const getChart = async ({userId}: {userId: string | undefined}) => {
    try {
        const expenseParams = {userId, type: Page.EXPENSE}
        const responseExpenses = await axiosInstance.get('/transaction/schema', {params: expenseParams});
        const incomeParams = {userId, type: Page.INCOME}
        const responseIncomes = await axiosInstance.get('/transaction/schema', {params: incomeParams});
        const expenses: transactionForMonth[] = responseExpenses.data.monthlyTransactions;
        const incomes: transactionForMonth[] = responseIncomes.data.monthlyTransactions;
        const result: DataItem[] = [];
        months.map((month) => {
            const expenseForMonth = expenses.find((ex) => ex.month == month);
            const incomeForMonth = incomes.find((inc) => inc.month == month);
            const temp: DataItem = {month: month, expense: 0, income: 0}
            if (expenseForMonth) {
                temp.expense = expenseForMonth.total;
            }
            if (incomeForMonth) {
                temp.income = incomeForMonth.total;
            }

            result.push(temp);

        });
        return result

    } catch (err) {
        console.log(err);
        return null;
    }
}