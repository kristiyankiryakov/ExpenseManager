import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {addCategory, fetchCats} from "../helpers/CategoryHelpers";
import useUserStore from "../stores/userStore";

const useCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
    const {user} = useUserStore();
    const queryClient = useQueryClient();

    const {data: userCategories} = useQuery({
        queryKey: ['categories', {userId: user?._id}],
        queryFn: () => fetchCats({userId: user?._id}),
    });

    const {mutateAsync: addCategoryMutation} = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });

    const selectedCategoryName = (typeof selectedCategory === 'number' && userCategories) && userCategories[selectedCategory].name;

    return {userCategories, selectedCategoryName, setSelectedCategory, addCategoryMutation} as const;
}

export default useCategories