import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {getChart} from "../helpers/ProfileChartHelper";
import User from "../interfaces/User";
import chartStore from "../stores/chartStore";

type Props = {
    user: User | null
}

function useHomeChart({user}: Props) {

    const {setProfileChart} = chartStore();

    const {data: chart} = useQuery({
        queryKey: ['profileChart', {userId: user?._id}],
        queryFn: () => getChart({userId: user?._id}),
    });

    // seems fishy, but it's by the react query doc for refetching,
    useEffect(() => {
        chart && setProfileChart(chart);
    }, [chart])

    return chart;
}

export default useHomeChart