import {toast} from "react-toastify";
import Period from "../enums/ExpensePeriod";
import {Page} from "../enums/Page";
import Transaction from "../interfaces/Transaction";
import {axiosInstance} from "./axios";
import User from "../interfaces/User";
import moment from "moment";

type fetchTransactionParams = {
    userId: string | undefined
    period: Period
    type: Page
    // format: boolean | undefined
}

export type AddTransactionType = {
    type: Page
    amount: number | null
    category: string | null | undefined
    user: User | null
    date: Date | moment.Moment
}

export const fetchTransactions = async (params: fetchTransactionParams): Promise<Transaction[] | null> => {
    try {
        const response = await axiosInstance.get(`/transaction`, {params});
        // if (format) {
        //     const formatted = formatForChart(response.data.formatted);
        //     setChartData(formatted);
        //     setChartPeriod(formatDates(response.data.period.startDate, response.data.period.endDate))
        // }
        return response.data.transactions;

    } catch (err) {
        console.log(err);
        return null;
    }
}

export const addTransaction = async ({user, category, type, amount, date}: AddTransactionType) => {
    if (!amount || amount <= 0) {
        return toast.warn("Please enter amount more than 0", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
            autoClose: 1500,
            toastId: "add-amount"
        });
    }

    if (!category) {
        return toast.warn("Please select category", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
            autoClose: 1500,
            toastId: "add-cat"
        });
    }
    const formatted = moment(date);

    const payload = {user, date: formatted, amount, category, type}
    await axiosInstance.post('/transaction', payload);

    toast.success("Transaction added successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
        autoClose: 500,
        toastId: "add-succ"
    });
};