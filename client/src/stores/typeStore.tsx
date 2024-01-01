import {create} from "zustand";
import {Page} from "../enums/Page";

type TypeStore = {
    incomeExpenseType: Page
    detailsChartType: Page
    setIncomeExpenseType: (type: Page) => void
    setDetailsChartType: (type: Page) => void
}

const typeStore = create<TypeStore>()((set) => ({
    incomeExpenseType: Page.EXPENSE,
    detailsChartType: Page.INCOME,

    setIncomeExpenseType: (type) => set({incomeExpenseType: type}),
    setDetailsChartType: (type) => set(({detailsChartType: type})),

}));

export default typeStore;