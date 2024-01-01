import {useMemo} from "react";
import Category from "../interfaces/Category";


type Props = {
    userCategories: Category[] | undefined
    filter: string
}

function useFilteredCats({userCategories, filter}: Props) {

    const filteredData = useMemo(() => {
        if (userCategories) {
            return userCategories.filter(cat => cat.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
        }
    }, [userCategories, filter]);

    return filteredData;
}

export default useFilteredCats