import {useEffect, useState} from "react";
import Period from "../enums/ExpensePeriod";
import {Page} from "../enums/Page";
import Category from "../interfaces/Category";
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

    return {amount, setAmount, addTransactionMutation, isLoading};
}

export default useTransactions;
