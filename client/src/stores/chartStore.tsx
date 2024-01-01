import {create} from "zustand";
import {DataItem} from "../helpers/chartSettings";

type ChartStoreType = {
    profileChart: null | DataItem[] | undefined
    setProfileChart: (chart: DataItem[]) => void
}

const chartStore = create<ChartStoreType>()((set) => ({
    profileChart: null,
    setProfileChart: (profileChart) => set({profileChart}),

    
}));

export default chartStore