
import {useEffect, useState} from "react";
import Expense from "../interfaces/Expense";
import Period from "../enums/ExpensePeriod";
import {axiosInstance} from "../helpers/axios";
import {useUser} from "../context/userContext";

type Props = {
    period: Period,
    key: number
}

const useExpenses = ({period, key}: Props) => {
    const {user} = useUser();
    const [data, setData] = useState<null | Expense[]>(null);

    useEffect(() => {
        (async () => {
            const params = {
                userId: user?._id,
                period: period
            }
            const response = await axiosInstance.get(`/expense`, {params});
            setData(response.data.expenses);
        })();
    }, [key]);

    return data;
}

export default useExpenses