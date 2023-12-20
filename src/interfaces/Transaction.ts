import Page from "../enums/Page.ts";
import User from "./User.ts";

export default interface Transaction {
    user: User,
    description?: string,
    type : Page,
    amount: number,
    date: string,
    category: string,
    created_at: Date
    __v: string,
    _id: string
}