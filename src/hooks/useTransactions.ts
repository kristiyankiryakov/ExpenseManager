
import {useEffect, useState} from "react";
import Transaction from "../interfaces/Transaction";
import Period from "../enums/ExpensePeriod";
import {axiosInstance} from "../helpers/axios";
import moment from "moment";
import Category from "../interfaces/Category";
import Page from "../enums/Page";
import {chartItem, formatDates, formatForChart} from "../helpers/DeitalsPageHelper";
import {toast} from "react-toastify";
import useUserStore from "../stores/userStore";

type Props = {
    type: Page
    period: Period,
    format?: boolean
    userCategories?: null | Category[],
    selectedCategory?: number | null,
    setSelectedCategory?: React.Dispatch<React.SetStateAction<number | null>>
}

const useTransactions = ({type, period, format, userCategories, selectedCategory, setSelectedCategory}: Props) => {
    const user = useUserStore((state) => state.user);
    const [key, setKey] = useState(0);
    const [transactions, setTransactions] = useState<null | Transaction[]>(null);
    const [amount, setAmount] = useState<null | number>(null);
    const [selectedDate, setSelectedDate] = useState<moment.Moment | Date>(moment());
    const [chartData, setChartData] = useState<null | chartItem[]>(null);
    const [chartPeriod, setChartPeriod] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const params = {
                    userId: user?._id,
                    period: period,
                    type: type,
                    format: format,
                }
                const response = await axiosInstance.get(`/transaction`, {params});
                if (format) {
                    const formatted = formatForChart(response.data.formatted);
                    setChartData(formatted);
                    setChartPeriod(formatDates(response.data.period.startDate, response.data.period.endDate))

                }
                setTransactions(response.data.transactions);
            } catch (err) {
                console.log(err);
                return null;
            }
        }

        fetchTransactions();
    }, [key, user?._id, period, type, format]);

    const addTransaction = async (type: Page) => {
        if (!amount || amount <= 0) {
            return toast.warn("Please enter amount more than 0", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
                autoClose: 1500,
                toastId: "add-amount"
            });
        }

        if (typeof selectedCategory !== 'number' || !userCategories) {
            return toast.warn("Please select category", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
                autoClose: 1500,
                toastId: "add-cat"
            });
        }

        setSelectedDate(current => moment(current));
        const payload = {user: user, date: selectedDate, amount, category: userCategories[selectedCategory].name, type}
        await axiosInstance.post('/transaction', payload);

        // modify to fetch incomes or expenses based on type
        setKey((prev) => prev + 1);
        setSelectedCategory && setSelectedCategory(null);
        setAmount(null);

        toast.success("Transaction added successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
            autoClose: 500,
            toastId: "add-succ"
        });
    };

    return {transactions, addTransaction, amount, setAmount, setSelectedDate, chartData, chartPeriod};
}

export default useTransactions