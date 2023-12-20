
import {useEffect, useState} from "react";
import Transaction from "../interfaces/Transaction";
import Period from "../enums/ExpensePeriod";
import {axiosInstance} from "../helpers/axios";
import {useUser} from "../context/userContext";
import moment from "moment";
import Category from "../interfaces/Category";
import Page from "../enums/Page";

type Props = {
    type: Page
    period: Period,
    userCategories: null | Category[],
    selectedCategory: number | null,
    setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>
}

const useExpenses = ({type, period, userCategories, selectedCategory, setSelectedCategory}: Props) => {
    const {user} = useUser();
    const [key, setKey] = useState(0);
    const [dailyTransactions, setDailyTransactions] = useState<null | Transaction[]>(null);
    const [amount, setAmount] = useState<null | number>(null);
    const [selectedDate, setSelectedDate] = useState<moment.Moment | Date>(moment());

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const params = {
                    userId: user?._id,
                    period: period,
                    type: type
                }
                const response = await axiosInstance.get(`/transaction`, {params});
                setDailyTransactions(response.data.transactions);
            } catch (err) {
                console.log(err);
                return null;
            }
        }

        fetchTransactions();
    }, [key, user?._id, period, type]);

    const addTransaction = async (type: Page) => {
        if (typeof selectedCategory === 'number' && selectedDate && userCategories) {
            setSelectedDate(current => moment(current));
            const payload = {user: user, date: selectedDate, amount, category: userCategories[selectedCategory].name, type}
            await axiosInstance.post('/transaction', payload);

            // modify to fetch incomes or expenses based on type
            setKey((prev) => prev + 1);
            setSelectedCategory(null);
            setAmount(null);
        } else {
            console.log('set up error handling')
        }
    };

    return {dailyTransactions, addTransaction, amount, setAmount, setSelectedDate};
}

export default useExpenses