
import {useEffect, useState} from "react";
import Expense from "../interfaces/Expense";
import Period from "../enums/ExpensePeriod";
import {axiosInstance} from "../helpers/axios";
import {useUser} from "../context/userContext";
import moment from "moment";
import Category from "../interfaces/Category";

type Props = {
    period: Period,
    userCategories: null | Category[],
    selectedCategory: number | null,
    setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>
}

const useExpenses = ({period, userCategories, selectedCategory, setSelectedCategory}: Props) => {
    const {user} = useUser();
    const [key, setKey] = useState(0);
    const [dailyExpenses, setDailyExpenses] = useState<null | Expense[]>(null);
    const [amount, setAmount] = useState<null | number>(null);
    const [selectedDate, setSelectedDate] = useState<moment.Moment | Date>(moment());

    useEffect(() => {

        (async () => {
            const params = {
                userId: user?._id,
                period: period
            }
            const response = await axiosInstance.get(`/expense`, {params});
            setDailyExpenses(response.data.expenses);
        })();

    }, [key, user?._id, period]);

    const addExpense = async () => {
        if (typeof selectedCategory === 'number' && selectedDate && userCategories) {
            setSelectedDate(current => moment(current));
            const payload = {user: user, date: selectedDate, amount, category: userCategories[selectedCategory].name}
            await axiosInstance.post('/expense', payload);

            setKey((prev) => prev + 1);
            setSelectedCategory(null);
            setAmount(null);
        } else {
            console.log('set up error handling')
        }
    };

    return {dailyExpenses, addExpense, amount, setAmount, setSelectedDate};
}

export default useExpenses