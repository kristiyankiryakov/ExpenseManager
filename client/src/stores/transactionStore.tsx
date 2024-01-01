import {create} from "zustand";
import Transaction from "../interfaces/Transaction";

type transactionStore = {
    transactions: null | Transaction[] | undefined
    setTransactions: (transactions: Transaction[]) => void
}

const transactionStore = create<transactionStore>()((set) => ({
    transactions: null,
    setTransactions: (transactions) => set({transactions}),
}));

export default transactionStore