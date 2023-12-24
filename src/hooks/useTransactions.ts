import {useEffect, useState} from "react";
// import Transaction from "../interfaces/Transaction";
import moment from "moment";
import Period from "../enums/ExpensePeriod";
import {Page} from "../enums/Page";
import Category from "../interfaces/Category";
// import {chartItem, formatDates, formatForChart} from "../helpers/DeitalsPageHelper";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addTransaction, fetchTransactions} from "../helpers/incomeExpenseHelpers";
import transactionStore from "../stores/transactionStore";
import useUserStore from "../stores/userStore";

type Props = {
    type: Page
    period: Period
    format?: boolean
    userCategories?: null | Category[],
    selectedCategory?: number | null,
    setSelectedCategory?: React.Dispatch<React.SetStateAction<number | null>>
}

const useTransactions = ({type, period, setSelectedCategory}: Props) => {
    const {user} = useUserStore();
    const queryClient = useQueryClient();
    const {setTransactions} = transactionStore();
    const [amount, setAmount] = useState<null | number>(null);
    const [selectedDate, setSelectedDate] = useState<moment.Moment | Date>(moment());

    const {data: transactions, isLoading} = useQuery({
        queryKey: ['transactions', {userId: user?._id, period, type}],
        queryFn: () => fetchTransactions({userId: user?._id, period, type}),
    });

    useEffect(() => {
        transactions && setTransactions(transactions);
    }, [transactions])

    const {mutateAsync: addTransactionMutation} = useMutation({
        mutationFn: addTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['transactions']});
            setSelectedCategory && setSelectedCategory(null);
            setAmount(null);
        },
    })

    return {amount, setAmount, setSelectedDate, addTransactionMutation, selectedDate, isLoading};
}

export default useTransactions;
