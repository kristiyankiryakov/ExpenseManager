import {useEffect, useState} from "react";
import {useUser} from "../context/userContext";
import {axiosInstance} from "../helpers/axios";
import Category from "../interfaces/Category";

const useCategories = () => {
    const [userCategories, setUserCategories] = useState<null | Category[]>(null);
    const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
    const [newCategory, setNewCategory] = useState("");
    const [fetchNewCategory, setFetchNewCategory] = useState(false);

    const {user} = useUser();
    const params = {userId: user?._id}

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const userCategoriesResponse = await axiosInstance.get(`/category`, {params});
                setUserCategories(userCategoriesResponse.data);
            } catch (e) {
                console.error('Error fetching categories:', e);
            }
        }

        fetchCats();
        setFetchNewCategory(false);

    }, [fetchNewCategory]);

    const addCategory = async () => {
        const payload = {user: user, categoryName: newCategory}
        await axiosInstance.post('/category', payload);
        setFetchNewCategory(true);
    }

    const selectCategory = (index: number) => {
        selectedCategory == index ? setSelectedCategory(null) : setSelectedCategory(index);
    }

    return {userCategories, selectedCategory, setSelectedCategory, selectCategory, newCategory, setNewCategory, addCategory};
}

export default useCategories