import {axiosInstance} from "../helpers/axios";
import Category from "../interfaces/Category";
import User from "../interfaces/User";

export type AddCategoryProps = {
    user: User | null
    categoryName: string
    userCategories: Category[] | undefined
}

export const fetchCats = async (params: {userId: string | undefined}): Promise<Category[] | undefined> => {
    try {
        const userCategoriesResponse = await axiosInstance.get(`/category`, {params});
        return userCategoriesResponse.data;
    } catch (err) {
        console.error('Error fetching categories:', err);
    }
}

export const addCategory = async ({user, categoryName, userCategories}: AddCategoryProps) => {
    if (categoryName.length < 3) {
        throw new Error('handle minimum length');
    }
    if (userCategories?.find((cat) => cat.name == categoryName)) {
        throw new Error('handle category already exists');
    }

    try {
        await axiosInstance.post('/category', {user, categoryName});
    } catch (err) {
        console.error('Error adding category', err);
    }
}

export const isCategorySelected = (selected: string | false | undefined, category: string) => {
    if (typeof selected !== "string") return false;
    return selected === category
}