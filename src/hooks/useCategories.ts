import {useEffect, useState} from "react";
import {axiosInstance} from "../helpers/axios";
import Category from "../interfaces/Category";
import useUserStore from "../stores/userStore";

const useCategories = () => {
    const [userCategories, setUserCategories] = useState<null | Category[]>(null);
    const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
    const [newCategory, setNewCategory] = useState("");
    const [fetchNewCategory, setFetchNewCategory] = useState(false);

    const user = useUserStore((state) => state.user);
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
        if (newCategory.length < 3) {
            console.log('handle minimum length');
            return;
        }
        if (userCategories?.find((cat) => cat.name == newCategory)) {
            console.log('handle category already exists');
            return;
        }
        const payload = {user: user, categoryName: newCategory}
        await axiosInstance.post('/category', payload);
        setFetchNewCategory(true);
        setNewCategory("");
    }


    const selectCategory = (index: number) => {
        setSelectedCategory(index);
    }

    return {userCategories, selectedCategory, setSelectedCategory, selectCategory, setNewCategory, addCategory};
}

export default useCategories