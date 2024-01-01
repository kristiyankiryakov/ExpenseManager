import User from "./User.ts";

export default interface Category {
    name: string,
    user?: User
}