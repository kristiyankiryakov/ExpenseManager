import Period from "../enums/ExpensePeriod";
import {Page} from "../enums/Page";
import {useQuery} from "@tanstack/react-query";
import {fetchChartData} from "../helpers/ChartDetailsHelper";
import useUserStore from "../stores/userStore";

type Props = {
    type: Page
    period: Period
}

const useChartDetails = ({type, period}: Props) => {
    const user = useUserStore((state) => state.user);

    const {data, isLoading} = useQuery({
        queryKey: ['chartData', {userId: user?._id, period, type, format: true}],
        queryFn: () => fetchChartData({userId: user?._id, period, type, format: true}),
    });

    return {chartData : data?.chartData, chartPeriod : data?.chartPeriod, isLoading};
}

export default useChartDetails