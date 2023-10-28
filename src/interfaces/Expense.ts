import User from "./User.ts";

export default interface Expense {
    user: User,
    description?: string,
    amount: number,
    date: string,
    category: string,
    created_at: Date
    __v: string,
    _id: string
}